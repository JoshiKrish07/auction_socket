import Breadcrumb1 from "@/components/common/Breadcrumb1";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import PastAuction from "@/components/past-auction/PastAuction";
import PastAuctionLots from "@/components/past-auction/PastAuctionLots";

export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};
const PastAuctionLotsPage = ({params}) => {

    const { id } = params;
    console.log("======id===on past Auction Lots Page==>", id);

  return (
    <>
      <Header />
      <Breadcrumb1 currentPage="Past Auction Lots" pagetitle="Past Auction Lots" />
      {/* <PastAuction /> */}
      {/* <h2>Coming Soon...</h2> */}
      <PastAuctionLots auctionId={id} />
      <Footer />
    </>
  );
};

export default PastAuctionLotsPage;
