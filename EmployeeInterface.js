const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");
const util = require("util");
const { promisify } = require('util')
const databaseConfig = {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db"
}
const pool = mysql.createPool(databaseConfig)
const promiseQuery = promisify(pool.query).bind(pool)
const promisePoolEnd = promisify(pool.end).bind(pool)


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  mainMenu();
});

async function mainMenu() {
  try {
    const { response } = await inquirer.prompt([
      {
        type: "list",
        name: "response",
        message: "Please pick from the following options?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
          },
          {
            name: "View All Employees By Department",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
          },
          {
            name: "View All Employees By Manager",
            value: "VIEW_EMPLOYEES_BY_MANAGER"
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE"
          },
          {
            name: "Remove Employee",
            value: "REMOVE_EMPLOYEE"
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE"
          },
          {
            name: "Update Employee Manager",
            value: "UPDATE_EMPLOYEE_MANAGER"
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES"
          },
          {
            name: "Add Role",
            value: "ADD_ROLE"
          },
          {
            name: "Remove Role",
            value: "REMOVE_ROLE"
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          {
            name: "Remove Department",
            value: "REMOVE_DEPARTMENT"
          },
          {
            name: "Quit",
            value: "QUIT"
          }
        ]
      }
    ])

    switch (response) {
      case "VIEW_EMPLOYEES":
        return await viewEmployees();
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        return viewEmployeesByDepartment();
      case "VIEW_EMPLOYEES_BY_MANAGER":
        return viewEmployeesByManager();
      case "ADD_EMPLOYEE":
        return addEmployee();
      case "REMOVE_EMPLOYEE":
        return removeEmployee();
      case "UPDATE_EMPLOYEE_ROLE":
        return updateEmployeeRole();
      case "UPDATE_EMPLOYEE_MANAGER":
        return updateEmployeeManager();
      case "VIEW_DEPARTMENTS":
        return viewDepartments();
      case "ADD_DEPARTMENT":
        return addDepartment();
      case "REMOVE_DEPARTMENT":
        return removeDepartment();
      case "VIEW_ROLES":
        return viewRoles();
      case "ADD_ROLE":
        return addRole();
      case "REMOVE_ROLE":
        return removeRole();
      default:
        return quit();
    }
  }
  catch (err) {
    console.log(err)
  }
}
async function viewEmployees() {
  var query = "SELECT employee.id, employee.first_name, employee.last_name, role.role_title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;";
  const result = await promiseQuery(query) // use in async function
  console.table(result);
  mainMenu();
}


// all departments except 
async function viewEmployeesByDepartment() {
  var query = "SELECT department.id, department.department_name, SUM(role.salary) AS department_total_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.department_name;";
  const result = await promiseQuery(query) // use in async function
  // console.table(result);

  const departmentChoices = result.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices
    }
  ]);

  const employees = await db.findAllEmployeesByDepartment(departmentId);

  console.log("\n");
  console.table(employees);



  mainMenu();
};

// async viewEmployeesByManager(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

// async addEmployee(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

// async removeEmployee(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

// async updateEmployeeRole(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

// async updateEmployeeManager(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

// async viewDepartments(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

// async addDepartment(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

// async removeDepartment(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

// async viewRoles(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

// async addRole(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

// async removeRole(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

// async quit(){

// };

  // promisePoolEnd()