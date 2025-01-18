import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const CustomLayout = () => {
  const location = useLocation();
  const links = [
    {
      to: "/new-teacher",
      text: "Become a Teacher",
      classes: "md:inline-block hidden secondary-btn",
    },
    { to: "/signup", text: " Create Account", classes: "" },
    { to: "/login", text: "Login", classes: "" },
  ];

  const displayLinks = links.filter((link) => link.to !== location.pathname);

  const mobileLinkClass = (isActive: boolean, classes: string): string =>
    isActive
      ? `mobile-link active-mobile-link bg-primary-100 ${classes}`
      : `mobile-link ${classes}`;

  return (
    <div className="md:h-screen bg-white md:overflow-y-hidden">
      <nav className="py-2 px-4 fixed top-0 left-0 w-full bg-white z-10 flex justify-between items-center text-gray-800 font-semibold text-base">
        {/* LARGE SCREEN NAVIGATION  */}
        {/* LEFT SIDE LINKS */}
        <div className="block">
          <Link
            to="/"
            className="whitespace-nowrap flex justify-center items-end gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ff6636"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            </svg>
            <span className="font-bold lg:text-2xl text-xl text-gray-900">
              Learning Center
            </span>
          </Link>
        </div>
        {/* RIGHT SIDE LINKS */}
        <div>
          {displayLinks.map((link) => (
            <NavLink
              to={link.to}
              key={link.text}
              className={({ isActive }) =>
                mobileLinkClass(isActive, link.classes)
              }
            >
              {link.text}
            </NavLink>
          ))}
        </div>
        {/* ////////////// */}
      </nav>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomLayout;
