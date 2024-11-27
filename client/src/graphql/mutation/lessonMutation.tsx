// import { GraphQLInputObjectType, GraphQLString } from "graphql";
// import { gql } from "../../__generated__";

// const AddLessonInput = new GraphQLInputObjectType({
//   name: "AddLessonInput",
//   fields: {
//     material: { type: GraphQLString },
//     title: { type: GraphQLString },
//     description: { type: GraphQLString },
//   },
// });

// export const ADD_LESSON = gql(`
//   mutation AddLesson($input:AddLessonInput){
//     addLesson(input:$input){
//       id
//       material
//       title
//       description
//     }
//   }
// `);

// export const UPDATE_LESSON = gql(`
//   mutation UpdateLesson($input:UpdateLessonInput!){
//     updateLesson(input:$input){
//       id
//       material
//       title
//       description
//     }
//   }
// `);
