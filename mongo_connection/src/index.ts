import express, { Express, Request, Response } from "express";
import { connectionMongoDB } from "./connection";

import useRouter from "./routes/user";
import dotenv from "dotenv";

import {logReqRes} from './middlewares/index'

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

//connection
connectionMongoDB("mongodb://127.0.0.1:27017/node_tuts")

//Middleware = Plugin
app.use(express.json());
app.use(logReqRes('log.txt'));

//Routes
app.use("/user", useRouter);

app.listen(PORT, () => {
  console.log(`app runnig at :=> http://localhost:${PORT}`);
});


































// import express, { Express, Request, Response } from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// dotenv.config();

// const PORT = process.env.PORT || 8000;

// const app: Express = express();

// mongoose
//   .connect("mongodb://127.0.0.1:27017/node_tuts")
//   .then(() => console.log("mongoose connected ... "))
//   .catch((err) => console.log("Mongoose connection err => ", err));

// const userSchema = new mongoose.Schema(
//   {
//     f_name: {
//       type: String,
//       require: true,
//     },
//     l_name: {
//       type: String,
//     },
//     email: {
//       type: String,
//       require: true,
//       unique: true,
//     },
//     job_title: {
//       type: String,
//     },
//     gender: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("user", userSchema);

// app.use(express.json());

// app.get("/users", async (req: Request, res: Response) => {
//   const allUsers = await User.find({});
//   const html = ` <ul>
//     ${allUsers
//       .map((user: any) => `<li>${user.f_name} - ${user.email}</li>`)
//       .join(" ")}
//     </ul> `;

//   res.send(html);
// });

// app.get("/api/users", async (req: Request, res: Response) => {
//   const allUsers = await User.find({});
//   res.send(allUsers);
// });

// app
//   .route("/api/users/:id")
//   .get(async (req: Request, res: Response) => {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ msg: "User not Found" });
//     }
//     return res.json(user);
//   })
//   .patch(async (req: Request, res: Response) => {
    
//     const changeUser = await User.findByIdAndUpdate(req.params.id, {
//       f_name: req.body.name,
//     });
//     return res.status(203).json({msg : 'Successfully changed '})
//   }).delete(async(req:Request ,res:Response) => {
//     const deleteUser = await User.findByIdAndDelete(req.params.id);
//     res.status(201).json({msg : 'User deleted SuccessFully.'})
//   });

// app.post("/createUser", async (req: Request, res: Response) => {
//   const body = req.body;
//   console.log("Body ==> ", body);
//   if (
//     !body.name &&
//     !body.last_name &&
//     !body.email &&
//     !body.job_title &&
//     !body.gender
//   ) {
//     return res.status(400).json({ msg: "All fields are req ... " });
//   }

//   const result = await User.create({
//     f_name: body.name,
//     l_name: body.last_name,
//     email: body.email,
//     job_title: body.job_title,
//     gender: body.gender,
//   });

//   console.log("Result ==> ", result);
//   return res.status(201).json({ msg: "data addded successfully" });
// });

// app.listen(PORT, () => {
//   console.log(`app runnig at :=> http://localhost:${PORT}`);
// });
