import { MySqlContainer, StartedMySqlContainer } from "@testcontainers/mysql";
import mysql, { Pool } from "mysql2/promise";
import "dotenv/config";

describe("MySQL Testcontainers", () => {
  jest.setTimeout(30000);

  let container: StartedMySqlContainer;
  let pool: Pool;

  beforeAll(async () => {
    container = await new MySqlContainer("mysql:8.0")
      .withUsername(process.env.MYSQL_USER!)
      .withUserPassword(process.env.MYSQL_PASSWORD!)
      .withDatabase(process.env.MYSQL_DATABASE!)
      .withExposedPorts(3306)
      .start();

    pool = mysql.createPool({
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      user: container.getUsername(),
      password: container.getUserPassword(),
    });
  });

  afterAll(async () => {
    if (pool) {
      await pool.end();
    }

    if (container) {
      await container.stop();
    }
  });

  it("runs a query", async () => {
    const [rows] = await pool.execute("SELECT 1 as res");
    expect(rows).toEqual([{ res: 1 }]);
  });
});
