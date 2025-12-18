/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  material?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Message = {
  __typename?: 'Message';
  message?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory?: Maybe<Category>;
  addTeacherLesson?: Maybe<TeacherLesson>;
  deleteCategory?: Maybe<Category>;
  deleteStudent?: Maybe<Student>;
  deleteTeacher?: Maybe<Teacher>;
  deleteTeacherLesson?: Maybe<TeacherLesson>;
  disEnroll?: Maybe<StudentLesson>;
  enroll?: Maybe<StudentLesson>;
  forgetPassword?: Maybe<Message>;
  login?: Maybe<Token>;
  logout?: Maybe<Message>;
  rating?: Maybe<Rate>;
  register?: Maybe<Message>;
  registerVerification?: Maybe<Message>;
  resetPassword?: Maybe<Message>;
  updateCategory?: Maybe<Category>;
  updateStudent?: Maybe<Student>;
  updateTeacher?: Maybe<Teacher>;
  updateTeacherLesson?: Maybe<TeacherLesson>;
  verifyATeacher?: Maybe<Teacher>;
  verifyOTP?: Maybe<Message>;
  whishlistAdd?: Maybe<TeacherLesson>;
  whishlistRemove?: Maybe<TeacherLesson>;
};


export type MutationAddCategoryArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  material?: InputMaybe<Material>;
  title: Scalars['String']['input'];
};


export type MutationAddTeacherLessonArgs = {
  categoryId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  end_time?: InputMaybe<Scalars['String']['input']>;
  enrolled_students_num?: InputMaybe<Scalars['Int']['input']>;
  is_full?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
  students?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  students_num?: InputMaybe<Scalars['Int']['input']>;
  teacherId: Scalars['ID']['input'];
  type?: InputMaybe<TeacherLessonType>;
  week_days?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type MutationDeleteCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteStudentArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteTeacherArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteTeacherLessonArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDisEnrollArgs = {
  teacherLessonId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationEnrollArgs = {
  lesson_status?: InputMaybe<LessonStatus>;
  studentId: Scalars['ID']['input'];
  teacherLessonId: Scalars['ID']['input'];
};


export type MutationForgetPasswordArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserType>;
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserType>;
};


export type MutationLogoutArgs = {
  type?: InputMaybe<UserType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRatingArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  ratedObject?: InputMaybe<RatedObject>;
  score?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationRegisterArgs = {
  input?: InputMaybe<RegisterInput>;
};


export type MutationRegisterVerificationArgs = {
  input?: InputMaybe<RegisterVerificationInput>;
};


export type MutationResetPasswordArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserType>;
};


export type MutationUpdateCategoryArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  material?: InputMaybe<MaterialUpdate>;
  title: Scalars['String']['input'];
};


export type MutationUpdateStudentArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTeacherArgs = {
  about_me?: InputMaybe<Scalars['String']['input']>;
  education?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  email?: InputMaybe<Scalars['String']['input']>;
  experience?: InputMaybe<Scalars['Int']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  lessons_num?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<RoleUpdate>;
  salary?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateTeacherLessonArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  end_time?: InputMaybe<Scalars['String']['input']>;
  enrolled_students_num?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  is_full?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
  students?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  students_num?: InputMaybe<Scalars['Int']['input']>;
  teacherId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<TeacherLessonTypeUpdate>;
  week_days?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type MutationVerifyATeacherArgs = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  managerId?: InputMaybe<Scalars['ID']['input']>;
  teacherId?: InputMaybe<Scalars['ID']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationVerifyOtpArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserType>;
};


export type MutationWhishlistAddArgs = {
  id: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
};


export type MutationWhishlistRemoveArgs = {
  id: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
};

export type Rate = {
  __typename?: 'Rate';
  message?: Maybe<Scalars['String']['output']>;
  ratedObj?: Maybe<Rated>;
};

export type Rated = Teacher | TeacherLesson;

export enum RatedObject {
  Lesson = 'lesson',
  Teacher = 'teacher'
}

export type RegisterInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserType>;
};

export type RegisterVerificationInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  allTeachersLessons?: Maybe<Array<Maybe<TeacherLesson>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  getId?: Maybe<Token>;
  refresh?: Maybe<Message>;
  student?: Maybe<Student>;
  studentLesson?: Maybe<StudentLesson>;
  studentLessons?: Maybe<Array<Maybe<StudentLesson>>>;
  students?: Maybe<Array<Maybe<Student>>>;
  teacher?: Maybe<Teacher>;
  teacherLesson?: Maybe<TeacherLesson>;
  teacherLessons?: Maybe<Array<Maybe<TeacherLesson>>>;
  teachers?: Maybe<Array<Maybe<Teacher>>>;
};


export type RootQueryTypeCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type RootQueryTypeStudentArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type RootQueryTypeStudentLessonArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type RootQueryTypeStudentLessonsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type RootQueryTypeTeacherArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type RootQueryTypeTeacherLessonArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type RootQueryTypeTeacherLessonsArgs = {
  teacherId?: InputMaybe<Scalars['ID']['input']>;
};

