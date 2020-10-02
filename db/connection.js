const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db"
});

connection.connect();

//setting up promises to use async/await 
connection.query = util.promisify(connection.query);

module.exports = connection;
