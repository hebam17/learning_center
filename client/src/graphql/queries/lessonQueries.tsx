import { gql } from "../../__generated__";

export const GET_LESSONS = gql(`
  query GetLessons {
    lessons{
      id
      material
      title
      description
    }
  }
`);

export const GET_LESSON = gql(`
    query GetLesson {
      lesson{
        id
        material
        title
        description
      }
    }
  `);
