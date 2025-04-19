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
    getUser,
}