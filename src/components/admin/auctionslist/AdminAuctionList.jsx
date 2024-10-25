'use client'

import { useDispatch, useSelector } from "react-redux";
import AdminSideBar from "../admindashboard/AdminSideBar";
import { fetchAllAuctions } from "@/store/slices/allDataSlice";
import { useEffect } from "react";
import Loader from "@/components/loader/Loader";
import './AdminAuctionList.css';
import Link from "next/link";
import DeleteButton from "@/components/swal-fire-model/DeleteButton";
import { toast } from "react-toastify";

const AdminAuctionList = () => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.tablesData.allauctions);

    useEffect(() => {
        //call if allAuctions is empty
        if (data.length === 0) {
            dispatch(fetchAllAuctions());
        }
    },[dispatch, data]);

    const handleDelete = async (auctionId) => {

      const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Session Expired, Please Login", { position: "top-right" });
            setLoading(false);
            return router.push("/admin");
        }

      try {
        const res = await fetch(`/api/admin/delete-auction/${auctionId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data.message);
          dispatch(fetchAllAuctions());
        } else {
          const errorData = await res.json();
          console.error('Error:', errorData.message);
          toast.error(errorData.message, {position: 'top-right'});
        }
      } catch (error) {
        console.error('Request failed:', error);
        toast.error("Something Went Wrong", {position: 'top-right'});
      }
    }

  return (
    <>
      {loading && <Loader />}
      <div className="dashboard-section pt-110 mb-110">
        <div className="container">
          <div className="dashboard-wrapper">
            <AdminSideBar />
            <div className="dashboard-content-wrap">
              <div className="bidding-summary-wrap">
                <div className="auct-header">
                <h6>Auctions List</h6>
                <Link href='/admin/add_auction'>
                  <button className="btn btn primary" style={{backgroundColor:'#0d6efd'}}>Add Auction</button>
                </Link>
                </div>
                <table className="bidding-summary-table">
                  <thead>
                    <tr>
                      <th>Auction ID</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Auction</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                        !loading && data?.data?.map((auction) => {
                            return (
                                <tr key={auction.auct_id}>
                                    <td data-label="Auction ID">{auction.auct_id}</td>
                                    <td data-label="Name">{auction.auct_name}</td>
                                    <td data-label="Code">{auction.auct_code}</td>
                                    {/* <td data-label="Status">
                                    <span>Winning</span>
                                    </td> */}
                                    <td data-label="Location">{auction.auct_location}</td>
                                      {
                                          auction.auct_status === 'CLOSED' ? (<td data-label="Status">{auction.auct_status} - <Link href={`/admin/auction-pr/${auction.auct_id}`} target="blank" >PR</Link></td>) : <td data-label="PR">{auction.auct_status}</td>
                                      }
                                    <td data-label="Auction">
                                      <Link href={`/admin/edit-auction/${auction.auct_id}`}>
                                        <button className="btn btn-primary">Edit</button>
                                      </Link>
                                      &nbsp;
                                      <DeleteButton itemId={auction.auct_id} onDelete={handleDelete} />
                                    </td>
                              </tr>
                            )
                        })
                    }
                  </tbody>
                </table>
              </div>
              <div className="row pt-40">
                    <div className="col-lg-12">
                      <div className="custom-pagination-area">
                        <ul>
                          {/* Pagination buttons */}
                          <li>
                            <button
                              className="custom-page-item"
                            >
                              &lt;&lt;
                            </button>
                          </li>
                          <li>
                            <button
                              className="custom-page-item"
                            >
                              &lt; Previous
                            </button>
                          </li>
                          {[0].map((num) => (
                            <li key={num + 1}>
                              <button
                                className={`custom-page-item`}
                              >
                                {num + 1}
                              </button>
                            </li>
                          ))}
                          <li>
                            <button
                              className="custom-page-item"
                            >
                              Next &gt;
                            </button>
                          </li>
                          <li>
                            <button
                              className="custom-page-item"
                              disabled
                            >
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

export default AdminAuctionList;
