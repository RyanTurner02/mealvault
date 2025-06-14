import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();
const port = process.env.PORT;
const corsOptions: CorsOptions = {
    origin: `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`,
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());

const authRoute = require("./route/AuthRoute");
app.use('/api/auth/', authRoute);

const userRoute = require("./route/userRoute");
app.use('/api/user/', userRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));