import * as mysql2 from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const connectionUri = {
  host: process.env.HOST_URL,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
};
const connection = mysql2.createConnection(connectionUri);

connection.connect(function (err) {
  if (err) {
    console.log('Error connecting: ' + err.stack);
    return;
  }

  console.log('Connected as id ' + connection.threadId);
});

connection.end(err => {
  if (err) {
    console.log('Error closing connection ' + err.stack);
    return;
  }

  console.log('Closing connection');
});
