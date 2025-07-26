import express, { Express, Router } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { createUserRoute } from "@route/userRoute";
import { createTokenRoute } from "@route/tokenRoute";
import { createUserController, IUserController } from "@controller/userController";
import { createUserService, IUserService } from "@service/userService";
import { createUserRepository, IUserRepository } from "@repository/userRepository";
import { db } from "@db/index";
import { createTokenService, ITokenService } from "@service/tokenService";
import { createCookieUtils, ICookieUtils } from "@utils/cookieUtils";
import { createTokenController, ITokenController } from "@controller/tokenController";
import { createAuthMiddleware, IAuthMiddleware } from "@middleware/authMiddleware";
import { createRecipeRoute } from "@route/recipe.route";
import { createRecipeController, IRecipeController } from "@controller/recipe.controller";

export const setupApp = (): Express => {
    const app: Express = express();

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
    const tokenController: ITokenController = createTokenController({ cookieUtils, tokenService });

    const userRepository: IUserRepository = createUserRepository({ db });
    const userService: IUserService = createUserService({ userRepository });
    const userController: IUserController = createUserController({ userService, tokenService, cookieUtils });

    const recipeController: IRecipeController = createRecipeController({});

    const authMiddleware: IAuthMiddleware = createAuthMiddleware();

    const userRoute: Router = createUserRoute({ authMiddleware, userController });
    const tokenRoute: Router = createTokenRoute({ tokenController });
    const recipeRoute: Router = createRecipeRoute({ authMiddleware, recipeController });

    app.use('/api/user/', userRoute);
    app.use('/api/token/', tokenRoute);
    app.use("/api/recipe/", recipeRoute);

    return app;
}