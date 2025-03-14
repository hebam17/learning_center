import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";
import { LOGOUT } from "../graphql/mutation/authMutations";
import { useMutation } from "@apollo/client";
import { Message, UserType } from "../__generated__/graphql";

export default function NavHeader() {
  const screenLinkClass = (isActive: boolean): string =>
    isActive ? "screen-link active-screen-link" : "screen-link";

  const isLoggedIn: boolean = true;

  const mobileLinkClass = (isActive: boolean): string =>
    isActive ? "mobile-link active-mobile-link" : "mobile-link";

  const navigate = useNavigate();

  const [navOpen, setNavOpen] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [logout, { loading, error, data }] = useMutation(LOGOUT, {
    variables: {
      userId: "6707bb7c0d28904d4b66678b",
      type: UserType.Student,
    },
    onCompleted: ({ logout }) => {
      setErrorMessage("");
      setNavOpen(false);
      console.log("logout data:", logout);

      navigate("/", {
        replace: true,
        state: {
          data: logout?.data,
          type: UserType.Student,
        },
      });
    },
  });

  const logoutHandler = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-10">
      {/* LARGE SCREEN NAVIGATION  */}
      <div className="large-nav py-0 px-4 lg:flex space-between bg-secondary-900 text-gray-400 font-semibold text-base hidden">
        {/* LEFT SIDE LINKS */}
        <div className="large-nav-left flex-grow">
          <NavLink
            to="/"
            className={({ isActive }) => screenLinkClass(isActive)}
          >
            Home
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) => screenLinkClass(isActive)}
          >
            Categories
          </NavLink>

          <NavLink
            to="/teachers"
            className={({ isActive }) => screenLinkClass(isActive)}
          >
            Teachers
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => screenLinkClass(isActive)}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => screenLinkClass(isActive)}
          >
            Contact
          </NavLink>
        </div>

        {/* RIGHT SIDE LINKS */}
        <div className="large-nav-right">
          <NavLink
            to="/new-teacher"
            className={({ isActive }) => screenLinkClass(isActive)}
          >
            Become a Teacher
          </NavLink>
        </div>
      </div>
      {/* ////////////// */}

      {/* SMALLER SCREEN NAVIGATION */}
      <div className="bg-secondary-900">
        {/* toggle bar */}
        <div className="lg:hidden flex items-center justify-between gap-2 p-4 text-white">
          <Logo color="white" />
          <div className="cursor-pointer">
            {!navOpen && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#9ca3af"
                className="size-6"
                onClick={() => setNavOpen(true)}
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        {/* THE NAV */}
        {/* THE OVERLAY */}
        {navOpen && (
          <div
            className="fixed lg:hidden top-0 left-0 bg-black w-screen h-screen opacity-30 z-10"
            onClick={() => setNavOpen(false)}
          ></div>
        )}
        <div
          className={`
           fixed transition-all lg:hidden duration-700 bg-secondary-900 w-3/5 top-0 right-0 h-screen overflow-y-scroll z-10 ${
             !navOpen ? "translate-x-full" : "translate-x-0"
           }`}
        >
          {/* CLOSE BUTTON */}
          <div className="p-4 border-b-1 border-gray-500 cursor-pointer flex justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#9ca3af"
              className="size-8"
              onClick={() => setNavOpen(false)}
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* /////// CLOSE BUTTON END /////// */}

          {/* LINKS */}
          <div className="text-white flex flex-col p-4">
            <div className="border-b-1 border-gray-500">
              <NavLink
                to="/"
                className={({ isActive }) => mobileLinkClass(isActive)}
              >
                Home
              </NavLink>
            </div>
            <div className="border-b-1 border-gray-500">
              <NavLink
                to="/categories"
                className={({ isActive }) => mobileLinkClass(isActive)}
              >
                Categories
              </NavLink>
            </div>

            <div className="border-b-1 border-gray-500">
              <NavLink
                to="/teachers"
                className={({ isActive }) => mobileLinkClass(isActive)}
              >
                Teachers
              </NavLink>
            </div>

            <div className="border-b-1 border-gray-500">
              <NavLink
                to="/about"
                className={({ isActive }) => mobileLinkClass(isActive)}
              >
                About
              </NavLink>
            </div>

            <div className="border-b-1 border-gray-500">
              <NavLink
                to="/contact"
                className={({ isActive }) => mobileLinkClass(isActive)}
              >
                Contact
              </NavLink>
            </div>

            {!isLoggedIn ? (
              <>
                <div className="border-b-1 border-gray-500">
                  <NavLink
                    to="/new-teacher"
                    className={({ isActive }) => mobileLinkClass(isActive)}
                  >
                    Become a Teacher
                  </NavLink>
                </div>
                <div className="border-b-1 border-gray-500">
                  <NavLink
                    to="/signup"
                    className={({ isActive }) => mobileLinkClass(isActive)}
                  >
                    Create Account
                  </NavLink>
                </div>
                <div className="border-b-1 border-gray-500">
                  <NavLink
                    to="/login"
                    className={({ isActive }) => mobileLinkClass(isActive)}
                  >
                    Login
                  </NavLink>
                </div>
              </>
            ) : (
              <div className="border-b-1 border-gray-500">
                <button
                  onClick={logoutHandler}
                  className={mobileLinkClass(false)}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
