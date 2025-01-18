import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ErrorElement from "./components/ErrorElement";
import Layout from "./pages/Layout";
import { Categories } from "./pages/Categories";
import Category from "./pages/Category";
import Lesson from "./pages/Lesson";
import Lessons from "./pages/Lessons";
import Signup from "./pages/Signup";
import CustomLayout from "./pages/CustomLayout";
import Login from "./pages/Login";
import BecomeATeacher from "./pages/BecomeATeacher";
import CreateNewTeacher from "./pages/CreateNewTeacher";

function App() {
  const router = createBrowserRouter([
    {
      element: <CustomLayout />,
      errorElement: <ErrorElement />,
      children: [
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      element: <Layout />,
      errorElement: <ErrorElement />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/categories",
          children: [
            {
              index: true,
              element: <Categories />,
            },
            {
              path: ":categoryId",
              element: <Category />,
            },
          ],
        },
        {
          path: "/lessons",
          children: [
            {
              index: true,
              element: <Lessons />,
            },
            {
              path: ":lessonId",
              element: <Lesson />,
            },
          ],
        },
        {
          path: "/new-teacher",
          element: <BecomeATeacher />,
        },
        {
          path: "/new-teacher/create-account",
          element: <CreateNewTeacher />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
