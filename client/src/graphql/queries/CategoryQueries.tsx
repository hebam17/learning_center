import { gql } from "../../__generated__";

export const GET_CATEGORIES = gql(`
  query GetCategories {
    categories{
      id
      material
      title
      description
    }
  }
`);

export const GET_CATEGORY = gql(`
    query GetCategory {
      category{
        id
        material
        title
        description
      }
    }
  `);
