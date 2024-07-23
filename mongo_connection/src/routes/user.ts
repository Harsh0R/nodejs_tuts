import express, { Express, Request, Response } from "express";
import { handleCreateUser, handleDateleUserBtId, handleGetAllUser, handleGetUserById, handleUpdateUserById } from '../controllers/user'

const router = express.Router();

// router.get("/", async (req: Request, res: Response) => {
//     const allUsers = await User.find({});
//     const html = ` <ul>
//       ${allUsers
//         .map((user: any) => `<li>${user.f_name} - ${user.email}</li>`)
//         .join(" ")}
//       </ul> `;

//     res.send(html);
//   });

router
  .route("/")
  .get(handleGetAllUser)
  .post(handleCreateUser)

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDateleUserBtId);


export default router