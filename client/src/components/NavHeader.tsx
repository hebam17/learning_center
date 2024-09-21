import { NavLink } from "react-router-dom";

export default function NavHeader() {
  const linkClass = (isActive: boolean): string =>
    isActive ? "screen-link active-screen-link" : "screen-link";

  return (
    <nav>
      {/* LARGE SCREEN NAVIGATION */}
      <div className="large-nav py-0 px-4 flex space-between bg-gray-900 text-gray-500 font-semibold text-lg">
        {/* LEFT SIDE LINKS */}
        <div className="large-nav-left flex-grow">
          <NavLink to="/" className={({ isActive }) => linkClass(isActive)}>
            Home
          </NavLink>
          <NavLink
            to="/lessons"
            className={({ isActive }) => linkClass(isActive)}
          >
            Lessons
          </NavLink>

          <NavLink
            to="/teachers"
            className={({ isActive }) => linkClass(isActive)}
          >
            Teachers
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => linkClass(isActive)}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => linkClass(isActive)}
          >
            Contact
          </NavLink>

          <NavLink
            to="/new-teacher"
            className={({ isActive }) => linkClass(isActive)}
          >
            Become an Instructor
          </NavLink>
        </div>

        {/* RIGHT SIDE LINKS */}
        <div className="large-nav-right">
          <NavLink
            to="/register"
            className={({ isActive }) => linkClass(isActive)}
          >
            Create Account
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => linkClass(isActive)}
          >
            Login
          </NavLink>
        </div>
      </div>
      {/* ////////////// */}
    </nav>
  );
}
