import { UserDto } from "@dtos/user.dto";
import User from "@model/user";
import { user } from "@db/schema";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

export const createUserRepository = (db: MySql2Database<Record<string, never>>) => {
    const getUserByEmail = async (email: string): Promise<User | null> => {
        try {
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
        } catch (err) {
            return null;
        }
    }

    const createUser = async (userDto: UserDto): Promise<number | null> => {
        try {
            const result = await db
                .insert(user)
                .values({
                    userName: userDto.name,
                    userPassword: userDto.password,
                    userEmail: userDto.email,
                });

            if (!result?.length) return null;

            return result[0].insertId;
        } catch (err) {
            return null;
        }
    }

    const getUser = async (userId: number): Promise<User | null> => {
        try {
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
        } catch (err) {
            return null;
        }
    }

    return { getUserByEmail, createUser, getUser };
}