import { Request, Response } from "express";
import { UserRequest } from "@typings/express/index";
import { IUserService } from "@service/userService";
import { UserDto } from "@dtos/user.dto";
import { ITokenService } from "@service/tokenService";
import { ICookiePayload, ICookieUtils } from "@utils/cookieUtils";
import User from "@model/user";

interface UserControllerDependencies {
    userService: IUserService;
    tokenService: ITokenService;
    cookieUtils: ICookieUtils,
};

export interface IUserController {
    createUser(req: Request, res: Response): Promise<void>;
    loginUser(req: Request, res: Response): Promise<void>;
    logoutUser(req: Request, res: Response): void;
    getCurrentUser(req: UserRequest, res: Response): Promise<void>;
    getUserById(req: Request<{ userId: number }>, res: Response): Promise<void>;
};

export const createUserController = ({
    userService,
    tokenService,
    cookieUtils,
}: UserControllerDependencies): IUserController => {
    const createUser = async (req: Request, res: Response): Promise<void> => {
        const userDto: UserDto = req.body as UserDto;

        if (!userDto) {
            res.status(400).send("User data is required");
            return;
        }

        const userId: (number | null) = await userService.createUser(userDto);

        if (!userId) {
            res.status(500).send("User creation failed");
            return;
        }

        if (!setAuthCookies(res, userId)) {
            res.status(500).send("Token generation failed");
            return;
        }

        res.status(200).json({ id: userId });
    }

    const loginUser = async (req: Request, res: Response): Promise<void> => {
        if (!req.body.email || !req.body.password) {
            res.status(400).send("Email and password are required");
            return;
        }

        const user: User | null = await userService.getUserByLogin(req.body.email, req.body.password);

        if (!user) {
            res.status(401).send("Invalid email or password");
            return;
        }

        if (!setAuthCookies(res, user.getId())) {
            res.status(500).send("Token generation failed");
            return;
        }

        res.status(200).json({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail()
        });
    }

    const setAuthCookies = (res: Response, userId: number): boolean => {
        const accessToken = tokenService.generateAccessToken(userId);
        const refreshToken = tokenService.generateRefreshToken(userId);

        if (!accessToken || !refreshToken) {
            return false;
        }

        const cookies: ICookiePayload[] = cookieUtils.createAuthCookies(accessToken, refreshToken);
        cookies.forEach((cookie: ICookiePayload) => {
            res.cookie(cookie.name, cookie.value, cookie.options);
        });

        return true;
    }

    const logoutUser = (req: Request, res: Response): void => {
        const cookies: ICookiePayload[] = cookieUtils.clearAuthCookies();
        cookies.forEach((cookie: ICookiePayload) => {
            res.cookie(cookie.name, cookie.value, cookie.options);
        });

        res.status(200).json({ message: "Logged out" });
    }

    const getCurrentUser = async (req: UserRequest, res: Response): Promise<void> => {
        if (!req.user) {
            res.status(401).send("Unauthorized");
            return;
        }

        const user: User | null = await userService.getUser(req.user.id);

        if (!user) {
            res.status(404).send("User not found");
            return;
        }

        res.status(200).json({ user: user });
    }

    const getUserById = async (req: Request<{ userId: number }>, res: Response): Promise<void> => {
        res.json(await userService.getUser(req.params.userId));
    }

    return {
        createUser,
        loginUser,
        logoutUser,
        getCurrentUser,
        getUserById
    };
}