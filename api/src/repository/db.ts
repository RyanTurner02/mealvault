import mysql from "mysql2";

export const getUsers = () => {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    connection.execute("SELECT * from mealvault.user", function(err, results, fields) {
        if(err){
            console.log(err);
            return;
        }
        console.log(results);
        console.log(fields);
    });
}
