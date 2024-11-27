import { gql } from "../../__generated__";

export const TEACHER_LESSON = gql(`
  query TeacherLesson{
    teacherLesson{
      id
      lesson{
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
     role
     about_me
     salary
     isActive
     rating
     ratingsCount
      }
      students_num
      students{
        id
        firstname
        lastname
        email
      }
      price
      discount
      rating
      ratingsCount
      start_date
      week_days
      duration
      type
      start_time
      end_time
      is_full
    }
  }
`);
