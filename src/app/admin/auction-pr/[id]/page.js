import AddAuction from "@/components/admin/add-auction/AddAuction";
import AuctionPrData from "@/components/admin/auction-pr/AuctionPrData";
import Breadcrumb1 from "@/components/common/Breadcrumb1";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};
const AdminAuctionPrPage = ({params}) => {
const { id } = params;
  return (
    <div>
      <Header adminLogin={true}/>
      <Breadcrumb1 pagetitle="Auction Pr" currentPage="Auction Pr" />
      {/* <AddAuction auctionId={id} /> */}
      <AuctionPrData auctionId={id} />
      <Footer />
    </div>
  );
};

export default AdminAuctionPrPage;
