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
  queryFields: categoryQueryFields,
  mutationFields: categoryMutationFields,
} = require("./CategorySchema");

const {
  queryFields: teacherLessonQueryFields,
  mutationFields: teacherLessonMutationFields,
} = require("./TeacherLessonSchema");

const {
  queryFields: studentLessonQueryFields,
  mutationFields: studentLessonMutationFields,
} = require("./StudentLessonSchema");

const {
  queryFields: authQueryFields,
  mutationFields: authMutationFields,
} = require("./AuthSchema");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    ...studentQueryFields,
    ...teacherQueryFields,
    ...categoryQueryFields,
    ...teacherLessonQueryFields,
    ...studentLessonQueryFields,
    ...authQueryFields,
  }),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...studentMutationFields,
    ...teacherMutationFields,
    ...categoryMutationFields,
    ...teacherLessonMutationFields,
    ...studentLessonMutationFields,
    ...authMutationFields,
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
