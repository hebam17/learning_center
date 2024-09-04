const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { createHandler } = require("graphql-http/lib/use/express");
const expressPlayground =
  require("graphql-playground-middleware-express").default;
const schema = require("./schema");
const cookieParser = require("cookie-parser");
const { Auth } = require("./middleware/userAuth");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.disable("x-powered-by");

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connect to mongodb"))
  .catch((error) => {
    console.log("Error:", error);
    process.exit(1);
  });

// invoke the auth middleware
app.use(Auth);

app.all(
  "/graphql",
  createHandler({
    schema,
    context: (req) => ({ req, res: req.context.res }),
  })
);

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
