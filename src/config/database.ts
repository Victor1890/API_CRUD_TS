import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/testdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log(`Db is connect`))
  .catch((e) => console.log(`Db is not connect`));
