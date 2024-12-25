import { useQuery } from "@apollo/client";
import { GET_LESSONS } from "../graphql/queries/LessonQueries";
import { Link } from "react-router-dom";

enum Languages {
  English = "English",
  Arabic = "Arabic",
  French = "French",
}

export const CategoryCard = () => {
  const {
    loading: lessonsLoading,
    error: lessonsError,
    data: lessonsData,
  } = useQuery(GET_LESSONS);

  console.log(lessonsData);
  const handleError = (e) => {
    e.target.src = "/images/categories/general.svg";
  };

  const cards = lessonsData?.lessons?.map(
    ({ id, material, title, description }) => {
      const iconName = Object.values(Languages).includes(material)
        ? "language.svg"
        : `${material.toLowerCase()}.svg`;

      return (
        <div
          key={id}
          className="flex gap-4 bg-success-100 rounded-sm p-5 items-center justify-around relative"
        >
          <Link
            to={`/Categories/${id}`}
            className="absolute left-0 top-0 w-full h-full"
          />
          {/* Icon */}
          <div className="w-12 h-12 bg-white border-8 border-white rounded-sm">
            <img
              src={`/images/categories/${iconName}`}
              onError={handleError}
              alt={`${material} icon`}
              width="100%"
              height="100%"
            />
          </div>
          {/* info */}
          <div className="">
            <div className="text-base text-gray-900 mb-2 font-semibold">
              {title}
            </div>
            <p className="text-gray-700">{description}</p>
          </div>
        </div>
      );
    }
  );

  return cards;
};
