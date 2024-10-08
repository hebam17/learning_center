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

export type Lesson = {
  __typename?: 'Lesson';
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
  addLesson?: Maybe<Lesson>;
  addTeacherLesson?: Maybe<TeacherLesson>;
  deleteLesson?: Maybe<Lesson>;
  deleteStudent?: Maybe<Student>;
  deleteTeacher?: Maybe<Teacher>;
  deleteTeacherLesson?: Maybe<TeacherLesson>;
  disEnroll?: Maybe<StudentLesson>;
  enroll?: Maybe<StudentLesson>;
  forgetPassword?: Maybe<Message>;
  login?: Maybe<Token>;
  logout?: Maybe<Message>;
  register?: Maybe<Register>;
  registerVarification?: Maybe<Token>;
  resetPassword?: Maybe<Message>;
  updateLesson?: Maybe<Lesson>;
  updateStudent?: Maybe<Student>;
  updateTeacher?: Maybe<Teacher>;
  updateTeacherLesson?: Maybe<TeacherLesson>;
  whishlistAdd?: Maybe<TeacherLesson>;
  whishlistRemove?: Maybe<TeacherLesson>;
};


export type MutationAddLessonArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  material?: InputMaybe<Material>;
  title: Scalars['String']['input'];
};


export type MutationAddTeacherLessonArgs = {
  discount?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  end_time?: InputMaybe<Scalars['Int']['input']>;
  is_full?: InputMaybe<Scalars['Boolean']['input']>;
  lessonId: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  start_date?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  students?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  students_num?: InputMaybe<Scalars['Int']['input']>;
  teacherId: Scalars['ID']['input'];
  type?: InputMaybe<TeacherLessonType>;
  week_days?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type MutationDeleteLessonArgs = {
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
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationEnrollArgs = {
  lesson_status?: InputMaybe<LessonStatus>;
  studentId: Scalars['ID']['input'];
  teacherLessonId: Scalars['ID']['input'];
};


export type MutationForgetPasswordArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ForgetPasswordType>;
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TokenType>;
};


export type MutationLogoutArgs = {
  type?: InputMaybe<LogoutType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRegisterArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<RegisterType>;
};


export type MutationRegisterVarificationArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<VerifyType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationResetPasswordArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ResetPasswordType>;
};


export type MutationUpdateLessonArgs = {
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
  classes_num?: InputMaybe<Scalars['Int']['input']>;
  education?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  email?: InputMaybe<Scalars['String']['input']>;
  experience?: InputMaybe<Scalars['Int']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleUpdate>;
  salary?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateTeacherLessonArgs = {
  discount?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  end_time?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  is_full?: InputMaybe<Scalars['Boolean']['input']>;
  lessonId?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  start_date?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  students?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  students_num?: InputMaybe<Scalars['Int']['input']>;
  teacherId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<TeacherLessonTypeUpdate>;
  week_days?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type MutationWhishlistAddArgs = {
  id: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
};


export type MutationWhishlistRemoveArgs = {
  id: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
};

export type Register = {
  __typename?: 'Register';
  message?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  allTeacherLessons?: Maybe<Array<Maybe<TeacherLesson>>>;
  lesson?: Maybe<Lesson>;
  lessons?: Maybe<Array<Maybe<Lesson>>>;
  refresh?: Maybe<Token>;
  student?: Maybe<Student>;
  studentLesson?: Maybe<StudentLesson>;
  studentLessons?: Maybe<Array<Maybe<StudentLesson>>>;
  students?: Maybe<Array<Maybe<Student>>>;
  teacher?: Maybe<Teacher>;
  teacherLesson?: Maybe<TeacherLesson>;
  teacherLessons?: Maybe<Array<Maybe<TeacherLesson>>>;
  teachers?: Maybe<Array<Maybe<Teacher>>>;
};


export type RootQueryTypeAllTeacherLessonsArgs = {
  teacherId?: InputMaybe<Scalars['ID']['input']>;
};


export type RootQueryTypeLessonArgs = {
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
  id?: InputMaybe<Scalars['ID']['input']>;
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
  password?: Maybe<Scalars['String']['output']>;
  resetPasswordExpiresAt?: Maybe<Scalars['Int']['output']>;
  resetPasswordToken?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  salary?: Maybe<Scalars['Int']['output']>;
  verificationPasswordExpiresAt?: Maybe<Scalars['Int']['output']>;
  verificationPasswordToken?: Maybe<Scalars['String']['output']>;
};

export type TeacherLesson = {
  __typename?: 'TeacherLesson';
  discount?: Maybe<Scalars['Int']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  end_time?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  is_full?: Maybe<Scalars['Boolean']['output']>;
  lesson?: Maybe<Lesson>;
  price?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  start_date?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['Int']['output']>;
  students?: Maybe<Array<Maybe<Student>>>;
  students_num?: Maybe<Scalars['Int']['output']>;
  teacher?: Maybe<Teacher>;
  type?: Maybe<Scalars['String']['output']>;
  week_days?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export type Token = {
  __typename?: 'Token';
  accessToken?: Maybe<Scalars['String']['output']>;
};

export enum ForgetPasswordType {
  Student = 'student',
  Teacher = 'teacher'
}

export enum LessonStatus {
  Completed = 'completed',
  New = 'new',
  Progress = 'progress'
}

export enum LogoutType {
  Student = 'student',
  Teacher = 'teacher'
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

export enum RegisterType {
  Student = 'student',
  Teacher = 'teacher'
}

export enum ResetPasswordType {
  Student = 'student',
  Teacher = 'teacher'
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

export enum TokenType {
  Student = 'student',
  Teacher = 'teacher'
}

export enum VerifyType {
  Student = 'student',
  Teacher = 'teacher'
}

export type GetTeachersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeachersQuery = { __typename?: 'RootQueryType', teachers?: Array<{ __typename?: 'Teacher', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, role?: string | null, about_me?: string | null, salary?: number | null, isActive?: boolean | null } | null> | null };

export type GetLessonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLessonsQuery = { __typename?: 'RootQueryType', lessons?: Array<{ __typename?: 'Lesson', id?: string | null, material?: string | null, title?: string | null, description?: string | null } | null> | null };


export const GetTeachersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTeachers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teachers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"about_me"}},{"kind":"Field","name":{"kind":"Name","value":"salary"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<GetTeachersQuery, GetTeachersQueryVariables>;
export const GetLessonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetLessonsQuery, GetLessonsQueryVariables>;