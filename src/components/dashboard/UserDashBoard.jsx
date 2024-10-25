"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "@/store/slices/userBidsSlice";
import DashboardSideBar from "./DashboardSideBar";
const UserDashBoard = () => {
  // const [userData, setUserData] = useState({});
  // const [loading, setLoading] = useState(false);
  // Set items per page and initial current page
  const [currentPage, setCurrentPage] = useState(1);


  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.userProfile);
  // console.log("====userData===>", userData);
  // console.log("====error===>", error);


  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);


  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       return router.push("/login");
  //     }
  //     setLoading(true);
  //     try {
  //       const response = await fetch("/api/profile", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (response.status === 401) {
  //         // Token is expired or invalid
  //         console.log("Token expired");
  //         localStorage.removeItem("token"); // Remove the expired token
  //         toast.error('Token Expired Please Login', {position: 'top-right'})
  //         return router.push("/login");
  //       } else if(response.status === 500) {
  //         console.log("====status 500===")
  //         toast.error('Internal Server Error', {position: 'top-right'})
  //         return;
  //       }

  //       const { user } = await response.json();
  //       console.log("=======user=====>", user);
  //       setUserData(user);
  //     } catch (error) {
  //       console.error("Error fetching profile in UserDashboard:", error);
  //     } finally {
  //       setLoading(false);
  //     }

  //   };

  //   fetchUserProfile();
  // }, []);

  const itemsPerPage = 10;

  // Calculate start and end index
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // document.getElementById('lot-content-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Calculate total number of results
  //   const totalResults = Object.keys(userData).length;
  //   const startResult = indexOfFirstItem + 1;
  //   const endResult =
  //     indexOfLastItem > totalResults ? totalResults : indexOfLastItem;

  // if(error) {
  //   toast.error(error,{ position: 'top-right'});
  //   console.log("====errror==", error)
  //   return;
  // }

  /* getting readable date */
  const getDate = (sampleDate) => {
    // const dateString = "2024-10-16T06:53:18.000Z";
    const date = new Date(sampleDate);

    // Options for formatting the date
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric", // Full year (4 digits)
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    // Format the date
    const formattedDate = date.toLocaleDateString("en-GB", options);

    return formattedDate;
  };


  return (
    <>
      {loading && <Loader />}
      <div className="dashboard-section pt-110 mb-110">
        <div className="container">
          <div className="dashboard-wrapper">
            <DashboardSideBar />
            <div className="dashboard-content-wrap">
              {userData && Object.keys(userData).length > 0 || !error ? (
                <>
                  <div className="profile-info-wrap">
                    <div className="profile-img">
                      <img
                        // src="/assets/img/inner-pages/dashboard-profile-img.png"
                        src={userData[0]?.profileimage}
                        alt=""
                      />
                    </div>
                    <div className="profile-content">
                      <h4>Hi, {userData[0]?.name}</h4>
                      {/* <p>
            You Have Completed 10 Auctions In The Last Month. Start Your
            auction Today.
          </p> */}
                    </div>
                  </div>

                  <div className="row g-lg-3 gy-4">
                    <div className="col-lg-4">
                      <div className="single-counter-card">
                        <span>Bids Attend</span>
                        <h2>
                          {
                            Object.values(userData).filter(
                              (item) =>
                                item?.lot_id !== null &&
                                item?.lot_id !== undefined
                            ).length
                          }
                        </h2>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="single-counter-card two">
                        <span>Bids Won</span>
                        <h2>-</h2>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="single-counter-card three">
                        <span>Cancel Auction</span>
                        <h2>-</h2>
                      </div>
                    </div>
                  </div>

                  <div className="bidding-summary-wrap">
                    <h6>Bidding Summary</h6>
                    <table className="bidding-summary-table">
                      <thead>
                        <tr>
                          <th>Lot ID</th>
                          <th>Product name</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Bid Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(userData).length > 0 &&
                        Object.values(userData).some(
                          (data) => data?.lot_id !== null
                        ) ? (
                          Object.keys(userData)
                            .slice(indexOfFirstItem, indexOfLastItem)
                            .map((index) => {
                              return (
                                <tr key={index}>
                                  <td data-label="Auction ID">
                                    {userData[index]?.lot_id !== null
                                      ? userData[index]?.lot_id
                                      : "No data"}
                                  </td>
                                  <td data-label="Product name">
                                    {(userData[index]?.lot_description !== null
                                      ? userData[index]?.lot_description
                                      : "No description"
                                    )
                                      .split("")
                                      .splice(0, 50)
                                      .join("")}
                                    ...
                                  </td>
                                  <td data-label="Amount">
                                    {userData[index]?.bid_amt !== null
                                      ? userData[index]?.bid_amt
                                      : "No amount"}
                                  </td>
                                  <td data-label="Status">
                                    <span>
                                      {userData[index]?.lot_status !== null
                                        ? userData[index]?.lot_status
                                        : "No status"}
                                    </span>
                                  </td>
                                  <td data-label="Auction Date">
                                    {userData[index]?.bid_date !== null
                                      ? getDate(userData[index]?.bid_date)
                                      : "-"}
                                  </td>
                                </tr>
                              );
                            })
                        ) : (
                          <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                              No data
                            </td>
                          </tr>
                        )}
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
                              onClick={() => paginate(1)}
                              className="custom-page-item"
                              disabled={currentPage === 1}
                            >
                              &lt;&lt;
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                paginate(currentPage > 1 ? currentPage - 1 : 1)
                              }
                              className="custom-page-item"
                              disabled={currentPage === 1}
                            >
                              &lt; Previous
                            </button>
                          </li>
                          {[
                            ...Array(
                              Math.ceil(
                                Object.keys(userData).length / itemsPerPage
                              )
                            ).keys(),
                          ].map((num) => (
                            <li key={num + 1}>
                              <button
                                onClick={() => paginate(num + 1)}
                                className={`custom-page-item ${
                                  currentPage === num + 1 ? "custom-active" : ""
                                }`}
                              >
                                {num + 1}
                              </button>
                            </li>
                          ))}
                          <li>
                            <button
                              onClick={() =>
                                paginate(
                                  currentPage <
                                    Math.ceil(
                                      Object.keys(userData).length /
                                        itemsPerPage
                                    )
                                    ? currentPage + 1
                                    : currentPage
                                )
                              }
                              className="custom-page-item"
                              disabled={
                                currentPage ===
                                Math.ceil(
                                  Object.keys(userData).length / itemsPerPage
                                )
                              }
                            >
                              Next &gt;
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                paginate(
                                  Math.ceil(
                                    Object.keys(userData).length / itemsPerPage
                                  )
                                )
                              }
                              className="custom-page-item"
                              disabled={
                                currentPage ===
                                Math.ceil(
                                  Object.keys(userData).length / itemsPerPage
                                )
                              }
                            >
                              &gt;&gt;
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <h4>No data available</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashBoard;
