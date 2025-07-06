// IMPORTING MYSQL
import { createConnection } from 'mysql';
import pkg from 'ip';
const { address } = pkg;

export const port = 4600;
export const host = 'localhost';
export const url = `http://${host}:${port}`;
export const addressIp = address();
export const urlIp = `http://${addressIp}:${port}`;
// CREATING CONNECTION
const db = createConnection({
    host: 'localhost', // hardcoded, not using .env
    user: 'root',      // hardcoded, not using .env
    password: '',      // hardcoded, not using .env
    database: 'agriconnect', // hardcoded, not using .env
    port: 3306,
    multipleStatements: true
});

// CONNECTING TO DATABASE
db.connect(function (err) {
    if (err) {
        console.log(err, "\nError in database connection.");
    } else {
        console.log(`System started on\n localhost: ${url} \n server: ${urlIp}`);
        console.log("Database connection is successfull.");
    }
});

export default db;