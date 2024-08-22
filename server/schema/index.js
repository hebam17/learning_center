const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const {
  queryFields: studentQueryFields,
  mutationFields: studentMutationFields,
} = require("./StudentSchema");

const {
  queryFields: teacherQueryFields,
  mutationFields: teacherMutationFields,
} = require("./TeacherSchema");

const {
  queryFields: lessonQueryFields,
  mutationFields: lessonMutationFields,
} = require("./LessonSchema");

const {
  queryFields: teacherLessonQueryFields,
  mutationFields: teacherLessonMutationFields,
} = require("./TeacherLessonSchema");

const {
  queryFields: studentLessonQueryFields,
  mutationFields: studentLessonMutationFields,
} = require("./StudentLessonSchema");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    ...studentQueryFields,
    ...teacherQueryFields,
    ...lessonQueryFields,
    ...teacherLessonQueryFields,
    ...studentLessonQueryFields,
  }),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...studentMutationFields,
    ...teacherMutationFields,
    ...lessonMutationFields,
    ...teacherLessonMutationFields,
    ...studentLessonMutationFields,
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
