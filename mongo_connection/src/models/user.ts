import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    f_name: {
      type: String,
      require: true,
    },
    l_name: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    job_title: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("user", userSchema);

module.exports = User;
