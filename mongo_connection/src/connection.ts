import mongoose from "mongoose";

async function connectMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("mongoose connected ... "))
    .catch((err) => console.log("Mongoose connection err => ", err));
}

module.exports = {connectMongoDB}