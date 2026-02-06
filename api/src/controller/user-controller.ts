import { Request, Response } from "express";
import { UserRequest } from "@typings/express/index";
import { IUserService } from "@service/user-service";
import { UserDto } from "@dtos/user-dto";
import { ITokenService } from "@service/token-service";
import { ICookiePayload, ICookieUtils } from "@utils/cookie-utils";
import User from "@model/user";
import { IUserValidationService } from "@service/user-validation-service";

interface UserControllerDependencies {
    userService: IUserService;
    userValidationService: IUserValidationService;
    tokenService: ITokenService;
    cookieUtils: ICookieUtils,
};

export interface IUserController {
    createUser(req: Request, res: Response): Promise<void>;
    loginUser(req: Request, res: Response): Promise<void>;
    logoutUser(req: Request, res: Response): void;
    getCurrentUser(req: UserRequest, res: Response): Promise<void>;
    editName(req: UserRequest, res: Response): Promise<void>;
    editEmail(req: UserRequest, res: Response): Promise<void>;
    editPassword(req: UserRequest, res: Response): Promise<void>;
    deleteUser(req: UserRequest, res: Response): Promise<void>;
    getUserById(req: Request<{ userId: number }>, res: Response): Promise<void>;
};

export const createUserController = ({
    userService,
    userValidationService,
    tokenService,
    cookieUtils,
}: UserControllerDependencies): IUserController => {
    const createUser = async (req: Request, res: Response): Promise<void> => {
        const userDto: UserDto = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        if (!userValidationService.validateName(userDto.name) ||
            !userValidationService.validateEmail(userDto.email) ||
            !userValidationService.validatePassword(userDto.password)) {
            res.status(500).send("Invalid name, email, or password");
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
        const cookies: ICookiePayload[] = cookieUtils.createEmptyAuthCookies();
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

    const editName = async (req: UserRequest, res: Response): Promise<void> => {
        if (!req.user) {
            res.status(401).send("Unauthorized");
            return;
        }

        if (!req.body.name) {
            res.status(400).send("Missing name");
            return;
        }

        const result = await userService.editName(req.user.id, req.body.name);

        if (!result) {
            res.status(500).send("Unable to change name");
            return;
        }

        res.status(200).send("Updated name");
    }

    const editEmail = async (req: UserRequest, res: Response): Promise<void> => {
        if (!req.user) {
            res.status(401).send("Unauthorized");
            return;
        }

        if (!req.body.email) {
            res.status(400).send("Missing email");
            return;
        }

        const result: boolean = await userService.editEmail(req.user.id, req.body.email);

        if (!result) {
            res.status(500).send("Unable to change email");
            return;
        }

        res.status(200).send("Updated email");
    }

    const editPassword = async (req: UserRequest, res: Response): Promise<void> => {
        if (!req.user) {
            res.status(401).send("Unauthorized");
            return;
        }

        if (!req.body.oldPassword || !req.body.newPassword) {
            res.status(400).send("Missing old password or new password");
            return;
        }

        const result: boolean = await userService.editPassword(req.user.id, req.body.oldPassword, req.body.newPassword);

        if (!result) {
            res.status(500).send("Unable to change password");
            return;
        }

        res.status(200).send("Updated password");
    }

    const deleteUser = async (req: UserRequest, res: Response) : Promise<void> => {
        if (!req.user) {
            res.status(401).send("Unauthorized");
            return;
        }

        const result: boolean = await userService.deleteUser(req.user.id);

        if (result) {
            res.status(200).json({
                "code": "Success",
                "message": "User and recipes successfully deleted"
            });
            return;
        }

        res.status(500).json({
            "code": "Error",
            "message": "Unable to delete user or recipes"
        })
    }

    const getUserById = async (req: Request<{ userId: number }>, res: Response): Promise<void> => {
        res.json(await userService.getUser(req.params.userId));
    }

    return {
        createUser,
        loginUser,
        logoutUser,
        getCurrentUser,
        editName,
        editEmail,
        editPassword,
        deleteUser,
        getUserById,
    };
}