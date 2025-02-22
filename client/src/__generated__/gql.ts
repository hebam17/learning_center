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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Register($input: RegisterInput) {\n    register(input: $input) {\n      message\n      userId\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation RegisterVerification($input: RegisterVerificationInput) {\n    registerVerification(input: $input) {\n      accessToken\n    }\n  }\n": typeof types.RegisterVerificationDocument,
    "\n  query GetCategories {\n    categories{\n      id\n      material\n      title\n      description\n    }\n  }\n": typeof types.GetCategoriesDocument,
    "\n    query GetCategory($id:ID!) {\n      category(id:$id){\n        id\n        material\n        title\n        description\n      }\n    }\n  ": typeof types.GetCategoryDocument,
    "\n  query GetStudents{\n    students{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        category{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n": typeof types.GetStudentsDocument,
    "\n  query GetStudent{\n    student{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        category{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n": typeof types.GetStudentDocument,
    "\n  query AllTeachersLessons{\n    allTeachersLessons{\n      id\n      category{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n": typeof types.AllTeachersLessonsDocument,
    "\n  query TeacherLessons{\n    teacherLessons{\n      id\n      category{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n": typeof types.TeacherLessonsDocument,
    "\n  query GetTeachers {\n    teachers{\n      id\n      firstname\n      lastname\n      email\n      role\n      lessons_num\n      about_me\n      salary\n      isActive\n      rating\n      ratingsCount\n    }\n  }\n": typeof types.GetTeachersDocument,
    "\n  query GetTeacher {\n    teacher{\n     id\n     firstname\n     lastname\n     email\n     role\n     lessons_num\n     about_me\n     salary\n     isActive\n     rating\n     ratingsCount\n    }\n  }\n": typeof types.GetTeacherDocument,
};
const documents: Documents = {
    "\n  mutation Register($input: RegisterInput) {\n    register(input: $input) {\n      message\n      userId\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation RegisterVerification($input: RegisterVerificationInput) {\n    registerVerification(input: $input) {\n      accessToken\n    }\n  }\n": types.RegisterVerificationDocument,
    "\n  query GetCategories {\n    categories{\n      id\n      material\n      title\n      description\n    }\n  }\n": types.GetCategoriesDocument,
    "\n    query GetCategory($id:ID!) {\n      category(id:$id){\n        id\n        material\n        title\n        description\n      }\n    }\n  ": types.GetCategoryDocument,
    "\n  query GetStudents{\n    students{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        category{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n": types.GetStudentsDocument,
    "\n  query GetStudent{\n    student{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        category{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n": types.GetStudentDocument,
    "\n  query AllTeachersLessons{\n    allTeachersLessons{\n      id\n      category{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n": types.AllTeachersLessonsDocument,
    "\n  query TeacherLessons{\n    teacherLessons{\n      id\n      category{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n": types.TeacherLessonsDocument,
    "\n  query GetTeachers {\n    teachers{\n      id\n      firstname\n      lastname\n      email\n      role\n      lessons_num\n      about_me\n      salary\n      isActive\n      rating\n      ratingsCount\n    }\n  }\n": types.GetTeachersDocument,
    "\n  query GetTeacher {\n    teacher{\n     id\n     firstname\n     lastname\n     email\n     role\n     lessons_num\n     about_me\n     salary\n     isActive\n     rating\n     ratingsCount\n    }\n  }\n": types.GetTeacherDocument,
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
export function gql(source: "\n  mutation Register($input: RegisterInput) {\n    register(input: $input) {\n      message\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: RegisterInput) {\n    register(input: $input) {\n      message\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RegisterVerification($input: RegisterVerificationInput) {\n    registerVerification(input: $input) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterVerification($input: RegisterVerificationInput) {\n    registerVerification(input: $input) {\n      accessToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategories {\n    categories{\n      id\n      material\n      title\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categories{\n      id\n      material\n      title\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetCategory($id:ID!) {\n      category(id:$id){\n        id\n        material\n        title\n        description\n      }\n    }\n  "): (typeof documents)["\n    query GetCategory($id:ID!) {\n      category(id:$id){\n        id\n        material\n        title\n        description\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetStudents{\n    students{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        category{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetStudents{\n    students{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        category{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetStudent{\n    student{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        category{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetStudent{\n    student{\n      id\n      firstname\n      lastname\n      email\n      password\n      whishlistLessons{\n        id\n        category{\n          id\n          material\n          title\n          description\n        }\n        teacher{\n          id\n          firstname\n          lastname\n          email\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllTeachersLessons{\n    allTeachersLessons{\n      id\n      category{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n"): (typeof documents)["\n  query AllTeachersLessons{\n    allTeachersLessons{\n      id\n      category{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TeacherLessons{\n    teacherLessons{\n      id\n      category{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n"): (typeof documents)["\n  query TeacherLessons{\n    teacherLessons{\n      id\n      category{\n        id\n        material\n        title\n        description\n      }\n      teacher{\n        id\n        firstname\n        lastname\n        email\n        role\n        about_me\n        salary\n        isActive\n        rating\n        ratingsCount\n      }\n      students_num\n      enrolled_students_num\n      students{\n        id\n        firstname\n        lastname\n        email\n      }\n      price\n      discount\n      rating\n      ratingsCount\n      usersRate{\n        id\n      }\n      start_date\n      week_days\n      duration\n      type\n      start_time\n      end_time\n      is_full\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTeachers {\n    teachers{\n      id\n      firstname\n      lastname\n      email\n      role\n      lessons_num\n      about_me\n      salary\n      isActive\n      rating\n      ratingsCount\n    }\n  }\n"): (typeof documents)["\n  query GetTeachers {\n    teachers{\n      id\n      firstname\n      lastname\n      email\n      role\n      lessons_num\n      about_me\n      salary\n      isActive\n      rating\n      ratingsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTeacher {\n    teacher{\n     id\n     firstname\n     lastname\n     email\n     role\n     lessons_num\n     about_me\n     salary\n     isActive\n     rating\n     ratingsCount\n    }\n  }\n"): (typeof documents)["\n  query GetTeacher {\n    teacher{\n     id\n     firstname\n     lastname\n     email\n     role\n     lessons_num\n     about_me\n     salary\n     isActive\n     rating\n     ratingsCount\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;