import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ErrorElement from "./components/ErrorElement";
import Layout from "./pages/Layout";
import { Lessons } from "./pages/Lessons";

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
          path: "/lessons",
          element: <Lessons />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
