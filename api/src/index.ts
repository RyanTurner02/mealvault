import express, { Express } from "express";

const app: Express = express();
const port = process.env.PORT;

const userRoute = require("./route/userRoute");
app.use('/api/user/', userRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));