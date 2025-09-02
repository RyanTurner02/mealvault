import express, { Express, Router } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { createUserRoute } from "@route/user-route";
import { createTokenRoute } from "@route/token-route";
import { createUserController, IUserController } from "@controller/user-controller";
import { createUserService, IUserService } from "@service/user-service";
import { createUserRepository, IUserRepository } from "@repository/user-repository";
import { db } from "@db/index";
import { createTokenService, ITokenService } from "@service/token-service";
import { createCookieUtils, ICookieUtils } from "@utils/cookie-utils";
import { createTokenController, ITokenController } from "@controller/token-controller";
import { createAuthMiddleware, IAuthMiddleware } from "@middleware/auth-middleware";
import { createRecipeRoute } from "@route/recipe-route";
import { createRecipeController, IRecipeController } from "@controller/recipe-controller";
import { createRecipeService, IRecipeService } from "@service/recipe-service";
import { createRecipeRepository, IRecipeRepository } from "@repository/recipe-repository";
import { createUserValidationService, IUserValidationService } from "@service/user-validation-service";

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
    const userValidationService: IUserValidationService = createUserValidationService();
    const userController: IUserController = createUserController({ userService, userValidationService, tokenService, cookieUtils });

    const recipeRepository: IRecipeRepository = createRecipeRepository({ db });
    const recipeService: IRecipeService = createRecipeService({ recipeRepository });
    const recipeController: IRecipeController = createRecipeController({ recipeService });

    const authMiddleware: IAuthMiddleware = createAuthMiddleware();

    const userRoute: Router = createUserRoute({ authMiddleware, userController });
    const tokenRoute: Router = createTokenRoute({ tokenController });
    const recipeRoute: Router = createRecipeRoute({ authMiddleware, recipeController });

    app.use('/api/user/', userRoute);
    app.use('/api/token/', tokenRoute);
    app.use("/api/recipe/", recipeRoute);

    return app;
}