import { MySqlContainer, StartedMySqlContainer } from "@testcontainers/mysql";
import mysql, { Pool } from "mysql2/promise";
import "dotenv/config";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import { user } from "@db/schema";
import * as UserRepository from "@repository/userRepository";
import User from "@model/user";
import { faker } from "@faker-js/faker";
import { UserDto } from "@dtos/user.dto";
import { count } from "drizzle-orm";

describe("UserRepository", () => {
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
    container = await new MySqlContainer("mysql:9.3.0")
      .withName("user-repository-test-container")
      .withUsername("test")
      .withUserPassword("test")
      .withDatabase("test_db")
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

    userRepository = UserRepository.createUserRepository({ db });
  });

  afterAll(async () => {
    if (pool) {
      await pool.end();
    }

    if (container) {
      await container.stop();
    }
  });

  describe("createUser", () => {
    it("creates user with name, email, and password", async () => {
      const newUser: UserDto = {
        name: faker.internet.displayName(),
        email: faker.internet.exampleEmail(),
        password: faker.internet.password(),
      };

      const expected: number = (await db
        .select({ count: count() })
        .from(user))
        .length;
      const actual: number = await userRepository.createUser(newUser);

      expect(actual).toEqual(expected + 1);
    });
  });

  describe("getUserByEmail", () => {
    it("gets a user by email", async () => {
      const actual: User | null = await userRepository.getUserByEmail(sampleUser.getEmail());

      expect(actual).not.toBeNull();

      expect(actual?.getId()).toBe(sampleUser.getId());
      expect(actual?.getName()).toBe(sampleUser.getName());
      expect(actual?.getEmail()).toBe(sampleUser.getEmail());
      expect(actual?.getPassword()).toBe(sampleUser.getPassword());
    });
  });

  describe("getUser", () => {
    it("gets a user by id", async () => {
      const actual: User | null = await userRepository.getUser(sampleUser.getId());

      expect(actual).not.toBeNull();

      expect(actual?.getId()).toBe(sampleUser.getId());
      expect(actual?.getName()).toBe(sampleUser.getName());
      expect(actual?.getEmail()).toBe(sampleUser.getEmail());
      expect(actual?.getPassword()).toBe(sampleUser.getPassword());
    });
  });
});
