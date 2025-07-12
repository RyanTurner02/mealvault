import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import * as userRoute from "@route/userRoute";
import * as tokenRoute from "@route/tokenRoute";
import { createUserController, IUserController } from "@controller/userController";
import { createUserService, IUserService } from "@service/userService";
import { createUserRepository, IUserRepository } from "@repository/userRepository";
import { db } from "@db/index";
import { createTokenService, ITokenService } from "@service/tokenService";
import { createCookieUtils, ICookieUtils } from "@utils/cookieUtils";
import { createTokenController, ITokenController } from "@controller/tokenController";

const app: Express = express();
const port = process.env.PORT;
const corsOptions: CorsOptions = {
    origin: `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`,
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const cookieUtils: ICookieUtils = createCookieUtils();

const tokenService: ITokenService = createTokenService();
const tokenController: ITokenController = createTokenController({ tokenService });

const userRepository: IUserRepository = createUserRepository({ db });
const userService: IUserService = createUserService({ userRepository });
const userController: IUserController = createUserController({ userService, tokenService, cookieUtils });

app.use('/api/user/', userRoute.createUserRoute({ userController }));
app.use('/api/token/', tokenRoute.createTokenRoute({ tokenController }));

app.listen(port, () => console.log(`Listening on port ${port}`));