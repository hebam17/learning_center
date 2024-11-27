import { Link } from "react-router-dom";
import teacherInClassroom from "/images/pexels-max-fischer-5212703.jpg";

function HomePage() {
  return (
    <>
      <section className="flex md:flex-row flex-col-reverse md:gap-0 gap-5 lg:mb-12 md:mb-10 sm:mb-8 mb-6 min-h-[80vh] max-h-screen">
        <div className="flex justify-center content-center items-start flex-col lg:mx-[10vw] md:mx-[5vw] mx-5 md:gap-8 gap-5">
          <h1 className="lg:text-5xl md:text-4xl  text-3xl text-gray-900 font-bold">
            Learn with experts and Join best universities in the world
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
        <div className="md:h-auto sm:h-[70vh] h-[50vh]">
          <div id="main-img">
            <img
              src={teacherInClassroom}
              alt="A teacher in the classroom"
              id="skewed-img"
            />
          </div>
        </div>
      </section>

      {/* ////////////////// */}
      {/* Browse By Category section */}
      {/* Most popular lessons */}
      {/* top teachers */}
    </>
  );
}

export default HomePage;
