"use client";
import auctionCardData from "../../data/auction-card.json";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Link from "next/link";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);
import { useEffect, useMemo, useState } from "react";
import Shimmer from "../shimmer-ui/Shimmer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import io from "socket.io-client";
import { fetchAllAuctions } from "@/store/slices/allDataSlice";
import getReadableDate from "@/utils/getReadableDate";

const socket = io("http://localhost:4000"); // calling socket server

const Home1ClosedAuction = () => {

  const dispatch = useDispatch();
 
  const { data: auctionLists, loading, error } = useSelector((state) => state.tablesData.allauctions);
  
//   useEffect(() => {
//       // if allAuctions is empty
//       if (auctionLists.length === 0) {
//           dispatch(fetchAllAuctions());
//       }
//   },[dispatch, auctionLists]);

  console.log("=====auctionLists=====>", auctionLists);
  socket.on("connect_error", async (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".auction-slider-next",
        prevEl: ".auction-slider-prev",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 4,
        },
      },
    };
  }, []);

  // if (loading) return <h2>Loading... <Loader /></h2>;

  return (
    <>
      <div className="live-aution-section mb-110">
        <div className="container">
          <div
            className="row mb-60 wow animate fadeInDown"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="section-title">
                <h2>
                  Closed <span>Auctions</span>
                </h2>
              </div>
              <div className="slider-btn-grp">
                <div className="slider-btn auction-slider-prev">
                  <svg
                    width={9}
                    height={15}
                    viewBox="0 0 9 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 7.50009L9 0L3.27273 7.50009L9 15L0 7.50009Z" />
                  </svg>
                </div>
                <div className="slider-btn auction-slider-next">
                  <svg
                    width={9}
                    height={15}
                    viewBox="0 0 9 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 7.50009L0 0L5.72727 7.50009L0 15L9 7.50009Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {auctionLists.length !== 0 ? (
            <div
              className="auction-slider-area mb-70 wow animate fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1500ms"
            >
              <div className="row">
                <div className="col-lg-12">
                  <Swiper {...settings} className="swiper auction-slider">
                    <div className="swiper-wrapper">
                      {auctionLists &&
                      auctionLists.data.filter((auct) => auct.auct_status === "CLOSED")
                        .length > 0 ? (
                        auctionLists.data
                          .filter((auct) => auct.auct_status === "CLOSED")
                          .map((auct) => (
                            <SwiperSlide
                              key={auct.auct_id}
                              className="swiper-slide"
                            >
                              <div className="auction-card">
                                <div className="auction-card-img-wrap">
                                    <img
                                      src={auct?.image_address}
                                      alt=""
                                      height="230px"
                                      width='100%'
                                    />
                                  <div className="batch">
                                    <span className="close">
                                    <svg width={9} height={9} viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.731707 3.29268H0V7.46341C0 8.30488 0.695122 9 1.53659 9H7.46341C8.30488 9 9 8.30488 9 7.46341V3.29268H8.26829H0.731707ZM5.67073 4.84756C5.79878 4.70122 6.05488 4.71951 6.18293 4.84756C6.58537 5.21341 6.96951 5.57927 7.37195 5.96342C7.51829 6.10976 7.5 6.34756 7.37195 6.47561C7.0061 6.87805 6.64024 7.2622 6.2561 7.66463C6.10976 7.81098 5.87195 7.79268 5.7439 7.66463C5.59756 7.53659 5.61585 7.28049 5.7439 7.15244C6.01829 6.84146 6.31098 6.54878 6.58537 6.23781C6.27439 5.94512 5.96341 5.65244 5.65244 5.37805C5.5061 5.21342 5.52439 4.97561 5.67073 4.84756ZM4.20732 4.84756C4.33537 4.70122 4.59146 4.71951 4.71951 4.84756C5.12195 5.21341 5.5061 5.57927 5.90854 5.96342C6.05488 6.10976 6.03658 6.34756 5.90854 6.47561C5.54268 6.87805 5.17683 7.2622 4.79268 7.66463C4.64634 7.81098 4.40854 7.79268 4.28049 7.66463C4.13415 7.53659 4.15244 7.28049 4.28049 7.15244C4.55488 6.84146 4.84756 6.54878 5.12195 6.23781C4.81098 5.94512 4.5 5.65244 4.18902 5.37805C4.04268 5.21342 4.06098 4.97561 4.20732 4.84756ZM8.26829 2.56098H9V1.53659C9 0.713415 8.34146 0.0365854 7.51829 0V0.841463C7.51829 1.04268 7.35366 1.20732 7.15244 1.20732C6.95122 1.20732 6.78658 1.02439 6.78658 0.841463V0H2.26829V0.804878C2.26829 1.0061 2.10366 1.17073 1.90244 1.17073C1.70122 1.17073 1.53659 0.987805 1.53659 0.804878V0C0.695122 0 0 0.695122 0 1.53659V2.56098H0.731707H8.26829Z" />
                                  </svg>
                                      Closed
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
                                          <path d="M8.00013 3.32629L7.32792...Z" />
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
                                            d="M15.4028 5.44118C14.0143...Z"
                                          />
                                        </svg>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div className="auction-card-content">
                                  <h6 style={{ height: "100px" }}>

                                      {auct?.auct_detail
                                        .split("")
                                        .slice(0, 100)
                                        .join("")}
                                      ...

                                  </h6>
                                  <div className="price-and-code-area">
                                    {/* <div className="price">
                                      <span>Start Date: </span>
                                      <strong>{getReadableDate(auct?.start_date)}</strong>
                                    </div> */}
                                    <div className="code">
                                      <span>Auction # {auct?.auct_code}</span>
                                    </div>
                                  </div>
                                    <div className="author-and-btn-area">
                                      <Link
                                        href={Boolean(localStorage.getItem('token')) ? `/closed-auction/${auct.auct_id}` : '/login'}
                                        className="bid-btn"
                                      >
                                        View Lots
                                      </Link>
                                    </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))
                      ) : (
                        <h2>No upcoming Lots</h2>
                      )}
                    </div>
                  </Swiper>
                </div>
              </div>
            </div>
          ) : error ? (
            <h2>No Data Available</h2>
          ) : (
            <Shimmer />
          )}
          {/* <div
            className="row wow animate fadeInUp"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <div className="col-lg-12 d-flex justify-content-center">
              <Link className="view-button" href="/auction-grid">
                View All Auction
                <svg viewBox="0 0 13 20">
                  <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                </svg>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home1ClosedAuction;
