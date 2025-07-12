import express, { Router } from "express";
import { ITokenController } from "@controller/tokenController";

interface ITokenRouteDependencies {
    tokenController: ITokenController;
};

export const createTokenRoute = ({ tokenController }: ITokenRouteDependencies) => {
    const router: Router = express.Router();

    router.get("/has-access-token", tokenController.hasAccessToken);
    router.get("/has-refresh-token", tokenController.hasRefreshToken);
    router.get("/refresh", tokenController.refreshAccessToken);

    return router;
}