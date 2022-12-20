const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const colors = require('colors');
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

mongoose.set("strictQuery", true);

mongoose
  .connect(`${process.env.MONGO_URL}${process.env.DB_NAME}`)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`.magenta);
      console.log("DB connected".cyan.underline.bold);
    })
  )
  .catch((error) => console.log("DB error:", error));

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV,
  })
);
