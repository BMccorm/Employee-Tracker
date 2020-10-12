const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

mainMenu();


async function mainMenu() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "Please select a task below?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
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
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
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
    ]);

    // Call the appropriate function depending on what the user chose
    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmployeesByDepartment();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "REMOVE_EMPLOYEE":
            return removeEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
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

async function viewEmployees() {
    const employees = await db.findAllEmployees();

    console.log("\n");
    console.table(employees);

    mainMenu();
}

async function viewEmployeesByDepartment() {
    try {
        const departments = await db.findAllDepartments();

        const departmentChoices = departments.map(({ department_name, name }) => ({
            name: name,
            value: department_name
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
    } catch (error) {
        console.log(error)
    }
}

async function addEmployee() {
    try {
        const roles = await db.findAllRoles();
        const employees = await db.findAllEmployees();

        const employee = await prompt([
            {
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                message: "What is the employee's last name?"
            }
        ]);

        const roleChoices = roles.map(({ id, role_title }) => ({
            name: role_title,
            value: id
        }));

        const { roleId } = await prompt({
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleChoices
        });

        // const roleTitle = await db.findRoleID(roleId)
        //    turns the resonse a RowDataPacket, into a string and parses it. the [0] accesses the constructor.Once inside, the id can be returned
        employee.role_id = roleId

        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        managerChoices.unshift({ name: "None", value: null });

        const { managerId } = await prompt({
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices
        });

        employee.manager_id = managerId;

        await db.createEmployee(employee);

        console.log(
            `Added ${employee.first_name} ${employee.last_name} to the database`
        );

        mainMenu();
    } catch (error) {
        console.log(error)
    }
}

async function removeEmployee() {
    try {
        const employees = await db.findAllEmployees();

        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        })
        );

        const { employeeId } = await prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Which employee do you want to remove?",
                choices: employeeChoices
            }
        ]);

        await db.removeEmployee(employeeId);

        console.log(`Thank you, this employee has been removed from the database.`);

        mainMenu();
    } catch (error) {
        console.log(error)
        mainMenu();
    }
}

async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
        }
    ]);

    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, role_title }) => ({
        name: role_title,
        value: id
    }));

    const { roleId } = await prompt([
        {
            type: "list",
            name: "roleId",
            message: "Please select the employee's new role?",
            choices: roleChoices
        }
    ]);

    await db.updateEmployeeRole(employeeId, roleId);

    console.log("Updated employee's role");

    mainMenu();
}

async function viewRoles() {
    const roles = await db.findAllRoles();

    console.log("\n");
    console.table(roles);

    mainMenu();
}

async function addRole() {
    try {
        const departments = await db.findAllDepartments();

        const departmentChoices = departments.map(({ id, department_name }) => ({
            name: department_name,
            value: id
        }));

        const role = await prompt([
            {
                name: "role_title",
                message: "What is the name of the role?"
            },
            {
                name: "salary",
                message: "What is the salary of the role. Please do not include commas?"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department does the role belong to?",
                choices: departmentChoices
            }
        ]);

        await db.createRole(role);

        console.log(`Added ${role.role_title} to the database`);

        mainMenu();
    } catch (error) {
        console.log(error)
    }
}

async function removeRole() {
    try {
        const roles = await db.findAllRoles();

        const roleChoices = roles.map(({ id, role_title }) => ({
            name: role_title,
            value: id
        }));

        const { roleId } = await prompt([
            {
                type: "list",
                name: "roleId",
                message:
                    "Which role do you want to remove? (Please note this will also remove employees)",
                choices: roleChoices
            }
        ]);

        await db.removeRole(roleId);

        console.log("Removed role from the database");

        mainMenu();
    } catch (error) {
        console.log(error)
        mainMenu();
    }
}

async function viewDepartments() {
    try {
        const departments = await db.findAllDepartments();

        console.log("\n");
        console.table(departments);

        mainMenu();
    } catch (error) {
        console.log(error)
        mainMenu();
    }
}

async function addDepartment() {
    try {
        const department = await prompt([
            {
                name: "department_name",
                message: "What is the name of the department?"
            }
        ]);

        await db.createDepartment(department);

        console.log(`Added ${department.department_name} to the database`);

        mainMenu();
    } catch (error) {
        console.log(error)
        mainMenu();
    }
}

async function removeDepartment() {
    try {
        const departments = await db.findAllDepartments();

        const departmentChoices = departments.map(({ id, department_name }) => ({
            name: department_name,
            value: id
        }));

        const { departmentId } = await prompt({
            type: "list",
            name: "departmentId",
            message:
                "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
            choices: departmentChoices
        });

        await db.removeDepartment(departmentId);

        console.log(`Removed department from the database`);

        mainMenu();
    } catch (error) {
        console.log(error)
    }
}



function quit() {
    console.log("Thanks!");
    process.exit();
}
