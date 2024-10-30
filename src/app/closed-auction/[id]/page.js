import ClosedAuctionLots from "@/components/closed-auction/ClosedAuctionLots";
import Breadcrumb1 from "@/components/common/Breadcrumb1";
import MultipurposeMyAuction from "@/components/dashboard/MultipurposeMyAuction";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React from "react";
export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};
const ClosedAuctionLotPage = ({params}) => {

    const { id } = params;

  return (
    <>
      <Header />
      <Breadcrumb1 pagetitle={"Closed Auction Lots"} currentPage={"Closed Auction Lots"} />
      <ClosedAuctionLots auctionId={id} />
      <Footer />
    </>
  );
};

export default ClosedAuctionLotPage;