export type Student = {
  __typename?: 'Student';
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  resetPasswordExpiresAt?: Maybe<Scalars['Int']['output']>;
  resetPasswordToken?: Maybe<Scalars['String']['output']>;
  verificationPasswordExpiresAt?: Maybe<Scalars['Int']['output']>;
  verificationPasswordToken?: Maybe<Scalars['String']['output']>;
  whishlistLessons?: Maybe<Array<Maybe<TeacherLesson>>>;
};

export type StudentLesson = {
  __typename?: 'StudentLesson';
  id?: Maybe<Scalars['ID']['output']>;
  lesson_status?: Maybe<Scalars['String']['output']>;
  student?: Maybe<Student>;
  teacherLesson?: Maybe<TeacherLesson>;
};

export type Teacher = {
  __typename?: 'Teacher';
  about_me?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  lessons_num?: Maybe<Scalars['Int']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  ratingsCount?: Maybe<Scalars['Int']['output']>;
  resetPasswordExpiresAt?: Maybe<Scalars['Int']['output']>;
  resetPasswordToken?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  salary?: Maybe<Scalars['Int']['output']>;
  usersRate?: Maybe<Student>;
  verificationPasswordExpiresAt?: Maybe<Scalars['Int']['output']>;
  verificationPasswordToken?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type TeacherLesson = {
  __typename?: 'TeacherLesson';
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Int']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  end_time?: Maybe<Scalars['String']['output']>;
  enrolled_students_num?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  is_full?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  ratingsCount?: Maybe<Scalars['Int']['output']>;
  start_date?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['String']['output']>;
  students?: Maybe<Array<Maybe<Student>>>;
  students_num?: Maybe<Scalars['Int']['output']>;
  teacher?: Maybe<Teacher>;
  type?: Maybe<Scalars['String']['output']>;
  usersRate?: Maybe<Student>;
  week_days?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export type Token = {
  __typename?: 'Token';
  idToken?: Maybe<Scalars['String']['output']>;
};

export enum UserType {
  Student = 'student',
  Teacher = 'teacher'
}

export enum LessonStatus {
  Completed = 'completed',
  New = 'new',
  Progress = 'progress'
}

export enum Material {
  Arabic = 'arabic',
  Biology = 'biology',
  Chemistry = 'chemistry',
  English = 'english',
  French = 'french',
  Geography = 'geography',
  History = 'history',
  Math = 'math',
  Philosophy = 'philosophy',
  Physics = 'physics',
  Psychology = 'psychology'
}

export enum MaterialUpdate {
  Arabic = 'arabic',
  Biology = 'biology',
  Chemistry = 'chemistry',
  English = 'english',
  French = 'french',
  Geography = 'geography',
  History = 'history',
  Math = 'math',
  Philosophy = 'philosophy',
  Physics = 'physics',
  Psychology = 'psychology'
}

export enum RoleUpdate {
  Assistant = 'assistant',
  Manager = 'manager',
  Teacher = 'teacher'
}

export enum TeacherLessonType {
  Regular = 'regular',
  Revision = 'revision'
}

export enum TeacherLessonTypeUpdate {
  Regular = 'regular',
  Revision = 'revision'
}

export type RegisterMutationVariables = Exact<{
  input?: InputMaybe<RegisterInput>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'Message', message?: string | null } | null };

export type RegisterVerificationMutationVariables = Exact<{
  input?: InputMaybe<RegisterVerificationInput>;
}>;


export type RegisterVerificationMutation = { __typename?: 'Mutation', registerVerification?: { __typename?: 'Message', message?: string | null } | null };

export type LoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserType>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Token', idToken?: string | null } | null };

export type LogoutMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<UserType>;
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'Message', message?: string | null } | null };

export type ForgetPasswordMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserType>;
}>;


export type ForgetPasswordMutation = { __typename?: 'Mutation', forgetPassword?: { __typename?: 'Message', message?: string | null } | null };

export type VerifyOtpMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserType>;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOTP?: { __typename?: 'Message', message?: string | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserType>;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'Message', message?: string | null } | null };

export type RefreshQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshQueryQuery = { __typename?: 'RootQueryType', refresh?: { __typename?: 'Message', message?: string | null } | null };

export type GetIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIdQuery = { __typename?: 'RootQueryType', getId?: { __typename?: 'Token', idToken?: string | null } | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'RootQueryType', categories?: Array<{ __typename?: 'Category', id?: string | null, material?: string | null, title?: string | null, description?: string | null } | null> | null };

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'RootQueryType', category?: { __typename?: 'Category', id?: string | null, material?: string | null, title?: string | null, description?: string | null } | null };

export type GetStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentsQuery = { __typename?: 'RootQueryType', students?: Array<{ __typename?: 'Student', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, password?: string | null, whishlistLessons?: Array<{ __typename?: 'TeacherLesson', id?: string | null, category?: { __typename?: 'Category', id?: string | null, material?: string | null, title?: string | null, description?: string | null } | null, teacher?: { __typename?: 'Teacher', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null } | null } | null> | null } | null> | null };

