import * as mysql from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const connection = mysql.createConnection({
  host: process.env.HOST_URL,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});

const connectToDatabase = () => {
  connection.connect(error => {
    if (error) {
      console.log(`Error connecting: ${error.stack}`);
      return;
    }
  
    console.log(`Connected as id ${connection.threadId}`);
  });
}

const closeDatabaseConnection = () => {
  connection.end(err => {
    if (err) {
      console.log('Error closing connection ' + err.stack);
      return;
    }
  
    console.log('Closing connection');
  });
}

const createDatabase = () => {
  const query = `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};`;

  connection.query(query, (err, result, fields) => {
    if (err instanceof Error) {
      console.log(err);
      return;
    }

    console.log(result);
    console.log(fields);
  });
}

const createUserTable = () => {
    const userIdColumn = 'user_id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY';
    const userNameColumn = 'user_name	VARCHAR(255) NOT NULL';
    const userPasswordColumn = 'user_password	VARCHAR(255) NOT NULL';
    const userEmailColumn = 'user_email	VARCHAR(255) UNIQUE';
    const dateCreatedColumn = 'date_created	DATETIME DEFAULT CURRENT_TIMESTAMP';
    const dateUpdatedColumn = 'date_updated	DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP';

    const query = `CREATE TABLE user (
      ${userIdColumn},
      ${userNameColumn},
      ${userPasswordColumn},
      ${userEmailColumn},
      ${dateCreatedColumn},
      ${dateUpdatedColumn}
    )`;

    connection.query(query, (error, result, fields) => {
      if (error instanceof Error) {
        console.log(error);
        return;
      }

      console.log(result);
      console.log(fields);
    });
}

const createRecipeTable = () => {
  const recipeIdColumn = 'recipe_id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY';
  const userIdColumn = 'user_id	INT NOT NULL';
  const recipeNameColumn = 'recipe_name	VARCHAR(255) NOT NULL';
  const dateCreatedColumn = 'date_created	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP';
  const dateUpdatedColumn = 'date_updated	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP';
  const foreignKeyConstraint = 'FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE';

  const query = `CREATE TABLE recipe(
    ${recipeIdColumn},
    ${userIdColumn},
    ${recipeNameColumn},
    ${dateCreatedColumn},
    ${dateUpdatedColumn},
    ${foreignKeyConstraint}
  )`;

  connection.query(query, (error, result, fields) => {
    if (error instanceof Error) {
      console.log(error);
      return;
    }

    console.log(result);
    console.log(fields);
  });
}

const createInstructionTable = () => {
  const instructionIdColumn = 'instruction_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY';
  const recipeIdColumn = 'recipe_id INT NOT NULL';
  const instructionTextColumn = 'instruction_text TEXT';
  const foreignKeyConstraint = 'FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE';

  const query = `CREATE TABLE instruction(
    ${instructionIdColumn},
    ${recipeIdColumn},
    ${instructionTextColumn},
    ${foreignKeyConstraint}
  )`;

  connection.query(query, (error, result, fields) => {
    if (error instanceof Error) {
      console.log(error);
      return;
    }

    console.log(result);
    console.log(fields);
  });
}

const createCustomFieldTable = () => {
  const fieldIdColumn = 'field_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY';
  const recipeIdColumn = 'recipe_id	INT NOT NULL';
  const fieldNameColumn = 'field_name	VARCHAR(255)';
  const fieldTypeColumn = 'field_type	INT';
  const fieldTextColumn = 'field_text	TEXT';
  const foreignKeyConstraint = 'FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE';

  const query = `CREATE TABLE custom_field (
    ${fieldIdColumn},
    ${recipeIdColumn},
    ${fieldNameColumn},
    ${fieldTypeColumn},
    ${fieldTextColumn},
    ${foreignKeyConstraint}
  )`;

  connection.query(query, (error, result, fields) => {
    if (error instanceof Error) {
      console.log(error);
      return;
    }

    console.log(result);
    console.log(fields);
  });
}

connectToDatabase();
createDatabase();
connection.query('USE mealvault;');
createUserTable();
createRecipeTable();
createInstructionTable();
createCustomFieldTable();
closeDatabaseConnection();
