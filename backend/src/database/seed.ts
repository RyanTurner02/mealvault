import { faker } from '@faker-js/faker';
import { User } from '@/model/user';
import { Recipe } from '@/model/recipe';
import { Instruction } from '@/model/instruction';
import { CustomField } from '@/model/customField';
import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const pool = mysql.createPool({
  host: process.env.HOST_URL,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_ROOT_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const runQuery = async (query: string, values: any = null) => {
  try {
    const [result, fields]: any = await pool.query(query, values);
    console.log(result);
    console.log(fields);
  } catch (error) {
    console.log(error);
  }
}

const createUser = (userId: number): User => {
  const name: string = faker.internet.displayName();
  const password: string = faker.internet.password();
  const email: string = faker.internet.exampleEmail();
  const creationDate: Date = new Date();
  const updatedDate: Date = creationDate;
  return new User(userId, name, password, email, creationDate, updatedDate);
}

const createRecipe = (recipeId: number, userId: number): Recipe => {
  const recipeName: string = faker.food.dish();
  const creationDate: Date = new Date();
  const updatedDate: Date = creationDate;
  return new Recipe(recipeId, userId, recipeName, creationDate, updatedDate);
}

const createInstruction = (instructionId: number, recipeId: number): Instruction => {
  const instructionText: string = faker.lorem.paragraphs({ min: 1, max: 5 });
  const creationDate: Date = new Date();
  const updatedDate: Date = creationDate;
  return new Instruction(instructionId, recipeId, instructionText, creationDate, updatedDate);
}

const createCustomField = (fieldId: number, recipeId: number): CustomField => {
  const fieldName: string = faker.lorem.word();
  const fieldType: number = 1;
  const fieldText: string = faker.lorem.word();
  const creationDate: Date = new Date();
  const updatedDate: Date = creationDate;
  return new CustomField(fieldId, recipeId, fieldName, fieldType, fieldText, creationDate, updatedDate);
}

const seedUser = (user: User): void => {
  const query = `INSERT INTO user (user_name, user_password, user_email, date_created, date_updated) VALUES(?, ?, ?, ?, ?)`;
  const values = [user.name, user.password, user.email, user.creationDate, user.updatedDate];
  runQuery(query, values);
}

const seedRecipe = (recipe: Recipe): void => {
  const query: string = `INSERT INTO recipe(user_id, recipe_name, date_created, date_updated) VALUES(?, ?, ?, ?)`;
  const values: (string | number | Date)[] = [recipe.userId, recipe.recipeName, recipe.dateCreated, recipe.dateUpdated];
  runQuery(query, values);
};

const seedInstruction = (instruction: Instruction): void => {
  const query: string = `INSERT INTO instruction(recipe_id, instruction_text, date_created, date_updated) VALUES(?, ?, ?, ?)`;
  const values: any = [instruction.recipeId, instruction.instructionText, instruction.creationDate, instruction.updatedDate];
  runQuery(query, values);
};

const seedCustomField = (customField: CustomField): void => {
  const query: string = `INSERT INTO custom_field(recipe_id, field_name, field_type, field_text, date_created, date_updated) VALUES(?, ?, ?, ?, ?, ?)`;
  const values: any = [customField.recipeId, customField.fieldName, customField.fieldType, customField.fieldText, customField.creationDate, customField.updatedDate];
  runQuery(query, values);
};

const seed = (numUsers: number) => {
  let recipeId = 1;
  let instructionId = 1;
  let customFieldId = 1;

  for (let userId = 1; userId <= numUsers; userId++) {
    seedUser(createUser(userId));
    const numRecipes = faker.number.int(5);

    for (let recipeIndex = 1; recipeIndex <= numRecipes; recipeIndex++) {
      seedRecipe(createRecipe(recipeId, userId));
      const numInstructions = faker.number.int(5);
      const numCustomFields = faker.number.int(5);

      for (let instructionIndex = 1; instructionIndex <= numInstructions; instructionIndex++) {
        seedInstruction(createInstruction(instructionId, recipeId));
        instructionId++;
      }

      for (let customFieldIndex = 1; customFieldIndex <= numCustomFields; customFieldIndex++) {
        seedCustomField(createCustomField(customFieldId, recipeId));
        customFieldId++;
      }

      recipeId++;
    }
  }
}

const numUsers = 5;
seed(numUsers);
