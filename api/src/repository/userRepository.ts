import { UserDto } from "@dtos/user.dto";
import { getPool } from "./db";
import User from "@model/user";
import { db } from "@db/index";
import { user } from "@db/schema";
import { eq } from "drizzle-orm";

const pool = getPool();

export const getUserByEmail = async (email: string): Promise<any> => {
    try {
        const result = await db.select().from(user).where(eq(user.userEmail, email));

        if (!result?.length) return null;

        return new User(
            result[0].userId,
            result[0].userName,
            result[0].userPassword,
            result[0].userEmail,
        );
    } catch (err) {
        console.log(err);
    }
}

export const createUser = async (userDto: UserDto): Promise<any> => {
    try {
        const result = await db.insert(user).values({
            userName: userDto.name,
            userPassword: userDto.password,
            userEmail: userDto.email,
        });
        
        if (!result?.length) return null;

        return result[0].insertId;
    } catch (err) {
        console.log(err);
    }
}

export const getUser = async (userId: number) => {
    try {
        const result = await db.select().from(user).where(eq(user.userId, userId));

        if (!result?.length) return null;

        return new User(
            result[0].userId,
            result[0].userName,
            result[0].userPassword,
            result[0].userEmail
        );
    } catch (err) {
        console.log(err);
    }
}