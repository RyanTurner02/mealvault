import { MySqlContainer, StartedMySqlContainer } from "@testcontainers/mysql";
import mysql, { Pool } from "mysql2/promise";
import "dotenv/config";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import { user } from "@db/schema";
import * as UserRepository from "@repository/userRepository";
import User from "@model/user";
import { faker } from "@faker-js/faker";

describe("MySQL Testcontainers", () => {
  jest.setTimeout(30000);

  let container: StartedMySqlContainer;
  let pool: Pool;
  let db: MySql2Database<Record<string, never>>;
  let userRepository: any;

  const sampleUser: User = new User(1,
    faker.internet.displayName(),
    faker.internet.password(),
    faker.internet.exampleEmail()
  );

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

    db = drizzle(pool);
    await migrate(db, { migrationsFolder: "drizzle" });

    const seedResult = await db.insert(user).values({
      userName: sampleUser.getName(),
      userPassword: sampleUser.getPassword(),
      userEmail: sampleUser.getEmail(),
    });

    userRepository = UserRepository.createUserRepository(db);
  });

  afterAll(async () => {
    if (pool) {
      await pool.end();
    }

    if (container) {
      await container.stop();
    }
  });

  it("will get a user by an email address", async () => {
    const actual: User | null = await userRepository.getUserByEmail(sampleUser.getEmail());

    expect(actual).not.toBeNull();
    expect(actual?.getId()).toBe(sampleUser.getId());
    expect(actual?.getName()).toBe(sampleUser.getName());
    expect(actual?.getEmail()).toBe(sampleUser.getEmail());
    expect(actual?.getPassword()).toBe(sampleUser.getPassword());
  });
});
