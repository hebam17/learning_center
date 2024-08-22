const {
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { LessonType } = require("./Types");
const Lesson = require("../models/Lesson");
const Teacher = require("../models/Teacher");
const Teacher_Lesson = require("../models/Teacher_Lesson");
const Student_Lesson = require("../models/Student_Lesson");

const queryFields = {
  Lessons: {
    type: GraphQLList(LessonType),
    resolve(parent, args) {
      return Lesson.find({});
    },
  },
  lesson: {
    type: LessonType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Lesson.findById(args.id);
    },
  },
};

const mutationFields = {
  addLesson: {
    type: LessonType,
    args: {
      material: {
        type: new GraphQLEnumType({
          name: "material",
          values: {
            arabic: { value: "Arabic" },
            english: { value: "English" },
            french: { value: "French" },
            math: { value: "Math" },
            geography: { value: "Geography" },
            history: { value: "History" },
            biology: { value: "Biology" },
            chemistry: { value: "Chemistry" },
            physics: { value: "Physics" },
            philosophy: { value: "Philosophy" },
            psychology: { value: "Psychology" },
          },
        }),
      },
      title: { type: GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
    },
    resolve(parent, args) {
      const lesson = new Lesson({
        material: args.material,
        title: args.title,
        description: args.description,
      });

      return lesson.save();
    },
  },

  updateLesson: {
    type: LessonType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      material: {
        type: new GraphQLEnumType({
          name: "materialUpdate",
          values: {
            arabic: { value: "Arabic" },
            english: { value: "English" },
            french: { value: "French" },
            math: { value: "Math" },
            geography: { value: "Geography" },
            history: { value: "History" },
            biology: { value: "Biology" },
            chemistry: { value: "Chemistry" },
            physics: { value: "Physics" },
            philosophy: { value: "Philosophy" },
            psychology: { value: "Psychology" },
          },
        }),
      },
      title: { type: GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
    },

    resolve(parent, args) {
      return Lesson.findByIdAndUpdate(
        args.id,
        {
          $set: {
            material: args.material,
            title: args.title,
            description: args.description,
          },
        },
        { new: true }
      );
    },
  },

  deleteLesson: {
    type: LessonType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args) {
      // delete the lesson
      const lesson = await Lesson.findByIdAndDelete(args.id);

      // get all teacher lessons associated with it
      const teacherLesson = await Teacher_Lesson.find({ lessonId: args.id });

      // loop through each teacher lesson and delete the associated sutdent lesson
      [...teacherLesson].forEach(
        async (lesson) =>
          await Student_Lesson.deleteMany({ teacherLessonId: lesson.id })
      );

      // delete the teacher lesson
      await Teacher_Lesson.deleteMany({ lessonId: args.id });
      return lesson;
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
