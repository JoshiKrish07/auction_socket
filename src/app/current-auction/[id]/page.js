import CurrentAuction from "@/components/current-auction/CurrentAuction";
import Breadcrumb1 from "@/components/common/Breadcrumb1";
import Footer from "@/components/footer/Footer";
import InnerPageHeader1 from "@/components/header/InnerPageHeader1";
import Header from "@/components/header/Header";
import MultiparposeAuctionGrid from "@/components/auction-grid/MultiparposeAuctionGrid";
import CurrentAuctionLots from "@/components/current-auction/CurrentAuctionLots";

export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};
const CurrentAuctionPage = ({params}) => {
    const { id } = params;
    console.log("======id===on current Auction Page==>", id);
  return (
    <>
      {/* <InnerPageHeader1 /> */}
      <Header />
      <Breadcrumb1 currentPage="Live Auction Lots" pagetitle="Live Auction Lots" />
      {/* <CurrentAuction /> */}
      {/* <MultiparposeAuctionGrid /> */}
      <CurrentAuctionLots auctionId={id} />
      <Footer />
    </>
  );
};

export default CurrentAuctionPage;
