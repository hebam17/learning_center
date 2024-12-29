import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ErrorElement from "./components/ErrorElement";
import Layout from "./pages/Layout";
import { Categories } from "./pages/Categories";
import Category from "./pages/Category";
import Lesson from "./pages/Lesson";
import Lessons from "./pages/Lessons";

function App() {
  const router = createBrowserRouter([
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
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
