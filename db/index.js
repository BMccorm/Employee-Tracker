const connection = require("./connection");

class database {
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees -works
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id AS Employee_ID, employee.first_name, employee.last_name, role.role_title AS Role, department.department_name AS Department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // Find all departments -works
  findAllDepartments() {
    return this.connection.query(
      "SELECT department.id, department.department_name, SUM(role.salary) AS department_total_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.department_name;"
    );
  }

  // Create a new employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }

  // Remove an employee with the given id
  removeEmployee(employeeId) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

  // Find all roles, join with departments to display the department name
  findAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  // Create a new role
  createRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }

  // Remove a role from the database
  removeRole(roleId) {
    return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
  }


  // Create a new department
  createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }

  // Remove a department
  removeDepartment(departmentId) {
    return this.connection.query(
      "DELETE FROM department WHERE id = ?",
      departmentId
    );
  }

  // Find all employees in a given department, join with roles to display role titles
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }
}

module.exports = new database(connection);
