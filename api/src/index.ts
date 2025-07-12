import { Express } from "express";
import { setupApp } from "./setup-app";

const port: number = Number(process.env.PORT) || 3000;
const app: Express = setupApp();

app.listen(port, () => console.log(`Listening on port ${port}`));