export type GetStudentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentQuery = { __typename?: 'RootQueryType', student?: { __typename?: 'Student', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, password?: string | null, whishlistLessons?: Array<{ __typename?: 'TeacherLesson', id?: string | null, category?: { __typename?: 'Category', id?: string | null, material?: string | null, title?: string | null, description?: string | null } | null, teacher?: { __typename?: 'Teacher', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null } | null } | null> | null } | null };

export type AllTeachersLessonsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTeachersLessonsQuery = { __typename?: 'RootQueryType', allTeachersLessons?: Array<{ __typename?: 'TeacherLesson', id?: string | null, students_num?: number | null, enrolled_students_num?: number | null, price?: number | null, discount?: number | null, rating?: number | null, ratingsCount?: number | null, start_date?: string | null, week_days?: Array<number | null> | null, duration?: number | null, type?: string | null, start_time?: string | null, end_time?: string | null, is_full?: boolean | null, description?: string | null, category?: { __typename?: 'Category', id?: string | null, material?: string | null, title?: string | null, description?: string | null } | null, teacher?: { __typename?: 'Teacher', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, role?: string | null, about_me?: string | null, salary?: number | null, isActive?: boolean | null, rating?: number | null, ratingsCount?: number | null } | null, students?: Array<{ __typename?: 'Student', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null } | null> | null, usersRate?: { __typename?: 'Student', id?: string | null } | null } | null> | null };

export type TeacherLessonsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeacherLessonsQuery = { __typename?: 'RootQueryType', teacherLessons?: Array<{ __typename?: 'TeacherLesson', id?: string | null, students_num?: number | null, enrolled_students_num?: number | null, price?: number | null, discount?: number | null, rating?: number | null, ratingsCount?: number | null, start_date?: string | null, week_days?: Array<number | null> | null, duration?: number | null, type?: string | null, start_time?: string | null, end_time?: string | null, is_full?: boolean | null, description?: string | null, category?: { __typename?: 'Category', id?: string | null, material?: string | null, title?: string | null, description?: string | null } | null, teacher?: { __typename?: 'Teacher', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, role?: string | null, about_me?: string | null, salary?: number | null, isActive?: boolean | null, rating?: number | null, ratingsCount?: number | null } | null, students?: Array<{ __typename?: 'Student', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null } | null> | null, usersRate?: { __typename?: 'Student', id?: string | null } | null } | null> | null };

export type GetTeachersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeachersQuery = { __typename?: 'RootQueryType', teachers?: Array<{ __typename?: 'Teacher', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, role?: string | null, lessons_num?: number | null, about_me?: string | null, salary?: number | null, isActive?: boolean | null, rating?: number | null, ratingsCount?: number | null } | null> | null };

export type GetTeacherQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeacherQuery = { __typename?: 'RootQueryType', teacher?: { __typename?: 'Teacher', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, role?: string | null, lessons_num?: number | null, about_me?: string | null, salary?: number | null, isActive?: boolean | null, rating?: number | null, ratingsCount?: number | null } | null };


export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const RegisterVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterVerificationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RegisterVerificationMutation, RegisterVerificationMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"idToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ForgetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ForgetPasswordMutation, ForgetPasswordMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyOTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const RefreshQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RefreshQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RefreshQueryQuery, RefreshQueryQueryVariables>;
export const GetIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"idToken"}}]}}]}}]} as unknown as DocumentNode<GetIdQuery, GetIdQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"whishlistLessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetStudentsQuery, GetStudentsQueryVariables>;
export const GetStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"whishlistLessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetStudentQuery, GetStudentQueryVariables>;
export const AllTeachersLessonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllTeachersLessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allTeachersLessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"about_me"}},{"kind":"Field","name":{"kind":"Name","value":"salary"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratingsCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"students_num"}},{"kind":"Field","name":{"kind":"Name","value":"enrolled_students_num"}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratingsCount"}},{"kind":"Field","name":{"kind":"Name","value":"usersRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"week_days"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"is_full"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AllTeachersLessonsQuery, AllTeachersLessonsQueryVariables>;
export const TeacherLessonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeacherLessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherLessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"about_me"}},{"kind":"Field","name":{"kind":"Name","value":"salary"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratingsCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"students_num"}},{"kind":"Field","name":{"kind":"Name","value":"enrolled_students_num"}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratingsCount"}},{"kind":"Field","name":{"kind":"Name","value":"usersRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"week_days"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"is_full"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<TeacherLessonsQuery, TeacherLessonsQueryVariables>;
export const GetTeachersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeachers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teachers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"lessons_num"}},{"kind":"Field","name":{"kind":"Name","value":"about_me"}},{"kind":"Field","name":{"kind":"Name","value":"salary"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratingsCount"}}]}}]}}]} as unknown as DocumentNode<GetTeachersQuery, GetTeachersQueryVariables>;
export const GetTeacherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"lessons_num"}},{"kind":"Field","name":{"kind":"Name","value":"about_me"}},{"kind":"Field","name":{"kind":"Name","value":"salary"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratingsCount"}}]}}]}}]} as unknown as DocumentNode<GetTeacherQuery, GetTeacherQueryVariables>;