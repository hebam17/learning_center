import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavHeader from "../components/NavHeader";
import SearchHeader from "../components/SearchHeader";

export default function Layout() {
  return (
    <>
      <NavHeader />
      <SearchHeader />
      <Outlet />
      <Footer />
    </>
  );
}
