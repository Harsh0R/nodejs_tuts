const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

app.get("/users", (req, res) => {
  const html = `
      <ul>
      ${users.map((i) => `<li>${i.first_name}</li>`).join("")}
      </ul>
      `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

// middaleware
app.use(express.urlencoded({ extended: false }));

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pandding..." });
  })
  .delete((req, res) => {
    return res.json({ status: "pandding..." });
  }); 

  

app.post("/api/users/:id", (req, res) => {
  const body = req.body;
  console.log(body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success" , id:users.length });
  });
});
// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

app.listen(PORT, () => {
  console.log(`Server Started at PORT 8000`);
});
