import { gql } from "../../__generated__";

export const GET_TEACHERS = gql(`
  query getTeachers {
    teachers{
      id
     firstname
     lastname
     email
     role
     about_me
     salary
     isActive
    }
  }
`);
