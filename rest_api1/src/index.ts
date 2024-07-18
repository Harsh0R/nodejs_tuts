import express, { Express, Response, Request } from "express"
import dotenv from 'dotenv'
import users from './data.json'
import fs from 'fs'
dotenv.config()

const PORT = process.env.PORT;

console.log("PORT ", PORT);

const app: Express = express();

app.use(express.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
    return res.send(`Home Page`)
})
app.get('/api/users', (req: Request, res: Response) => {
    return res.send(users)
})
app.get('/users', (req: Request, res: Response) => {
    const html = `
    <ul>
    ${users.map((user) =>
        `<li>${user.name} ${user.last_name}</li> `
    ).join(" ")}
    </ul>
    `;
    res.send(html)
})

app.route('/api/users/:id').get((req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    return res.json(user)
}).patch((req: Request, res: Response) => {
    return res.json({ status: "pandding..." });
}).delete((req: Request, res: Response) => {
    return res.json({ status: "pandding..." });
});


app.post('/api/users', (req: Request, res: Response) => {
    const body = req.body;
    console.log("Body ==> " , body);
    
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./data.json', JSON.stringify(users), (_err ) => {
        return res.json({ status: "pandding..." });
    })
})

app.listen(PORT, () => {
    console.log(`server Runningat ==> http://localhost:${PORT}`);

})

