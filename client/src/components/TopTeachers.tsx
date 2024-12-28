import { useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { Teacher } from "../__generated__/graphql";
import { GET_TEACHERS } from "../graphql/queries/TeachersQueries";
import starSize from "../utils/starSize";
import { Link } from "react-router-dom";

const TopTeachers = () => {
  const { loading, error, data } = useQuery(GET_TEACHERS);

  let cards: ReactElement | ReactElement[] = <p>Loading</p>;

  if (error) {
    cards = <p>Sorry, an error occure please try again later!</p>;
  }
  const teachers = data?.teachers as Teacher[];
  console.log("teachers:", teachers);

  if (teachers?.length) {
    cards = teachers?.map((teacher: Teacher, index: number) => (
      <div className="flex flex-col justify-around relative border border-gray-100 rounded-sm max-h-[80vh]">
        <Link
          to={`/lessons/${teacher.id}`}
          className="absolute left-0 top-0 w-full h-full"
        />
        {/* The image */}
        <div className="h-[70%] bg-gray-500">
          <img
            src={`/images/teachers/teacher${index + 1}.jpg`}
            alt={`${teacher.firstname} ${teacher.lastname}`}
            className="object-cover object-center h-full w-full"
          />
        </div>
        {/* //////////////// */}
        {/* Content */}
        <div className="py-3 px-4">
          <div className="mb-4 text-center">
            <div className="lesson-text text-gray-900">
              {teacher.firstname + " " + teacher.lastname}
            </div>
            <div className="lesson-text text-gray-400">{teacher.role}</div>
          </div>
          {/* <div> */}
          <div className="flex justify-between items-center pt-4 border-t-1 border-gray-100">
            {/* /////////////star rating */}

            <div className="flex gap-2">
              <div className="relative w-fit">
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
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <div
                  className={`absolute top-0 left-0 p-0 w-[${starSize(
                    teacher.rating || 0
                  )}%] overflow-hidden`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FD8E1F"
                    viewBox="0 0 24 24"
                    strokeWidth={0.1}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-base text-gray-900">
                {teacher.rating?.toFixed(1)}
              </span>
              <span className="text-base text-gray-400">
                ({teacher.ratingsCount})
              </span>
            </div>
            {/* /////////////////////////// */}
            {/* //////////// */}
            <div className="flex gap-2 items-center">
              <span>
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
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </span>

              <span className="lesson-text text-gray-900">
                {teacher.lessons_num}{" "}
                <span className="text-gray-400">Lessons</span>
              </span>
            </div>
            {/* ////////////// */}
          </div>
          {/* </div> */}
        </div>
        {/* end content */}
      </div>
    ));
  }

  const content = (
    <section className="lg:px-[10vw] md:px-[3vw] px-2 py-12 bg-gray-50">
      <div className="border border-gray-100 rounded-sm bg-white md:p-[2vw] p-3">
        <h2 className="text-center lg:text-3xl md:text-2xl text-xl mb-8 text-gray-900 font-bold">
          Our Top Tachers
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-fr justify-between gap-6 mb-6">
          {cards}
        </div>
      </div>
    </section>
  );

  return content;
};

export default TopTeachers;
