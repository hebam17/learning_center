import { useQuery } from "@apollo/client";
import { ALL_TEACHERS_LESSONS } from "../graphql/queries/TeacherLessonQueries";
import { useEffect } from "react";

export const LessonCards = () => {
  const { loading, error, data: lessons } = useQuery(ALL_TEACHERS_LESSONS);

  useEffect(() => {
    console.log("Teachers Lessons:", lessons);
  }, [lessons]);
  return <div>All lessons</div>;
};
