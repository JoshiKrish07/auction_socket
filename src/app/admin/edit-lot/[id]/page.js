import AddLot from "@/components/admin/add-lots/AddLot";
import Breadcrumb1 from "@/components/common/Breadcrumb1";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};
const EditLotPage = ({params}) => {
    const { id } = params;
  return (
    <div>

      <Header adminLogin={true}/>
      <Breadcrumb1 pagetitle="Admin Edit Lot" currentPage="Admin Edit Lot" />
      <AddLot lotId={id}/>
      <Footer />
    </div>
  );
};

export default EditLotPage;
