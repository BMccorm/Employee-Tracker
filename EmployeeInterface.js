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
          // {
          //   name: "View All Employees By Manager",
          //   value: "VIEW_EMPLOYEES_BY_MANAGER"
          // },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES"
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
            name: "Add Department",
            value: "ADD_DEPARTMENT"
          },

          {
            name: "Add Role",
            value: "ADD_ROLE"
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
            name: "Remove Role",
            value: "REMOVE_ROLE"
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
// query variable used to access all departments
const viewDepartmentQuery = "SELECT department.id, department.department_name, SUM(role.salary) AS department_total_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.department_name;"

// query variable used to access all employees
const viewEmployeesQuery = "SELECT employee.id AS Employee_ID, employee.first_name, employee.last_name, role.role_title AS Role, department.department_name AS Department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"


// function to view all employees
async function viewEmployees() {
  const result = await promiseQuery(viewEmployeesQuery) // use in async function
  console.log("\n");
  console.table(result);
  mainMenu();
}

// Prompts department choices and pulls employees based on department  
async function viewEmployeesByDepartment() {
  const result = await promiseQuery(viewDepartmentQuery) // use in async function
  // console.table(result);

  const departmentChoices = result.map((deptOptions) => ({
    name: deptOptions.department_name,
    value: deptOptions.id
  }));

  const { departmentId } = await inquirer.prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Please pick a department:",
      choices: departmentChoices
    }
  ]);
  // query to find employees by department
  var queryRoleId = "SELECT employee.id AS Employee_ID, employee.first_name, employee.last_name, role.role_title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id =" + departmentId + ";"

  const result_role_id = await promiseQuery(queryRoleId) // use in async function
  console.log("\n");
  console.table(result_role_id);

  mainMenu();
};

// async viewEmployeesByManager(){
//   var query =
//   const result = await promiseQuery(query) // use in async function
//   console.table(result);
//   mainMenu();
// };

async function viewDepartments() {
  const result = await promiseQuery(viewDepartmentQuery) // use in async function
  console.log("\n");
  console.table(result);
  mainMenu();
};

async function viewRoles() {
  var queryRoleId = "SELECT role.role_title AS Department_Roles, department.department_name  FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;"
  // WHERE department.id = " + departmentId + "; "
  const result_dept_roles = await promiseQuery(queryRoleId) // use in async function
  console.log("\n");
  console.table(result_dept_roles);
  mainMenu();
};

async function updateEmployeeRole() {
  const result = await promiseQuery(viewEmployeesQuery)// use in async function
  console.table(result);
  console.log(result.id);
  // const employeeChoices = result.map(({ id, first_name, last_name }) => ({
  //   name: `${first_name} ${last_name} ${employee.id}`,
  //   value: id
  // }));

  // console.log(employeeChoices);
}




















// async updateEmployeeManager(){
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
