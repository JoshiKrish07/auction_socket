import MultiparposeAuctionGrid from "@/components/auction-grid/MultiparposeAuctionGrid";
import Breadcrumb1 from "@/components/common/Breadcrumb1";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    // icon: "/assets/img/fav-icon.svg",
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};

const AuctionGridPage = () => {

  return (
    <>
      {/* <InnerPageHeader1 /> */}
      <Header />
      <Breadcrumb1 currentPage="Auction Grid" pagetitle="Auction Grid" />
      <MultiparposeAuctionGrid />
      <Footer />
    </>
  );
};

export default AuctionGridPage;
