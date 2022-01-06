const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("UserSchema", UserSchema);
