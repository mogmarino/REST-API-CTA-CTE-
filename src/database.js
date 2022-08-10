import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/cta-cte", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((error) => console.log(error));
