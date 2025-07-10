import { CookieOptions, Request, Response } from "express";
import { UserRequest } from "@typings/express/index";
import { IUserService } from "@service/userService";
import { IUserAuthService } from "@service/userAuthService";
import { UserDto } from "@dtos/user.dto";

interface UserControllerDependencies {
    userService: IUserService;
    userAuthService: IUserAuthService;
};

export interface IUserController {
    createUser(req: Request, res: Response): Promise<any>;
    loginUser(req: Request, res: Response): Promise<any>;
    getCurrentUser(req: UserRequest, res: Response): Promise<any>;
    getUserById(req: Request<{ userId: number }>, res: Response): Promise<any>;
};

export const createUserController = ({
    userService,
    userAuthService
}: UserControllerDependencies): IUserController => {
    const createUser = async (req: Request, res: Response): Promise<any> => {
        const userDto: UserDto = req.body as UserDto;

        if (!userDto) {
            return res.status(400).send("User data is required");
        }

        const userId: (number | null) = await userService.createUser(req.body);

        if (!userId) {
            return res.status(500).send("User creation failed");
        }

        const accessToken = userAuthService.generateAccessToken(userId);
        const refreshToken = userAuthService.generateRefreshToken(userId);

        if (!accessToken || !refreshToken) {
            return res.status(500).send("Token generation failed");
        }

        const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 900000
        };
        res.cookie('access_token', accessToken, cookieOptions);
        cookieOptions.maxAge = 604800000;
        res.cookie('refresh_token', refreshToken, cookieOptions);

        return res.status(200).json({ id: userId });
    }

    const loginUser = async (req: Request, res: Response): Promise<any> => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send("Email and password are required");
        }

        const user = await userService.getUserByLogin(req.body.email, req.body.password);

        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        const accessToken = userAuthService.generateAccessToken(user.getId());
        const refreshToken = userAuthService.generateRefreshToken(user.getId());

        if (!accessToken || !refreshToken) {
            return res.status(500).send("Token generation failed");
        }

        const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 900000
        };
        res.cookie('access_token', accessToken, cookieOptions);
        cookieOptions.maxAge = 604800000;
        res.cookie('refresh_token', refreshToken, cookieOptions);

        return res.status(200).json({ id: user.getId(), name: user.getName(), email: user.getEmail() });
    }

    const getCurrentUser = async (req: UserRequest, res: Response): Promise<any> => {
        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }

        const user = await userService.getUser(req.user.id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        return res.status(200).json({ user: user });
    }

    const getUserById = async (req: Request<{ userId: number }>, res: Response): Promise<any> => {
        return res.json(await userService.getUser(req.params.userId));
    }

    return {
        createUser,
        loginUser,
        getCurrentUser,
        getUserById
    };
}