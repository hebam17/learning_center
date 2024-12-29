import { TeacherLesson } from "../__generated__/graphql";
import { Link } from "react-router-dom";
import starSize from "../utils/starSize";

type PropsType = {
  lesson: TeacherLesson;
};

export const LessonCard = ({ lesson }: PropsType) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const randomNum = Math.floor(Math.random() * 10);
    e.target.src = `/images/study-${randomNum}.jpg`;
  };

  const colors = [
    "bg-success-100 text-success-700",
    "bg-success-700 text-success-100",
    "bg-gray-800 text-gray-50",
    "bg-gray-300 text-gray-800",
    "bg-gray-50 text-primary-700",
    "bg-secondary-900 text-secondary-100",
    "bg-primary-500 text-primary-100",
    "bg-primary-100 text-primary-700",
    "bg-gray-50 text-warning-500",
  ];

  const color = () => {
    const randomNum = Math.floor(Math.random() * 9);
    return colors[randomNum];
  };

  return (
    <div className="flex relative border border-gray-100 rounded-sm max-h-[35vh]">
      <Link
        to={`/lessons/${lesson.id}`}
        className="absolute left-0 top-0 w-full h-full"
      />
      <div className="max-w-[35%] rounded-sm">
        <img
          src={`/images/study-${lesson.category?.material?.toLowerCase()}.jpg`}
          alt={`${lesson.category?.description}`}
          onError={handleError}
          className="object-cover object-center h-full w-full"
        />
      </div>
      <div className="flex-grow py-3 px-4 flex flex-col justify-between min-h-fit">
        {/* First Row */}
        <div className="flex justify-between">
          <div className={`${color()} px-2 py-1 rounded-md`}>
            {lesson.category?.material}
          </div>
          <div className="flex gap-2 items-center">
            <span className="lesson-text text-gray-900">
              &#36;{lesson.price}
            </span>
            <span className="text-gray-400 font-light line-through">
              &#36;
              {(lesson.discount &&
                lesson.discount > 0 &&
                lesson?.price - lesson?.discount) ||
                "500"}
            </span>
          </div>
        </div>
        {/* //////////////// */}
        {/* Second Row */}
        <p className="lesson-text text-gray-900 my-4">{lesson.description}</p>
        {/* /////////// */}
        {/* Third Row */}
        <div className="flex justify-between mb-4">
          <div className="lesson-text text-gray-600">
            {lesson.teacher?.firstname + lesson.teacher?.lastname}
          </div>
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
                  lesson.rating || 0
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
              {lesson.rating?.toFixed(1)}
            </span>
            <span className="text-base text-gray-400">
              ({lesson.ratingsCount})
            </span>
          </div>
        </div>
        {/* /////////// */}
        {/* Forth Row */}
        <div className=" md:flex hidden justify-between items-center py-4 border-t-1 border-gray-100">
          <div className="flex gap-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#564FFD"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </span>

            <span className="lesson-text text-gray-900">
              {lesson.enrolled_students_num}{" "}
              <span className="text-gray-400">students</span>
            </span>
          </div>
          {/* //////////// */}
          <div className="lesson-text text-gray-800 2xl:block xl:hidden block">
            {lesson.type}
          </div>
          {/* ////////////// */}
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#15711F"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="lesson-text text-gray-800">
              {lesson.duration} weeks
            </span>
          </div>
        </div>
        {/* ///////////// */}
      </div>
    </div>
  );
};
