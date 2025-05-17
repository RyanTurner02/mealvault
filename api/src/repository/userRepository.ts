import { getPool } from "./db";
import User from "@model/user";

const pool = getPool();

export const getAllUsers = async () => {
    try {
        const sql = "SELECT * FROM mealvault.user";
        const [rows, fields]: any = await pool.query(sql);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

export const getUserByEmail = async (email: string): Promise<any> => {
    try {
        const sql = "SELECT * FROM mealvault.user WHERE user_email=?";
        const values = [email];
        const [rows]: any = await pool.query(sql, values);

        if (rows.length === 0) return null;

        const user = rows[0];
        return new User(user.user_id, user.user_name, user.user_password, user.user_email, user.date_created, user.date_updated);
    } catch (err) {
        console.log(err);
    }
}

export const createUser = async (user: any) => {
    try {
        const sql = `INSERT INTO mealvault.user (user_name, user_password, user_email) VALUES(?, ?, ?)`;
        const values = [user.name, user.password, user.email];
        const [rows, fields]: any = await pool.query(sql, values);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

export const getUser = async (userId: number) => {
    try {
        const sql = "SELECT * FROM mealvault.user WHERE user_id = ?";
        const values: number[] = [userId];
        const [rows, fields]: any = await pool.query(sql, [userId]);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }
}