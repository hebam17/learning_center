const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({}),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({}),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
