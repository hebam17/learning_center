const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

// app.use(cors());

app.use(cookieParser());

app.disable("x-powered-by");

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connect to mongodb"))
  .catch((error) => console.log("Error:", error));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
