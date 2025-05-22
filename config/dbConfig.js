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
const execute = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'csit_project',
    port: 3306,
    multipleStatements: true
});

// CONNECTING TO DATABASE
execute.connect(function (err) {
    if (err) {
        console.log(err, "\nError in database connection.");
    } else {

        console.log(`System started on\n localhost: ${url} \n server: ${urlIp}`);
        console.log("Database connection is successfull.");
    }
});

const connection = execute;
export default connection;