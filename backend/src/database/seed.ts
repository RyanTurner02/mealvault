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

const createCustomField = (): void => {

}

createUser(1);
createRecipe(1, 1);
createInstruction(1, 1);
