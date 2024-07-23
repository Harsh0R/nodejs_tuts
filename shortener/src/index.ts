import express, { Express, Request, Response } from "express";
import urlRoutes from "./routes/url"
import dotenv from "dotenv"
import handleConnectMongoDB from "./connection";
dotenv.config();

const PORT = process.env.PORT || 8000;

const app: Express = express();
handleConnectMongoDB('mongodb://localhost:27017/short-url')

app.use(express.json())

app.use('/url', urlRoutes)

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));