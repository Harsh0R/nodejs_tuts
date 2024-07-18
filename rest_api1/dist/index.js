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
app.get('/', (req, res) => {
    return res.send(`Home Page`);
});
app.get('/api/users', (req, res) => {
    return res.send(data_json_1.default);
});
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${data_json_1.default.map((user) => `<li>${user.name} ${user.last_name}</li> `).join(" ")}
    </ul>
    `;
    res.send(html);
});
app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = data_json_1.default.find((user) => user.id == id);
    return res.json(user);
}).patch((req, res) => {
    return res.json({ status: "pandding..." });
}).delete((req, res) => {
    return res.json({ status: "pandding..." });
});
app.post('/api/users', (req, res) => {
    const body = req.body;
    data_json_1.default.push(Object.assign(Object.assign({}, body), { id: data_json_1.default.length + 1 }));
    fs_1.default.writeFile('./data.json', JSON.stringify(data_json_1.default), (_err) => {
        return res.json({ status: "pandding..." });
    });
});
app.listen(PORT, () => {
    console.log(`server Runningat ==> http://localhost:${PORT}`);
});
