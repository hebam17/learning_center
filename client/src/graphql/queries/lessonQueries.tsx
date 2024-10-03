import { gql } from "../../__generated__";

export const GET_LESSONS = gql(`
  query getLessons {
    lessons{
      id
      material
      title
      description
    }
  }
`);
