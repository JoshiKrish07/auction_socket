import AdminLogin from "@/components/admin/AdminLogin";
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
const AdminPage = () => {

  return (
    <div>

      {/* <Header /> */}
      <Breadcrumb1 pagetitle="Admin" currentPage="Admin" />
      <AdminLogin />
      <Footer />
    </div>
  );
};

export default AdminPage;
