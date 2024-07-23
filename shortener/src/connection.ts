import mongoose from "mongoose";

const handleConnectMongoDB = async (url: any) => {
    return mongoose.connect(url)
        .then(() => console.log("MongoDB connected ... "))
        .catch((err: any) => console.log("Mongoose connection err => ", err));
}

export default handleConnectMongoDB;