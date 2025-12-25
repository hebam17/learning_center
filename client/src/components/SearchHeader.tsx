import { useMutation, useQuery } from "@apollo/client";
import Logo from "./Logo";
import { GET_CATEGORIES } from "../graphql/queries/CategoryQueries";
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import {
  Link,
  matchPath,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { GET_TEACHERS } from "../graphql/queries/TeachersQueries";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { UserType } from "../__generated__/graphql";
import { LOGOUT } from "../graphql/mutation/authMutations";

export default function SearchHeader() {
  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery(GET_CATEGORIES);
  const {
    loading: teachersLoading,
    error: teachersError,
    data: teachersData,
  } = useQuery(GET_TEACHERS);
  const navigate = useNavigate();
  const location = useLocation();

  const [categoryId, setcategoryId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dropDownRef = useRef<HTMLDivElement>(null);

  // FOR TESTING
  const isLoggedIn: boolean = false;
  const username: string = "Jane Doe";
  const userId: string = "jkdslauf0eisurike3jwrl";

  // To navigate the user to the category's page when selected
  useEffect(() => {
    // Test the new path against the current path and only redirect when it's not the same
    const newPath =
      categoryId === ""
        ? location.pathname
        : categoryId === "all"
        ? "categories"
        : `/categories/${categoryId}`;
    const match = matchPath({ path: newPath }, location.pathname);
    if (match === null) return navigate(newPath);
  }, [categoryId, location.pathname, navigate]);

  const [logout] = useMutation(LOGOUT, {
    variables: {
      userId: "6707bb7c0d28904d4b66678b",
      type: UserType.Student,
    },
    onCompleted: ({ logout }) => {
      setErrorMessage("");
      console.log("logout data:", logout);

      navigate("/login", {
        replace: true,
      });
    },
  });

  // Create the category options for the dropdown filter
  const categories: ReactElement[] =
    categoriesData?.categories?.map((category) => (
      <option key={category?.id} value={category?.id?.toString()}>
        {category?.material}
      </option>
    )) || [];

  // To handle the category option change
  const handlecategoryIdChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setcategoryId(e.target.value);

  // Create a teachers items array for the datalist
  const teachersItems =
    teachersData?.teachers?.map((teacher) => {
      return {
        id: teacher?.id?.toString(),
        value: teacher?.firstname + " " + teacher?.lastname,
      };
    }) || [];

  // Handle select fuction for the datalist => Redirect the user to the teacher's page when select
  const handleSelect = (item: { id: string; value: string }) => {
    const { id, value } = item;

    const filteredTeacher = teachersData?.teachers?.find((teacher) => {
      console.log("teacher:", teacher);
      return (
        teacher?.firstname?.toLowerCase() ===
          value.split(" ")[0]?.toLowerCase() &&
        teacher?.lastname?.toLowerCase() === value.split(" ")[1]?.toLowerCase()
      );
    });
    if (filteredTeacher) {
      const newPath = `/teachers/${id}`;
      const match = matchPath({ path: location.pathname }, newPath);
      if (match === null) return navigate(newPath);
    }
    setError("No such teacher exists");
  };

  // Handle opening and closing the profile list
  const handleToggle = () => {
    if (dropDownRef?.current?.classList.contains("hidden")) {
      dropDownRef?.current?.classList.add("flex");
      dropDownRef?.current?.classList.remove("hidden");
    } else {
      dropDownRef?.current?.classList.add("hidden");
      dropDownRef?.current?.classList.remove("flex");
    }
  };

  const logoutHandler = () => {
    logout();
  };
  return (
    <>
      {/* LARGE SCREEN NAVIGATION */}
      <div className="flex items-center justify-between gap-3 p-4">
        {/* LEFT SIDE */}
        <div className="flex flex-1 gap-8 items-center">
          <div className="lg:block hidden">
            <Logo />
          </div>
          <div className="flex items-center gap-6">
            {/* CHOOSE CATEGORIES */}
            <div className="relative custom-select">
              <select
                name="category"
                id="categoriesBrowse"
                value={categoryId}
                className="appearance-none cursor-pointer"
                onChange={handlecategoryIdChange}
              >
                <option key="browse" value="">
                  Browse a Topic
                </option>
                <option key="all" value="all">
                  All Topics
                </option>
                {categories}
              </select>
            </div>

            <div className="relative lg:block hidden">
              <DatalistInput
                placeholder="Teacher name"
                label="Search a teacher"
                onSelect={handleSelect}
                items={teachersItems}
                className=""
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#4b5563"
                className="size-6"
                id="search"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        {!isLoggedIn && (
          <div className="lg:flex gap-2 hidden">
            <NavLink to="/signup" className="primary-btn">
              Create Account
            </NavLink>
            <NavLink to="/login" className="secondary-btn">
              Login
            </NavLink>
            {/* LOG */}
          </div>
        )}

        {isLoggedIn && (
          <div className="flex relative" onClick={handleToggle}>
            <div className="flex text-base items-center gap-1 cursor-pointer text-secondary-900 hover:text-primary-500 whitespace-nowrap">
              {username}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            {/* DROPDOWN */}
            <div
              className="absolute top-6 rounded-md right-2 transition-all duration-500 flex-col shadow-lg profle-drop hidden z-10"
              ref={dropDownRef}
            >
              <Link
                to={`/profile/${userId}`}
                className="py-2 px-4 text-base bg-white text-primary-500 hover:bg-primary-500 hover:text-white"
              >
                Profile
              </Link>
              <button
                onClick={logoutHandler}
                className="py-2 px-4 text-base bg-white text-primary-500 hover:bg-primary-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      {/* ///////////// */}
    </>
  );
}
