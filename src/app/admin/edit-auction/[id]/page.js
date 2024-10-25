import AddAuction from "@/components/admin/add-auction/AddAuction";
import AdminAuctionList from "@/components/admin/auctionslist/AdminAuctionList";
import Breadcrumb1 from "@/components/common/Breadcrumb1";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};
const AdminAuctionEditPage = ({params}) => {
const { id } = params;
  return (
    <div>
      <Header adminLogin={true}/>
      <Breadcrumb1 pagetitle="Admin Edit Auction" currentPage="Admin Edit Auction" />
      <AddAuction auctionId={id} />
      <Footer />
    </div>
  );
};

export default AdminAuctionEditPage;
