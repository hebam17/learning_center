import { gql } from "../../__generated__";

export const GET_TEACHERS = gql(`
  query GetTeachers {
    teachers{
      id
      firstname
      lastname
      email
      role
      about_me
      salary
      isActive
      rating
      ratingsCount
    }
  }
`);

export const GET_TEACHER = gql(`
  query GetTeacher {
    teacher{
     id
     firstname
     lastname
     email
     role
     about_me
     salary
     isActive
     rating
     ratingsCount
    }
  }
`);
