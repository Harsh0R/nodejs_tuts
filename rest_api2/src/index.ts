import express, { Express, json, Request, Response } from "express";
import "dotenv/config";
import users from "./data.json";
import * as fs from "fs";


const PORT = process.env.PORT;

console.log("PORT ", PORT);

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req: Request, res: Response, next) => {
  console.log("Called Middal ware");
  next()
})

app.get("/", (req: Request, res: Response) => {
  return res.send(`Home Page`);
});
app.get("/api/users", (req: Request, res: Response) => {
  return res.send(users);
});
app.get("/users", (req: Request, res: Response) => {
  const html = `
    <ul>
    ${users.map((user: any) => `<li>${user.name} ${user.last_name}</li> `).join(" ")}
    </ul>
    `;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = users.find((user: any) => user.id == id);
    if (!user) {
      return res.status(404).json({error:"user not found."})
    }
    return res.json(user);
  })
  .patch((req: Request, res: Response) => {
    const body = req.body;
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user: any) => user.id === id);
    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    const updateUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updateUser;
    fs.writeFile("./src/data.json", JSON.stringify(users), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to write to file" });
      }
      return res.json({ status: "success", user: updateUser });
    });
  })
  .delete((req: Request, res: Response) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user: any) => user.id === id);
    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    users.splice(userIndex, 1);

    fs.writeFile("./src/data.json", JSON.stringify(users), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to write to file" });
      }
      return res.json({ status: "success", message: "User deleted" });
    });
  });

app.post("/api/users", (req: Request, res: Response) => {
  const body = req.body;
  console.log("Body in POST ==> " , body);
  
  if (!body.name && !body.last_name && !body.email && !body.gender && !body.job_title) {
    return res.status(400).json({msg:"All fields are req ... "})
  }
  console.log("Body ==> ", body);

  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./src/data.json", JSON.stringify(users), (_err) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`server Runningat ==> http://localhost:${PORT}`);
});



