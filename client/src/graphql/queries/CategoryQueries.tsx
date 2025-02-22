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
    query GetCategory($id:ID!) {
      category(id:$id){
        id
        material
        title
        description
      }
    }
  `);
