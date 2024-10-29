"use client";
import { useCountdownTimer } from "@/customHooks/useCountdownTimer";
import { fetchUserProfile } from "@/store/slices/userBidsSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import DashboardSideBar from "./DashboardSideBar";

const MultipurposeMyAuction = () => {
  //   const { days, hours, minutes, seconds } = useCountdownTimer(
  //     "2024-10-23 12:00:00"
  //   );

  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector(
    (state) => state.userProfile
  );

  const [currentPage, setCurrentPage] = useState(1);

  //   console.log("=====userData====>", userData);
  useEffect(() => {
    if (Object.keys(userData).length == 0) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  //   if(error) {
  //     toast.error(error,{ position: 'top-right'});
  //     console.log("====errror==in=====MultiPurposeMyAuction====>", error)
  //     return;
  //   }

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

  const itemsPerPage = 6;

  // Calculate start and end index
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // document.getElementById('lot-content-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="dashboard-section pt-110 mb-110">
        <div className="container">
          <div className="dashboard-wrapper">
            <DashboardSideBar />
            <div className="dashboard-content-wrap">
              <div className="my-auction-wrap">
                <h6>My Bids</h6>
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-active-bid-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-active-bid"
                      type="button"
                      role="tab"
                      aria-controls="pills-active-bid"
                      aria-selected="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width={14}
                        height={14}
                        x={0}
                        y={0}
                        viewBox="0 0 512.001 512.001"
                        xmlSpace="preserve"
                        className
                      >
                        <g>
                          <path
                            d="M315.001 481.91h-16.518c-6.969-34.191-37.266-60-73.482-60h-120c-36.216 0-66.513 25.809-73.482 60H15.001c-8.291 0-15 6.709-15 15s6.709 15 15 15h300c8.291 0 15-6.709 15-15s-6.709-15-15-15zM390.626 136.156 263.347 8.878c-11.717-11.717-30.712-11.717-42.427 0-11.715 11.715-11.715 30.71 0 42.426L348.2 178.583c11.715 11.715 30.71 11.715 42.426 0 11.715-11.717 11.715-30.71 0-42.427zM178.494 348.289l-127.28-127.28c-11.715-11.715-30.71-11.715-42.426 0-11.717 11.715-11.717 30.71 0 42.427l127.279 127.279c11.717 11.715 30.71 11.715 42.427 0 11.715-11.715 11.715-30.71 0-42.426zM72.42 199.797 199.699 72.52l127.276 127.277-127.276 127.277zM498.822 435.091l-21.343-23.163-63.64 63.64 21.343 23.163c17.574 17.573 46.066 17.573 63.64 0 17.573-17.574 17.573-46.066 0-63.64zM355.555 292.004c2.529-9.922.411-20.802-7.355-28.568-11.717-11.717-30.712-11.717-42.427 0l-42.426 42.426c-11.717 11.715-11.717 30.71 0 42.427 7.766 7.766 18.647 9.884 28.568 7.355l100.71 98.71 63.64-63.64-100.71-98.71z"
                            opacity={1}
                            data-original="#000000"
                          />
                        </g>
                      </svg>
                      Active Bid
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-win-bid-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-win-bid"
                      type="button"
                      role="tab"
                      aria-controls="pills-win-bid"
                      aria-selected="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width={14}
                        height={13}
                        x={0}
                        y={0}
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                      >
                        <g>
                          <path
                            d="M419.84 409.6H92.16c-16.937 0-30.72 13.783-30.72 30.72s13.783 30.72 30.72 30.72h327.68c16.937 0 30.72-13.783 30.72-30.72s-13.783-30.72-30.72-30.72zM471.04 102.4c-22.589 0-40.96 18.371-40.96 40.96 0 15.176 8.397 28.303 20.705 35.389-23.695 56.115-60.662 90.542-95.212 87.429-38.42-3.133-69.755-48.558-87.04-124.559 22.159-5.612 38.666-25.58 38.666-49.459 0-28.242-22.958-51.2-51.2-51.2-28.242 0-51.2 22.958-51.2 51.2 0 23.88 16.507 43.848 38.666 49.459-17.285 76.001-48.62 121.426-87.04 124.559-34.406 3.113-71.537-31.314-95.211-87.429 12.308-7.086 20.705-20.214 20.705-35.389 0-22.589-18.371-40.96-40.96-40.96C18.371 102.4 0 120.771 0 143.36c0 21.013 15.974 38.175 36.372 40.509L75.817 389.12h360.366l39.444-205.251C496.026 181.535 512 164.373 512 143.36c0-22.589-18.371-40.96-40.96-40.96z"
                            opacity={1}
                            data-original="#000000"
                          />
                        </g>
                      </svg>
                      Win Bid
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-close-bid-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-close-bid"
                      type="button"
                      role="tab"
                      aria-controls="pills-close-bid"
                      aria-selected="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width={14}
                        height={14}
                        x={0}
                        y={0}
                        viewBox="0 0 48 48"
                        xmlSpace="preserve"
                      >
                        <g>
                          <path
                            d="M24 0a24 24 0 1 0 24 24A24 24 0 0 0 24 0zm10.6 30.66a2.79 2.79 0 1 1-3.94 3.94L24 27.94l-6.66 6.66a2.79 2.79 0 1 1-3.94-3.94L20.06 24l-6.66-6.66a2.79 2.79 0 0 1 3.94-3.94L24 20.06l6.66-6.66a2.79 2.79 0 1 1 3.94 3.94L27.94 24z"
                            opacity={1}
                            data-original="#000000"
                          />
                        </g>
                      </svg>
                      Close Bid
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-active-bid"
                    role="tabpanel"
                    aria-labelledby="pills-active-bid-tab"
                  >
                    <div className="row g-4">
                      {userData &&
                      Object.keys(userData).length > 0 &&
                      Object.values(userData).some(
                        (data) =>
                          data?.lot_id !== null && data?.auct_status === "LIVE"
                      ) &&
                      !error ? (
                        Object.keys(userData)
                          .filter(
                            (index) => userData[index]?.auct_status === "LIVE"
                          ).slice(indexOfFirstItem, indexOfLastItem)
                          .map((index) => {
                            return (
                              <div
                                className="col-xl-4 col-lg-6"
                                key={userData[index]?.bid_id}
                              >
                                <div className="auction-card style-3">
                                  <div className="auction-card-img-wrap">
                                    <Link
                                      href={`/auction-details/${userData[index].lot_id}`}
                                      className="card-img"
                                    >
                                      <img
                                        src={`/${userData[index]?.lot_front_img}`}
                                        alt=""
                                        height="237px"
                                      />
                                    </Link>
                                    <div className="batch">
                                      <span className="live">
                                        <svg
                                          width={11}
                                          height={11}
                                          viewBox="0 0 11 11"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                        </svg>
                                        Live
                                      </span>
                                      <div className="code-no">
                                        <span className="code">
                                          Lot # {userData[index]?.lot_code}
                                        </span>
                                      </div>
                                    </div>
                                    <ul className="view-and-favorite-area">
                                      <li>
                                        <a href="#">
                                          <svg
                                            width={16}
                                            height={15}
                                            viewBox="0 0 16 15"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
                                          </svg>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <svg
                                            width={17}
                                            height={11}
                                            viewBox="0 0 17 11"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z"
                                            />
                                          </svg>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="auction-card-content">
                                    <h6 style={{ height: "110px" }}>
                                      <Link
                                        href={`/auction-details/${userData[index].lot_id}`}
                                      >
                                        {userData[index]?.lot_description
                                          .split("")
                                          .splice(0, 50)
                                          .join("")}
                                        ...
                                      </Link>
                                    </h6>
                                    <div style={{ marginBottom: "2px" }}>
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: 400,
                                          color: "#23291FBB",
                                        }}
                                      >
                                        Bid Time:{" "}
                                      </span>
                                      <strong style={{ fontWeight: "500" }}>
                                        {getDate(userData[index]?.bid_date)}
                                      </strong>
                                    </div>
                                    <div className="price-and-code-area">
                                      <div>
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            fontWeight: 400,
                                            color: "#23291FBB",
                                          }}
                                        >
                                          Bid at:{" "}
                                        </span>
                                        <strong style={{ fontWeight: "500" }}>
                                          ₹ {userData[index]?.bid_amt}
                                        </strong>
                                      </div>
                                      {/* <Link
                                      href="/auction-details"
                                      className="bid-btn"
                                    >
                                      Bid Now
                                    </Link> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <h4>No data available</h4>
                        </div>
                      )}
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
                                  paginate(
                                    currentPage > 1 ? currentPage - 1 : 1
                                  )
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
                                    currentPage === num + 1
                                      ? "custom-active"
                                      : ""
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
                                      Object.keys(userData).length /
                                        itemsPerPage
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
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-win-bid"
                    role="tabpanel"
                    aria-labelledby="pills-win-bid-tab"
                  >
                    <div className="row g-4">
                      <div className="col-xl-4 col-lg-6">
                        <div className="auction-card style-3">
                          <div className="auction-card-img-wrap">
                            <Link href="#" className="card-img">
                              <img
                                src="/assets/img/home3/auction-img3.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="win">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  version="1.1"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  width={11}
                                  height={11}
                                  x={0}
                                  y={0}
                                  viewBox="0 0 512 512"
                                  style={{
                                    enableBackground: "new 0 0 512 512",
                                  }}
                                  xmlSpace="preserve"
                                >
                                  <g>
                                    <path
                                      d="M419.84 409.6H92.16c-16.937 0-30.72 13.783-30.72 30.72s13.783 30.72 30.72 30.72h327.68c16.937 0 30.72-13.783 30.72-30.72s-13.783-30.72-30.72-30.72zM471.04 102.4c-22.589 0-40.96 18.371-40.96 40.96 0 15.176 8.397 28.303 20.705 35.389-23.695 56.115-60.662 90.542-95.212 87.429-38.42-3.133-69.755-48.558-87.04-124.559 22.159-5.612 38.666-25.58 38.666-49.459 0-28.242-22.958-51.2-51.2-51.2-28.242 0-51.2 22.958-51.2 51.2 0 23.88 16.507 43.848 38.666 49.459-17.285 76.001-48.62 121.426-87.04 124.559-34.406 3.113-71.537-31.314-95.211-87.429 12.308-7.086 20.705-20.214 20.705-35.389 0-22.589-18.371-40.96-40.96-40.96C18.371 102.4 0 120.771 0 143.36c0 21.013 15.974 38.175 36.372 40.509L75.817 389.12h360.366l39.444-205.251C496.026 181.535 512 164.373 512 143.36c0-22.589-18.371-40.96-40.96-40.96z"
                                      opacity={1}
                                      data-original="#000000"
                                    />
                                  </g>
                                </svg>
                                Win
                              </span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="#">
                                Victorian silver color wall old clock set.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Winnig Bid at:</span>
                                <strong>$2,898</strong>
                              </div>
                              <a className="bid-btn disabled">Won Bid</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-close-bid"
                    role="tabpanel"
                    aria-labelledby="pills-close-bid-tab"
                  >
                    <div className="row g-4">
                      {userData &&
                      Object.keys(userData).length > 0 &&
                      Object.values(userData).some(
                        (data) =>
                          data?.lot_id !== null && data?.auct_status === "CLOSED"
                      ) &&
                      !error ? (
                        Object.keys(userData)
                          .filter(
                            (index) => userData[index]?.auct_status === "CLOSED"
                          ).slice(indexOfFirstItem, indexOfLastItem)
                          .map((index) => {
                            return (
                              <div
                                className="col-xl-4 col-lg-6"
                                key={userData[index]?.bid_id}
                              >
                                <div className="auction-card style-3">
                                  <div className="auction-card-img-wrap">
                                    <Link
                                      href={`/auction-details/${userData[index].lot_id}`}
                                      className="card-img"
                                    >
                                      <img
                                        src={`/${userData[index]?.lot_front_img}`}
                                        alt=""
                                        height="237px"
                                      />
                                    </Link>
                                    <div className="batch">
                                      <span className="close">
                                        <svg
                                          width={11}
                                          height={11}
                                          viewBox="0 0 11 11"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                        </svg>
                                        closed
                                      </span>
                                      <div className="code-no">
                                        <span className="code">
                                          Lot # {userData[index]?.lot_code}
                                        </span>
                                      </div>
                                    </div>
                                    <ul className="view-and-favorite-area">
                                      <li>
                                        <a href="#">
                                          <svg
                                            width={16}
                                            height={15}
                                            viewBox="0 0 16 15"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
                                          </svg>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <svg
                                            width={17}
                                            height={11}
                                            viewBox="0 0 17 11"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z"
                                            />
                                          </svg>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="auction-card-content">
                                    <h6 style={{ height: "110px" }}>
                                      <Link
                                        href={`/auction-details/${userData[index].lot_id}`}
                                      >
                                        {userData[index]?.lot_description
                                          .split("")
                                          .splice(0, 50)
                                          .join("")}
                                        ...
                                      </Link>
                                    </h6>
                                    <div style={{ marginBottom: "2px" }}>
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: 400,
                                          color: "#23291FBB",
                                        }}
                                      >
                                        Bid Time:{" "}
                                      </span>
                                      <strong style={{ fontWeight: "500" }}>
                                        {getDate(userData[index]?.bid_date)}
                                      </strong>
                                    </div>
                                    <div className="price-and-code-area">
                                      <div>
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            fontWeight: 400,
                                            color: "#23291FBB",
                                          }}
                                        >
                                          Bid at:{" "}
                                        </span>
                                        <strong style={{ fontWeight: "500" }}>
                                          ₹ {userData[index]?.bid_amt}
                                        </strong>
                                      </div>
                                      {/* <Link
                                      href="/auction-details"
                                      className="bid-btn"
                                    >
                                      Bid Now
                                    </Link> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <h4>No data available</h4>
                        </div>
                      )}
                    </div>
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

export default MultipurposeMyAuction;
