import CurrentAuction from "@/components/current-auction/CurrentAuction";
import Breadcrumb1 from "@/components/common/Breadcrumb1";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import MultiparposeAuctionGrid from "@/components/auction-grid/MultiparposeAuctionGrid";
import CurrentAuctionLots from "@/components/current-auction/CurrentAuctionLots";
import UpcomingAuctionLots from "@/components/upcoming-auction/UpcomingAuctionLots";

export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};
const UpcomingAuctionPage = ({params}) => {
    const { id } = params;
    console.log("======id===on current Auction Page==>", id);
  return (
    <>
      <Header />
      <Breadcrumb1 currentPage="Upcoming Auction Lots" pagetitle="Upcoming Auction Lots" />
      {/* <CurrentAuctionLots auctionId={id} /> */}
      <UpcomingAuctionLots auctionId={id} />
      <Footer />
    </>
  );
};

export default UpcomingAuctionPage;
