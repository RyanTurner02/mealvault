import { MySqlContainer, StartedMySqlContainer } from "@testcontainers/mysql";
import mysql, { Pool } from "mysql2/promise";
import "dotenv/config";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import { user } from "@db/schema";
import * as UserRepository from "@repository/user-repository";
import * as RecipeRepository from "@repository/recipe-repository";
import User from "@model/user";
import { faker } from "@faker-js/faker";
import { UserDto } from "@dtos/user-dto";
import { count } from "drizzle-orm";
import { RecipeDto } from "@dtos/recipe-dto";
import { IUserRepository } from "@repository/user-repository";
import { IRecipeRepository } from "@repository/recipe-repository";
import * as schema from "@db/schema";
import { reset } from "drizzle-seed";

describe("UserRepository", () => {
  jest.setTimeout(30000);

  let container: StartedMySqlContainer;
  let pool: Pool;
  let db: MySql2Database<Record<string, never>>;
  let userRepository: IUserRepository;
  let recipeRepository: IRecipeRepository;

  const sampleUser: User = new User(1,
    faker.internet.displayName(),
    faker.internet.password(),
    faker.internet.exampleEmail()
  );

  beforeAll(async () => {
    container = await new MySqlContainer("mysql:9.3.0")
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
    userRepository = UserRepository.createUserRepository({ db });
    recipeRepository = RecipeRepository.createRecipeRepository({ db });
  });

  afterAll(async () => {
    if (pool) {
      await pool.end();
    }

    if (container) {
      await container.stop();
    }
  });

  beforeEach(async () => {
    await migrate(db, { migrationsFolder: "drizzle" });

    await db.insert(user).values({
      userName: sampleUser.getName(),
      userPassword: sampleUser.getPassword(),
      userEmail: sampleUser.getEmail(),
    });
  });

  afterEach(async () => {
    await reset(db, schema);
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
      const actual: number | null = await userRepository.createUser(newUser);

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

    it("does not get a user by email", async () => {
      const actual: User | null = await userRepository.getUserByEmail("");

      expect(actual).toBeNull();
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

    it("does not get a user by id", async () => {
      const actual: User | null = await userRepository.getUser(-1);

      expect(actual).toBeNull();
    });
  });

  describe("editName", () => {
    it("edits the user's name", async () => {
      const name: string = faker.internet.displayName();

      const actual: boolean = await userRepository.editName(sampleUser.getId(), name);

      const user: User | null = await userRepository.getUser(sampleUser.getId());
      expect(actual).toBe(true);
      expect(user!.getName()).toBe(name);
    });
  });

  describe("editEmail", () => {
    it("edits the user's email", async () => {
      const email: string = faker.internet.exampleEmail();

      const actual: boolean = await userRepository.editEmail(sampleUser.getId(), email);

      const user: User | null = await userRepository.getUser(sampleUser.getId());
      expect(actual).toBe(true);
      expect(user!.getEmail()).toBe(email);
    });
  });

  describe("editPassword", () => {
    it("edits the user's password", async () => {
      const password: string = faker.internet.password();

      const actual: boolean = await userRepository.editPassword(sampleUser.getId(), password);

      const user: User | null = await userRepository.getUser(sampleUser.getId());
      expect(actual).toBe(true);
      expect(user!.getPassword()).toBe(password);
    });
  });

  describe("deleteUser", () => {
    it("deletes the user", async () => {
      const actual: boolean = await userRepository.deleteUser(sampleUser.getId());

      expect(actual).toBe(true);
    });

    it("deletes the user and their recipes", async () => {
      const userId: number = sampleUser.getId();
      const recipeDto: RecipeDto = {
        name: "",
        prepTime: "",
        cookTime: "",
        servings: "",
        ingredients: "",
        instructions: "",
      };

      const recipeId: number | null = await recipeRepository.createRecipe(sampleUser.getId(), recipeDto);
      const actual: boolean = await userRepository.deleteUser(sampleUser.getId());
      const createdRecipe: RecipeDto | null = await recipeRepository.getRecipe(userId, recipeId!);

      expect(actual).toBe(true);
      expect(createdRecipe).toBeUndefined();
    });

    it("does not delete an invalid user", async () => {
      const actual: boolean = await userRepository.deleteUser(-1);

      expect(actual).toBe(false);
    });
  });
});
