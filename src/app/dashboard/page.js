import Breadcrumb1 from "@/components/common/Breadcrumb1";
import UserDashBoard from "@/components/dashboard/UserDashBoard";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import InnerPageHeader1 from "@/components/header/InnerPageHeader1";
import React from "react";

export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};
const DashbaordPage = () => {
  return (
    <>
      <Header />
      <Breadcrumb1 pagetitle={"Dashboard"} currentPage={"Dashboard"} />
      <UserDashBoard />
      <Footer />
    </>
  );
};

export default DashbaordPage;
