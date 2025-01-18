import { useQuery } from "@apollo/client";
import { ALL_TEACHERS_LESSONS } from "../graphql/queries/TeacherLessonQueries";
import { ReactElement } from "react";
import { LessonCard } from "./LessonCard";
import { TeacherLesson } from "../__generated__/graphql";

export const LessonCards = () => {
  const { loading, error, data } = useQuery(ALL_TEACHERS_LESSONS);

  let cards: ReactElement | ReactElement[] = <p>Loading</p>;

  if (error) {
    cards = <p>Sorry, an error occure please try again later!</p>;
  }
  const lessons = data?.allTeachersLessons as TeacherLesson[];
  if (lessons?.length) {
    cards = lessons?.map((lesson: TeacherLesson) => (
      <LessonCard key={lesson?.id} lesson={lesson} />
    ));
  }

  const content = (
    <section className="lg:px-[10vw] global-padding border border-t-gray-100 rounded-sm">
      <h2 className="text-left lg:text-3xl md:text-2xl text-xl mb-8 text-gray-900 font-bold">
        Our Featured Lessons
      </h2>
      <div className="grid xl:grid-cols-2 grid-cols-1 auto-rows-fr gap-6 mb-6">
        {cards}
      </div>
    </section>
  );

  return content;
};
