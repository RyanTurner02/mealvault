import express, { Express } from "express";
import cors, { CorsOptions } from "cors";

const app: Express = express();
const port = process.env.PORT;
const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const userRoute = require("./route/userRoute");
app.use('/api/user/', userRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));