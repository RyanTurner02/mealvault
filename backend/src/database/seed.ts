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

const createRecipe = (): void => {

}

const createInstruction = (): void => {

}

const createCustomField = (): void => {

}

createUser(1);
