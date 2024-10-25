"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Link from "next/link";
import { useCountdownTimer } from "@/customHooks/useCountdownTimer";
import Header2 from "@/components/header/Header2";
import Breadcrumb2 from "@/components/common/Breadcrumb2";
import Footer2 from "@/components/footer/Footer2";
import HandleQuantity from "@/components/common/HandleQuantity";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const AuctionDetailsPage = () => {
  const { days, hours, minutes, seconds } = useCountdownTimer(
    "2024-08-23 11:42:00"
  );
  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 15,
      grabCursor: true,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".category-slider-next",
        prevEl: ".category-slider-prev",
      },

      breakpoints: {
        280: {
          slidesPerView: 2,
        },
        350: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 5,
        },
        1400: {
          slidesPerView: 5,
        },
      },
    };
  }, []);
  const settingsForUpcomingAuction = useMemo(() => {
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
  return (
    <div>
      {/* <Header2 /> */}
      <Header />
      <Breadcrumb2 pagetitle="Auction Details" currentPage="Auction Details" />
      <Footer />
    </div>
  );
};

export default AuctionDetailsPage;
