import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavHeader from "../components/NavHeader";
import SearchHeader from "../components/SearchHeader";

export default function Layout() {
  return (
    <div className="min-h-screen border border-black flex flex-col">
      <NavHeader />
      <SearchHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
