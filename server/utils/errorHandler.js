const { GraphQLError } = require("graphql");
const { mongoose } = require("mongoose");

const errorHandler = (error) => {
  if (error instanceof GraphQLError) throw error;
  throw new GraphQLError(
    "Sorry we have a problem connecting to the database, Please try again later!",
    {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
        http: { status: 500 },
      },
    }
  );
};

const idCheck = (id) => {
  if (!mongoose.isValidObjectId(id))
    throw new GraphQLError("This id is not valid!");
};

exports.errorHandler = errorHandler;
exports.idCheck = idCheck;
