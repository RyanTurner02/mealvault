import { UserDto } from "@dtos/user-dto";
import User from "@model/user";
import { user } from "@db/schema";
import { and, eq, sql } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

interface UserRepositoryDependencies {
    db: MySql2Database<Record<string, never>>;
}

export interface IUserRepository {
    getUserByEmail(email: string): Promise<User | null>;
    createUser(userDto: UserDto): Promise<number | null>;
    getUser(userId: number): Promise<User | null>;
    editName(userId: number, name: String): Promise<boolean>;
    editEmail(userId: number, email: string): Promise<boolean>;
    editPassword(userId: number, password: string): Promise<boolean>;
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
            })
            .onDuplicateKeyUpdate({
                set: {
                    userId: sql`${user.userId}`
                }
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

    const editName = async (userId: number, name: string): Promise<boolean> => {
        const result = await db
            .update(user)
            .set({
                userName: name
            })
            .where(
                eq(user.userId, userId)
            );

        return result[0].affectedRows === 1;
    }

    const editEmail = async (userId: number, email: string): Promise<boolean> => {
        const result = await db
            .update(user)
            .set({
                userEmail: email
            })
            .where(
                eq(user.userId, userId)
            );

        return result[0].affectedRows === 1;
    }

    const editPassword = async (userId: number, password: string): Promise<boolean> => {
        const result = await db
            .update(user)
            .set({
                userPassword: password
            })
            .where(
                eq(user.userId, userId),
            );

        return result[0].affectedRows === 1;
    }

    return {
        getUserByEmail,
        createUser,
        getUser,
        editName,
        editEmail,
        editPassword,
    };
}