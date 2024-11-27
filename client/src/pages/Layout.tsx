import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavHeader from "../components/NavHeader";
import SearchHeader from "../components/SearchHeader";
// import { useMutation} from "@apollo/client";
// import { UPDATE_LESSON } from "../graphql/mutation/lessonMutation";

export default function Layout() {
  // const [updateLesson] = useMutation(UPDATE_LESSON);

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
