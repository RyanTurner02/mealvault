import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./route/userRoute";
import authRoute from "./route/authRoute";

const app: Express = express();
const port = process.env.PORT;
const corsOptions: CorsOptions = {
    origin: `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`,
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/auth/', authRoute);
app.use('/api/user/', userRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));