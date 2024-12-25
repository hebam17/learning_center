/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetLessons {\n    lessons{\n      id\n      material\n      title\n      description\n    }\n  }\n": types.GetLessonsDocument,
    "\n    query GetLesson {\n      lesson{\n        id\n        material\n        title\n        description\n      }\n    }\n  ": types.GetLessonDocument,
    "\n  query GetStudents{\n    students{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        lesson{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n": types.GetStudentsDocument,
    "\n  query GetStudent{\n    student{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        lesson{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n": types.GetStudentDocument,
    "\n  query AllTeachersLessons{\n    allTeachersLessons{\n      id\n      lesson{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n": types.AllTeachersLessonsDocument,
    "\n  query TeacherLessons{\n    teacherLessons{\n      id\n      lesson{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n": types.TeacherLessonsDocument,
    "\n  query GetTeachers {\n    teachers{\n      id\n      firstname\n      lastname\n      email\n      role\n      about_me\n      salary\n      isActive\n      rating\n      ratingsCount\n    }\n  }\n": types.GetTeachersDocument,
    "\n  query GetTeacher {\n    teacher{\n     id\n     firstname\n     lastname\n     email\n     role\n     about_me\n     salary\n     isActive\n     rating\n     ratingsCount\n    }\n  }\n": types.GetTeacherDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetLessons {\n    lessons{\n      id\n      material\n      title\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetLessons {\n    lessons{\n      id\n      material\n      title\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetLesson {\n      lesson{\n        id\n        material\n        title\n        description\n      }\n    }\n  "): (typeof documents)["\n    query GetLesson {\n      lesson{\n        id\n        material\n        title\n        description\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetStudents{\n    students{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        lesson{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetStudents{\n    students{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        lesson{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetStudent{\n    student{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        lesson{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetStudent{\n    student{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        lesson{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllTeachersLessons{\n    allTeachersLessons{\n      id\n      lesson{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n"): (typeof documents)["\n  query AllTeachersLessons{\n    allTeachersLessons{\n      id\n      lesson{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TeacherLessons{\n    teacherLessons{\n      id\n      lesson{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n"): (typeof documents)["\n  query TeacherLessons{\n    teacherLessons{\n      id\n      lesson{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTeachers {\n    teachers{\n      id\n      firstname\n      lastname\n      email\n      role\n      about_me\n      salary\n      isActive\n      rating\n      ratingsCount\n    }\n  }\n"): (typeof documents)["\n  query GetTeachers {\n    teachers{\n      id\n      firstname\n      lastname\n      email\n      role\n      about_me\n      salary\n      isActive\n      rating\n      ratingsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTeacher {\n    teacher{\n     id\n     firstname\n     lastname\n     email\n     role\n     about_me\n     salary\n     isActive\n     rating\n     ratingsCount\n    }\n  }\n"): (typeof documents)["\n  query GetTeacher {\n    teacher{\n     id\n     firstname\n     lastname\n     email\n     role\n     about_me\n     salary\n     isActive\n     rating\n     ratingsCount\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;