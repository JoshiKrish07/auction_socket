import AdminMaterialList from "@/components/admin/materiallist/AdminMaterialList";
import Breadcrumb1 from "@/components/common/Breadcrumb1";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};
const AdminPage = () => {

  return (
    <div>
      <Header adminLogin={true}/>
      <Breadcrumb1 pagetitle="Admin Material List" currentPage="Admin Material List" />
      <AdminMaterialList />
      <Footer />
    </div>
  );
};

export default AdminPage;
