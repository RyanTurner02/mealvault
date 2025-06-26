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

export const createUser = async (user: UserDto): Promise<number | null> => {
    const sql = `INSERT INTO mealvault.user (user_name, user_password, user_email) VALUES(?, ?, ?)`;
    const values = [user.name, user.password, user.email];
    const [rows]: any = await pool.query(sql, values);
        
    if (rows.affectedRows !== 1) {
        return null;
    }

    return rows.insertId;
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