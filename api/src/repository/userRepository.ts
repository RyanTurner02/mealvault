import { getPool } from "./db";

const pool = getPool();

const getAllUsers = async () => {
    try {
        const sql = "SELECT * FROM mealvault.user";
        const [rows, fields]: any = await pool.query(sql);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

const createUser = async (user: any) => {
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

const getUser = async (userId: number) => {
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

module.exports = {
    getAllUsers,
    createUser,
    getUser,
}