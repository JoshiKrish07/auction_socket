"use client";

import { useEffect, useMemo, useState } from "react";
import AuctionFilterSidebar from "../auction/AuctionFilterSidebar";
import SelectComponent from "../common/SelectComponent";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchLiveAuction } from "@/store/slices/auctionSlices";
import Loader from "../loader/Loader";
import Shimmer from "../shimmer-ui/Shimmer";

import io from 'socket.io-client';

const socket = io("http://localhost:4000");  // calling socket server

const PastAuctionLots = ({ auctionId }) => {

  const [activeColumn, setActiveColumn] = useState(4);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [lotData, setLotData] = useState([]);
  const sortOptions = [
    "Default Sorting",
    "Price Low to High",
    "Price High to Low",
  ];

  const dispatch = useDispatch();
  const { lots :lotData,loading, error } = useSelector((state) => state.auction);

  const lots = useSelector((state) => state.auction.lots);
  const haslotData = useMemo(() => lots.length > 0, [lots]);
  // Set items per page and initial current page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate start and end index
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    document
      .getElementById("lot-content-area")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* test for socket starts */
  useEffect(() => {
    if (!haslotData) {
      dispatch(fetchLiveAuction());
    }

    //handle bid update
    socket.on("bidUpdated", () => {
      dispatch(fetchLiveAuction());
    });

    return () => {
      socket.off("bidUpdated");
    };

  }, [dispatch, haslotData]);
  /* test for socket ends */


  const handleColumnClick = (columnNumber) => {
    setActiveColumn(columnNumber);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Calculate total number of results
  const totalResults = lotData?.filter((lot) => lot.lot_auct_id == auctionId).length;
  const startResult = indexOfFirstItem + 1;
  const endResult =
    indexOfLastItem > totalResults ? totalResults : indexOfLastItem;

  const handleSelectChange = (e) => {
    const { value } = e.target;
    if (value === "low-to-high") {
    } else if (value === "high-to-low") {
    } else if (value === "default") {
    }
  };

  // if (loading)
  //   return (
  //     <h2>
  //       Loading... <Loader />
  //     </h2>
  //   );
  return (
    <>
      <AuctionFilterSidebar isMenuOpen={isMenuOpen} />
      <div className="auction-grid-section pt-110 mb-110">
        <div className="container" id="lot-content-area">
          <div className="auction-grid-title-section mb-40">
            <h6>
              Showing {startResult}–{endResult} of {totalResults} results{" "}
            </h6>
            <div className="filter-selector">
              {/* <div className="filter" onClick={toggleMenu}>
                <div className="filter-icon">
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_456_25)">
                      <path d="M0.5625 3.17317H9.12674C9.38486 4.34806 10.4341 5.2301 11.6853 5.2301C12.9366 5.2301 13.9858 4.3481 14.2439 3.17317H17.4375C17.7481 3.17317 18 2.92131 18 2.61067C18 2.30003 17.7481 2.04817 17.4375 2.04817H14.2437C13.9851 0.873885 12.9344 -0.00871277 11.6853 -0.00871277C10.4356 -0.00871277 9.38545 0.873744 9.12695 2.04817H0.5625C0.251859 2.04817 0 2.30003 0 2.61067C0 2.92131 0.251859 3.17317 0.5625 3.17317ZM10.191 2.61215L10.191 2.6061C10.1935 1.78461 10.8638 1.11632 11.6853 1.11632C12.5057 1.11632 13.1761 1.78369 13.1796 2.6048L13.1797 2.61306C13.1784 3.43597 12.5086 4.10513 11.6853 4.10513C10.8625 4.10513 10.1928 3.43663 10.191 2.61422L10.191 2.61215ZM17.4375 14.8268H14.2437C13.985 13.6525 12.9344 12.7699 11.6853 12.7699C10.4356 12.7699 9.38545 13.6524 9.12695 14.8268H0.5625C0.251859 14.8268 0 15.0786 0 15.3893C0 15.7 0.251859 15.9518 0.5625 15.9518H9.12674C9.38486 17.1267 10.4341 18.0087 11.6853 18.0087C12.9366 18.0087 13.9858 17.1267 14.2439 15.9518H17.4375C17.7481 15.9518 18 15.7 18 15.3893C18 15.0786 17.7481 14.8268 17.4375 14.8268ZM11.6853 16.8837C10.8625 16.8837 10.1928 16.2152 10.191 15.3928L10.191 15.3908L10.191 15.3847C10.1935 14.5632 10.8638 13.8949 11.6853 13.8949C12.5057 13.8949 13.1761 14.5623 13.1796 15.3834L13.1797 15.3916C13.1785 16.2146 12.5086 16.8837 11.6853 16.8837ZM17.4375 8.43751H8.87326C8.61514 7.26262 7.56594 6.38062 6.31466 6.38062C5.06338 6.38062 4.01418 7.26262 3.75606 8.43751H0.5625C0.251859 8.43751 0 8.68936 0 9.00001C0 9.31068 0.251859 9.56251 0.5625 9.56251H3.75634C4.01498 10.7368 5.06559 11.6194 6.31466 11.6194C7.56439 11.6194 8.61455 10.7369 8.87305 9.56251H17.4375C17.7481 9.56251 18 9.31068 18 9.00001C18 8.68936 17.7481 8.43751 17.4375 8.43751ZM7.80901 8.99853L7.80898 9.00458C7.80652 9.82607 7.13619 10.4944 6.31466 10.4944C5.49429 10.4944 4.82393 9.82699 4.82038 9.00591L4.82027 8.99769C4.8215 8.17468 5.49141 7.50562 6.31466 7.50562C7.13753 7.50562 7.80718 8.17408 7.80905 8.99653L7.80901 8.99853Z" />
                    </g>
                  </svg>
                </div>
                <span>Filters</span>
              </div> */}
              <div className="selector">
                {/* <select onChange={(e) => handleSelectChange(e)}>
                  <option defaultValue='default' value='default'>Default</option>
                  <option value='low-to-high'>Price Low To High</option>
                  <option value='high-to-low'>Price High To Low</option>
                </select> */}
                <SelectComponent
                  options={sortOptions}
                  placeholder="Sort by price"
                />
              </div>
              <ul className="grid-view">
                <li
                  className={`column-2 ${activeColumn === 2 ? "active" : ""}`}
                  onClick={() => handleColumnClick(2)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={12}
                    height={20}
                    viewBox="0 0 12 20"
                  >
                    <g>
                      <rect width="4.88136" height="5.10638" rx="2.44068" />
                      <rect
                        y="7.44678"
                        width="4.88136"
                        height="5.10638"
                        rx="2.44068"
                      />
                      <rect
                        y="14.8937"
                        width="4.88136"
                        height="5.10638"
                        rx="2.44068"
                      />
                      <rect
                        x="7.11865"
                        width="4.88136"
                        height="5.10638"
                        rx="2.44068"
                      />
                      <rect
                        x="7.11865"
                        y="7.44678"
                        width="4.88136"
                        height="5.10638"
                        rx="2.44068"
                      />
                      <rect
                        x="7.11865"
                        y="14.8937"
                        width="4.88136"
                        height="5.10638"
                        rx="2.44068"
                      />
                    </g>
                  </svg>
                </li>
                <li
                  className={`column-3 ${activeColumn === 3 ? "active" : ""}`}
                  onClick={() => handleColumnClick(3)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                  >
                    <g clipPath="url(#clip0_1610_1442)">
                      <rect width="5.10638" height="5.10638" rx="2.55319" />
                      <rect
                        y="7.44678"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        y="14.8937"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="7.44678"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="7.44678"
                        y="7.44678"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="7.44678"
                        y="14.8937"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="14.8936"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="14.8936"
                        y="7.44678"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="14.8936"
                        y="14.8937"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                    </g>
                  </svg>
                </li>
                <li
                  className={`column-4 ${activeColumn === 4 ? "active" : ""}`}
                  onClick={() => handleColumnClick(4)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                  >
                    <g clipPath="url(#clip0_1610_1453)">
                      <rect width="3.64741" height="3.64741" rx="1.8237" />
                      <rect
                        y="8.17627"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        y={16}
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="5.31909"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="5.31909"
                        y="8.17627"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="5.31909"
                        y={16}
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="10.6382"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="16.3525"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="10.6384"
                        y="8.17627"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="16.3525"
                        y="8.17627"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="10.6382"
                        y={16}
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="16.3525"
                        y={16}
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                    </g>
                  </svg>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`list-grid-product-wrap column-${
              activeColumn === 2
                ? "2"
                : activeColumn === 3
                ? "3"
                : activeColumn === 4
                ? "4"
                : "4"
            }-wrapper`}
          >
            {lotData.length !== 0 ? (
              <>
                <div className="row g-4 mb-60">
                {lotData && (
                        <>
                            {lotData.filter((lot) => lot.lot_auct_id == auctionId).length === 0 ? (
                                <div className="no-data-message">
                                    <h2>No data available</h2>
                                </div>
                            ) : (
                            lotData.filter((lot) => lot.lot_auct_id == auctionId)
                                .slice(indexOfFirstItem, indexOfLastItem)
                                .map((lot) => {
                                return (
                                    <div
                                    className="col-xl-3 col-md-4 item wow animate fadeInDown"
                                    data-wow-delay="200ms"
                                    data-wow-duration="1500ms"
                                    key={lot.lot_id}
                                    >
                                    <div className="auction-card">
                                        <div className="auction-card-img-wrap">
                                        <Link
                                            href={
                                            Boolean(localStorage.getItem("token"))
                                                ? `/auction-details/${lot.lot_id}`
                                                : "/login"
                                            }
                                            className="card-img"
                                        >
                                            <img src={`/${lot.lot_front_img}`} alt="" height='237px' width='100%'/>
                                        </Link>
                                        <div className="batch">
                                            <span className={lot?.auct_status.toLowerCase()}>
                                            <svg
                                                width={11}
                                                height={11}
                                                viewBox="0 0 11 11"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                            </svg>
                                            {lot?.auct_status}
                                            </span>
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
                                        <h6 style={{height:'110px'}}>
                                            <Link
                                            href={
                                                Boolean(localStorage.getItem("token"))
                                                ? `/auction-details/${lot.lot_id}`
                                                : "/login"
                                            }
                                            >
                                            {lot?.lot_description
                                                .split("")
                                                .splice(0, 100)
                                                .join("")}
                                            ...
                                            </Link>
                                        </h6>
                                        <div className="price-and-code-area">
                                        <div className="price">
                                            <span>Sold At: </span>
                                            <strong>{lot.lot_status === 'SOLD' ? `₹ ${lot.lot_sell_price}` : 'UNSOLD'}</strong>
                                        </div>
                                            <div className="code">
                                                <span>Lot #{lot?.lot_code}</span>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                );
                                })
                            )}
                        </>
                        )}

                </div>
              </>
            ) : error ? (
              <h2>No Data Available</h2>
            ) : (
              <Shimmer />
            )}
          </div>
          <div className="row">
            <div
              className="col-lg-12 d-flex justify-content-center wow animate fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-pagination-area">
                <div className="custom-pagination-area">
                  <ul>
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
                      ...Array(Math.ceil(lotData.filter((lot) => lot?.lot_auct_id == auctionId).length / itemsPerPage)).keys(),
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
                              Math.ceil(lotData.length / itemsPerPage)
                              ? currentPage + 1
                              : currentPage
                          )
                        }
                        className="custom-page-item"
                        disabled={
                          currentPage ===
                          Math.ceil(lotData.length / itemsPerPage)
                        }
                      >
                        Next &gt;
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          paginate(Math.ceil(lotData.length / itemsPerPage))
                        }
                        className="custom-page-item"
                        disabled={
                          currentPage ===
                          Math.ceil(lotData.length / itemsPerPage)
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
        </div>
      </div>
    </>
  );
};

export default PastAuctionLots;
