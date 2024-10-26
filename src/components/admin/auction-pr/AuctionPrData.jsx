"use client";

import AdminSideBar from "../admindashboard/AdminSideBar";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLots, fetchAllUsers } from "@/store/slices/allDataSlice";
import "./AuctionPrData.css";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import FormModal from "@/components/swal-fire-model/FormModal";
import { useRouter } from "next/navigation";

const AuctionPrData = ({ auctionId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, loading, error } = useSelector(
    (state) => state.tablesData.alllots
  );

  const {
    data: allUsers,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.tablesData.allusers);
  const [auctionName, setAuctionName] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [newBid, setNewBid] = useState("");
  const [newHandleName, setNewHandleName] = useState("");
  const [lotData, setLotData] = useState({});
  const [compLoading, setCompLoading] = useState(false);

  // Function to open the modal
  const openModal = (lot) => {
    console.log("opened", lot);
    setLotData(lot);
    setNewBid("");
    setNewHandleName("");
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Close modal when clicking outside of it
  const handleOutsideClick = (event) => {
    if (event.target.id === "modal") {
      closeModal();
    }
  };

  useEffect(() => {
    if (allUsers.length === 0) {
      dispatch(fetchAllUsers());
    }

    if (data.length === 0) {
      dispatch(fetchAllLots());
    } else {
      const auctionData = data?.data?.find(
        (lot) => lot.lot_auct_id == auctionId
      );

      setAuctionName(auctionData ? auctionData.lot_code.split("-")[0] : "");
    }
  }, [dispatch, data]);

  const exportToExcel = async () => {
    console.log("first");
    const worksheetData = data?.data
      ?.filter((lot) => lot.lot_auct_id == auctionId) // Filter rows based on auctionId
      .map((lot) => ({
        "AUCTION Name": lot.lot_code.split("-")[0] || "",
        "LOT ID": lot.lot_id || "",
        "Lot Image": lot.lot_img_1 || "",
        "Lot Code": lot.lot_code || "",
        "Handle Name": lot.bd_handle || "-",
        "Max Bid": lot.bd_current_bid || "-",
      }));

    //   if (!worksheetData || worksheetData.length === 0) {
    //     console.log("No data available for export.");
    //     return;
    //   }

    const auctionName = worksheetData[0]["AUCTION Name"] || "auctionData";

    // Generate the worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, auctionName);

    XLSX.writeFile(workbook, `Auction-${auctionName}.xlsx`);
    // XLSX.writeFile(workbook, `auctionData.xlsx`);
  };

  const handleNewBidSubmit = async (e) => {
    e.preventDefault();

    // bid should be greater than current bi
    if (
      Number(newBid) <
      (lotData?.bd_current_bid
        ? lotData?.bd_current_bid
        : lotData?.lot_est_min_bid)
    ) {
      return toast.error(
        `Bid should be greater than ₹ ${
          lotData?.bd_current_bid
            ? lotData?.bd_current_bid
            : lotData?.lot_est_min_bid
        }`,
        { position: "top-right" }
      );
    }

    // new user detail on behalf of whom admin is placing bid
    const userDetails = await allUsers.data.find(
      (user) => user.handlename === newHandleName
    );

    if (userDetails) {
      const token = localStorage.getItem("token");

      // if no token then redirect to admin login
      if (!token) {
        toast.error("Session Expired, Please Login", { position: "top-right" });
        setCompLoading(false);
        return router.push("/admin");
      }
      setCompLoading(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("bidAuctId", lotData?.lot_auct_id);
        formDataToSend.append("bidLotId", lotData?.lot_id);
        formDataToSend.append("bidOwnerId", userDetails?.id);
        formDataToSend.append("bidBidderHandle", userDetails?.handlename);
        formDataToSend.append("bidAmt", newBid);
        formDataToSend.append("isBooked", false);
        formDataToSend.append("nextBidAmt", lotData?.lot_min_incr);

        const response = await fetch(`/api/admin/place-bid`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        });

        if (response.status === 401) {
          // Token is expired or invalid
          console.log("Token expired");
          localStorage.removeItem("token"); // Remove the expired token
          return router.push("/admin");
        }

        const data = await response.json();
        if (response.ok) {
          toast.success("Bid Placed Successsfully", {
            position: "top-right",
          });
          dispatch(fetchAllLots());
          setIsOpen(false);
        } else {
          toast.error(data.error, { position: "top-right" });
        }
      } catch (error) {
        console.error("Error during Bid Place by admin add:", error);
        toast.error("Bid Update failed", { position: "top-right" });
      } finally {
        setCompLoading(false);
      }
    } else {
      console.log("User not found");
      toast.error("User not found", { position: "top-right" });
    }
  };

  return (
    <>
      {loading && <Loader />}
      {compLoading && <Loader />}
      <div className="dashboard-section pt-110 mb-110">
        <div className="container">
          <div className="dashboard-wrapper">
            <AdminSideBar />
            <div className="dashboard-content-wrap">
              <div className="bidding-summary-wrap">
                <div className="auct-header">
                  <h6>PR List {auctionName ? `- ${auctionName}` : ""}</h6>
                  <button
                    className="btn btn primary"
                    style={{ backgroundColor: "#0d6efd" }}
                    onClick={exportToExcel}
                  >
                    Export As Excel
                  </button>
                </div>
                <table className="bidding-summary-table">
                  <thead>
                    <tr>
                      <th>Lot ID</th>
                      <th>Lot Image</th>
                      <th>Lot Code</th>
                      <th>Handle Name</th>
                      <th>Max Bid</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading &&
                      data?.data?.map((lot) => {
                        if (lot.lot_auct_id == auctionId) {
                          return (
                            <tr key={lot.lot_id}>
                              <td data-label="Lot ID">{lot.lot_id}</td>
                              <td data-label="Lot Image">
                                <img width="40px" src={`/${lot.lot_img_1}`} />
                              </td>
                              <td data-label="Lot Code">{lot.lot_code}</td>
                              <td data-label="Handle Name">
                                {lot.bd_handle || "-"}
                              </td>
                              <td data-label="Max Bid">
                                {lot.bd_current_bid || "-"}
                              </td>
                              <td data-label="Action">
                                <button
                                  className="btn btn-primary"
                                  onClick={() => openModal(lot)}
                                >
                                  Floor Bid
                                </button>
                                {/* <FormModal onSubmitForm={handleNewBid}/> */}
                              </td>
                            </tr>
                          );
                        } else {
                        }
                      })}
                  </tbody>
                </table>
              </div>

              {isOpen && (
                <div id="modal" className="modal" onClick={handleOutsideClick}>
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <h2>Place Your Bid</h2>
                    <form onSubmit={handleNewBidSubmit} id="newBidForm">
                      <div className="form-group">
                        <label htmlFor="newBid" className="newBidLabel">
                          New Bid:
                        </label>
                        <input
                          type="number"
                          id="newBid"
                          value={newBid}
                          onChange={(e) => setNewBid(e.target.value)}
                          className="newBidInputs"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="handleName" className="newBidLabel">
                          Handle Name:
                        </label>
                        <input
                          type="text"
                          id="handleName"
                          value={newHandleName}
                          onChange={(e) => setNewHandleName(e.target.value)}
                          className="newBidInputs"
                          required
                        />
                      </div>
                      <button type="submit">Submit</button>
                    </form>
                  </div>
                </div>
              )}

              <div className="row pt-40">
                <div className="col-lg-12">
                  <div className="custom-pagination-area">
                    <ul>
                      {/* Pagination buttons */}
                      <li>
                        <button className="custom-page-item">&lt;&lt;</button>
                      </li>
                      <li>
                        <button className="custom-page-item">
                          &lt; Previous
                        </button>
                      </li>
                      {[0].map((num) => (
                        <li key={num + 1}>
                          <button className={`custom-page-item`}>
                            {num + 1}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button className="custom-page-item">Next &gt;</button>
                      </li>
                      <li>
                        <button className="custom-page-item" disabled>
                          &gt;&gt;
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionPrData;
