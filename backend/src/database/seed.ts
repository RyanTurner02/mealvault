import { faker } from '@faker-js/faker';
import { User } from '@/model/user';
import { Recipe } from '@/model/recipe';
import { Instruction } from '@/model/instruction';
import { CustomField } from '@/model/customField';

const createUser = (userId: number): void => {
  const name: string = faker.internet.displayName();
  const password: string = faker.internet.password();
  const email: string = faker.internet.exampleEmail();
  const creationDate: Date = new Date();
  const updatedDate: Date = creationDate;
  const user: User = new User(userId, name, password, email, creationDate, updatedDate);
}

const createRecipe = (recipeId: number, userId: number): void => {
  const recipeName: string = faker.food.dish();
  const dateCreated: Date = new Date();
  const dateUpdated: Date = dateCreated;
  const recipe: Recipe = new Recipe(recipeId, userId, recipeName, dateCreated, dateUpdated);
}

const createInstruction = (instructionId: number, recipeId: number): void => {
  const instructionText: string = faker.lorem.paragraphs({ min: 1, max: 5 });
  const instruction: Instruction = new Instruction(instructionId, recipeId, instructionText);
}

const createCustomField = (fieldId: number, recipeId: number): void => {
  const fieldName: string = faker.lorem.word();
  const fieldType: number = 1;
  const fieldText: string = faker.lorem.word();
  const customField: CustomField = new CustomField(fieldId, recipeId, fieldName, fieldType, fieldText);
}

const seed = (numUsers: number) => {
  let recipeId = 1;
  let instructionId = 1;
  let customFieldId = 1;

  for (let userId = 1; userId <= numUsers; userId++) {
    createUser(userId);
    const numRecipes = faker.number.int(100);

    for (let recipeIndex = 1; recipeIndex <= numRecipes; recipeIndex++) {
      createRecipe(recipeId, userId);
      const numInstructions = faker.number.int(100);
      const numCustomFields = faker.number.int(100);

      for (let instructionIndex = 1; instructionIndex <= numInstructions; instructionIndex++) {
        createInstruction(instructionId, recipeId);
        instructionId++;
      }

      for (let customFieldIndex = 1; customFieldIndex <= numCustomFields; customFieldIndex++) {
        createCustomField(customFieldId, recipeId);
        customFieldId++;
      }

      recipeId++;
    }
  }
}
