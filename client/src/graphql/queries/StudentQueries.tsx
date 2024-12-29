import { gql } from "../../__generated__";

export const GET_STUDENTS = gql(`
  query GetStudents{
    students{
      id
      firstname
      lastname
      email
      password
      whishlistLessons{
        id
        category{
          id
          material
          title
          description
        }
        teacher{
          id
          firstname
          lastname
          email
        }
      }
    }
  }
`);

export const GET_STUDENT = gql(`
  query GetStudent{
    student{
      id
      firstname
      lastname
      email
      password
      whishlistLessons{
        id
        category{
          id
          material
          title
          description
        }
        teacher{
          id
          firstname
          lastname
          email
        }
      }
    }
  }
`);
