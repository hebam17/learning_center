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
import RegisterVerification from "./pages/RegisterVerification";
import { useEffect } from "react";
import AuthContextProvider from "./context/AuthContextProvider";
import RecoveryEmailSend from "./pages/PasswordReset/RecoveryEmailSend";
import PasswordRecovery from "./pages/PasswordReset/PasswordRecovery";
import { ResetPassword } from "./pages/PasswordReset/ResetPassword";

function App() {
  useEffect(() => {
    console.log("Hi i'm home");

    return () => {
      console.log("I'm outa home");
    };
  }, []);

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
        {
          path: "/register-verification",
          element: <RegisterVerification />,
        },
        {
          path: "/recovery-email-send",
          element: <RecoveryEmailSend />,
        },
        {
          path: "/recovery",
          element: <PasswordRecovery />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
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

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
