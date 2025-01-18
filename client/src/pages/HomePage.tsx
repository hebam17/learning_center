import { Link } from "react-router-dom";
import teacherInClassroom from "/images/pexels-max-fischer-5212703.jpg";
import { CategoryCard } from "../components/CategoryCards";
import { LessonCards } from "../components/LessonCards";
import TopTeachers from "../components/TopTeachers";
import TrustedUniversities from "../components/TrustedUniversities";

function HomePage() {
  return (
    <>
      <section className="flex md:flex-row flex-col-reverse md:gap-0 gap-5 lg:mb-12 md:mb-10 sm:mb-8 mb-6 min-h-[70vh] max-h-screen">
        <div className="flex justify-center content-center items-start flex-col margin-all md:gap-8 gap-5">
          <h1 className="lg:text-5xl md:text-4xl text-3xl text-gray-900 font-bold">
            Learn with experts and Join{" "}
            <span className="text-primary-500">Top</span> universities in the
            world
          </h1>
          <p className="text-gray-700 text-base">
            Our mission is to help students to reach their potential by learning
            interactively with our expert teachers
          </p>
          <Link to="/signup" className="secondary-btn">
            Create Account
          </Link>
        </div>
        {/* Image side */}
        <div className="md:h-auto h-[50vh]">
          <div id="main-img">
            <img
              src={teacherInClassroom}
              alt="A teacher in the classroom"
              id="skewed-img"
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </section>
      {/* ////////////////// */}
      {/* Browse By Category section */}
      <section className="lg:px-[10vw] global-padding bg-gray-50">
        <h2 className="text-center lg:text-3xl md:text-2xl text-xl mb-8 text-gray-900 font-bold">
          Browse By Category
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 row-auto gap-5 mb-6">
          <CategoryCard />
        </div>

        <Link
          to="/categories"
          className="text-base flex gap-2 items-center text-primary-500 justify-center"
        >
          Browse All Categories
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </section>
      {/* Most popular lessons */}
      <LessonCards />
      {/* top teachers */}
      <TopTeachers />
      {/* Top universities */}
      <TrustedUniversities />
    </>
  );
}

export default HomePage;
