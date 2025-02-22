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

export enum LoginType {
  Student = 'student',
  Teacher = 'teacher'
}

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
  register?: Maybe<RegisterSuccess>;
  registerVerification?: Maybe<Token>;
  resetPassword?: Maybe<Message>;
  updateCategory?: Maybe<Category>;
  updateStudent?: Maybe<Student>;
  updateTeacher?: Maybe<Teacher>;
  updateTeacherLesson?: Maybe<TeacherLesson>;
  verifyATeacher?: Maybe<Teacher>;
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
  type?: InputMaybe<ForgetPasswordType>;
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<LoginType>;
};


export type MutationLogoutArgs = {
  type?: InputMaybe<LogoutType>;
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
  type?: InputMaybe<ResetPasswordType>;
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

export type RegisterSuccess = {
  __typename?: 'RegisterSuccess';
  message?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
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
  accessToken?: Maybe<Scalars['String']['output']>;
};

export enum UserType {
  Student = 'student',
  Teacher = 'teacher'
}

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

export type RegisterMutationVariables = Exact<{
  input?: InputMaybe<RegisterInput>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'RegisterSuccess', message?: string | null, userId?: string | null } | null };

export type RegisterVerificationMutationVariables = Exact<{
  input?: InputMaybe<RegisterVerificationInput>;
}>;


export type RegisterVerificationMutation = { __typename?: 'Mutation', registerVerification?: { __typename?: 'Token', accessToken?: string | null } | null };

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
