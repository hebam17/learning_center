const {
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLError,
} = require("graphql");
const { LessonType } = require("./Types");
const Lesson = require("../models/Lesson");
const Teacher = require("../models/Teacher");
const Teacher_Lesson = require("../models/Teacher_Lesson");
const Student_Lesson = require("../models/Student_Lesson");
const { mongoose } = require("mongoose");
const { idCheck, errorHandler } = require("../utils/errorHandler");

const queryFields = {
  Lessons: {
    type: GraphQLList(LessonType),
    resolve(parent, args) {
      try {
        return Lesson.find({});
      } catch (err) {
        errorHandler(err);
      }
    },
  },
  lesson: {
    type: LessonType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      try {
        idCheck(args.id);
        return Lesson.findById(args.id);
      } catch (err) {
        errorHandler(err);
      }
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
      try {
        const lesson = new Lesson({
          material: args.material,
          title: args.title,
          description: args.description,
        });

        return lesson.save();
      } catch (err) {
        errorHandler(err);
      }
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
      try {
        idCheck(args.id);
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
      } catch (err) {
        errorHandler(err);
      }
    },
  },

  deleteLesson: {
    type: LessonType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args) {
      try {
        idCheck(args.id);
        if (!mongoose.isValidObjectId(args.id))
          throw new GraphQLError("This id is not valid");

        // delete the lesson
        const lesson = await Lesson.findByIdAndDelete(args.id);
        console.log(lesson);

        if (!lesson) throw new GraphQLError("This lesson wasn't found!");

        // get all teacher lessons associated with it
        const teacherLesson = await Teacher_Lesson.find({ lessonId: args.id });

        if (teacherLesson) {
          // loop through each teacher lesson and delete the associated sutdent lesson
          [...teacherLesson].forEach(
            async (lesson) =>
              await Student_Lesson.deleteMany({ teacherLessonId: lesson.id })
          );

          // delete the teacher lesson
          await Teacher_Lesson.deleteMany({ lessonId: args.id });
          return lesson;
        }
        return lesson;
      } catch (err) {
        errorHandler(arr);
      }
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
