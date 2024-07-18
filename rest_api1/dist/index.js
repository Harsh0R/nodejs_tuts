"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_json_1 = __importDefault(require("./data.json"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const PORT = process.env.PORT;
console.log("PORT ", PORT);
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log("Called Middal ware");
    next();
});
app.get("/", (req, res) => {
    return res.send(`Home Page`);
});
app.get("/api/users", (req, res) => {
    return res.send(data_json_1.default);
});
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${data_json_1.default.map((user) => `<li>${user.name} ${user.last_name}</li> `).join(" ")}
    </ul>
    `;
    res.send(html);
});
app
    .route("/api/users/:id")
    .get((req, res) => {
    const id = Number(req.params.id);
    const user = data_json_1.default.find((user) => user.id == id);
    return res.json(user);
})
    .patch((req, res) => {
    const body = req.body;
    const id = Number(req.params.id);
    const userIndex = data_json_1.default.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res
            .status(404)
            .json({ status: "error", message: "User not found" });
    }
    const updateUser = Object.assign(Object.assign({}, data_json_1.default[userIndex]), req.body);
    data_json_1.default[userIndex] = updateUser;
    fs_1.default.writeFile("./src/data.json", JSON.stringify(data_json_1.default), (err) => {
        if (err) {
            return res
                .status(500)
                .json({ status: "error", message: "Failed to write to file" });
        }
        return res.json({ status: "success", user: updateUser });
    });
})
    .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = data_json_1.default.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res
            .status(404)
            .json({ status: "error", message: "User not found" });
    }
    data_json_1.default.splice(userIndex, 1);
    fs_1.default.writeFile("./src/data.json", JSON.stringify(data_json_1.default), (err) => {
        if (err) {
            return res
                .status(500)
                .json({ status: "error", message: "Failed to write to file" });
        }
        return res.json({ status: "success", message: "User deleted" });
    });
});
app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log("Body ==> ", body);
    data_json_1.default.push(Object.assign(Object.assign({}, body), { id: data_json_1.default.length + 1 }));
    fs_1.default.writeFile("./src/data.json", JSON.stringify(data_json_1.default), (_err) => {
        return res.json({ status: "Success", id: data_json_1.default.length });
    });
});
app.listen(PORT, () => {
    console.log(`server Runningat ==> http://localhost:${PORT}`);
});
