import { UserDto } from "@dtos/user.dto";
import User from "@model/user";
import { user } from "@db/schema";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

interface UserRepositoryDependencies {
    db: MySql2Database<Record<string, never>>;
}

export interface IUserRepository {
    getUserByEmail(email: string): Promise<User | null>;
    createUser(userDto: UserDto): Promise<number | null>;
    getUser(userId: number): Promise<User | null>;
};

export const createUserRepository = ({ db }: UserRepositoryDependencies): IUserRepository => {
    const getUserByEmail = async (email: string): Promise<User | null> => {
        const result = await db
            .select()
            .from(user)
            .where(eq(user.userEmail, email));

        if (!result?.length) return null;

        return new User(
            result[0].userId,
            result[0].userName,
            result[0].userPassword,
            result[0].userEmail,
        );
    }

    const createUser = async (userDto: UserDto): Promise<number | null> => {
        const result = await db
            .insert(user)
            .values({
                userName: userDto.name,
                userPassword: userDto.password,
                userEmail: userDto.email,
            });

        if (!result?.length) return null;

        return result[0].insertId;
    }

    const getUser = async (userId: number): Promise<User | null> => {
        const result = await db
            .select()
            .from(user)
            .where(eq(user.userId, userId));

        if (!result?.length) return null;

        return new User(
            result[0].userId,
            result[0].userName,
            result[0].userPassword,
            result[0].userEmail
        );
    }

    return {
        getUserByEmail,
        createUser,
        getUser
    };
}