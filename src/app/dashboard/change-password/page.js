import Breadcrumb1 from "@/components/common/Breadcrumb1";
import ChangePassword from "@/components/dashboard/ChangePassword";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import InnerPageHeader1 from "@/components/header/InnerPageHeader1";
import Link from "next/link";
import React from "react";
export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    // icon: "/assets/img/fav-icon.svg",
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};
const ChangePasswordPage = () => {
  return (
    <>
      <Header />
      <Breadcrumb1 pagetitle="Change Password" currentPage="Change Password" />
      <ChangePassword />
      <Footer />
    </>
  );
};

export default ChangePasswordPage;
