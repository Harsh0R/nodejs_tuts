import mongoose from "mongoose";
// mongoose.set('strictQuery' , true)
async function connectMongoDB(url:any) {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected ... "))
    .catch((err:any) => console.log("Mongoose connection err => ", err));
}

// module.exports = {connectMongoDB}
export default connectMongoDB;