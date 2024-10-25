import AdminDashboard from "@/components/admin/admindashboard/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminUsersList from "@/components/admin/userslist/AdminUsersList";
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

      <Header adminLogin={true}/>
      <Breadcrumb1 pagetitle="Admin Users List" currentPage="Admin Users List" />
      <AdminUsersList />
      <Footer />
    </div>
  );
};

export default AdminPage;
