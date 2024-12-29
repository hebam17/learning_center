const {
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLError,
} = require("graphql");
const { CategoryType } = require("./Types");
const Category = require("../models/Category");
const Teacher = require("../models/Teacher");
const Teacher_Lesson = require("../models/Teacher_Lesson");
const Student_Lesson = require("../models/Student_Lesson");
const { mongoose } = require("mongoose");
const { idCheck, errorHandler } = require("../utils/errorHandler");

const queryFields = {
  categories: {
    type: GraphQLList(CategoryType),
    resolve(parent, args) {
      try {
        console.log("running lesson..");
        return Category.find({});
      } catch (err) {
        errorHandler(err);
      }
    },
  },
  category: {
    type: CategoryType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      try {
        idCheck(args.id);
        return Category.findById(args.id);
      } catch (err) {
        errorHandler(err);
      }
    },
  },
};

const mutationFields = {
  addCategory: {
    type: CategoryType,
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
        const category = new Category({
          material: args.material,
          title: args.title,
          description: args.description,
        });

        return category.save();
      } catch (err) {
        errorHandler(err);
      }
    },
  },

  updateCategory: {
    type: CategoryType,
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
        return Category.findByIdAndUpdate(
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

  deleteCategory: {
    type: CategoryType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args) {
      try {
        idCheck(args.id);
        if (!mongoose.isValidObjectId(args.id))
          throw new GraphQLError("This id is not valid");

        // delete the category
        const category = await Category.findByIdAndDelete(args.id);
        console.log(category);

        if (!category) throw new GraphQLError("This category wasn't found!");

        // get all teacher categorys associated with it
        const teacherLesson = await Teacher_Lesson.find({
          categotyId: args.id,
        });

        if (teacherLesson) {
          // loop through each teacher lesson and delete the associated sutdent lesson
          [...teacherLesson].forEach(
            async (lesson) =>
              await Student_Lesson.deleteMany({ teacherLessonId: lesson.id })
          );

          // delete the teacher lesson
          await Teacher_Lesson.deleteMany({ categoryId: args.id });
          return category;
        }
        return category;
      } catch (err) {
        errorHandler(err);
      }
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
