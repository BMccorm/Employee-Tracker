USE employee_db;

INSERT INTO department
    (department_name)
VALUES
    ('HR'),
    -- 1
    ('Engineering'),
    -- 2
    ('Marketing'),
    -- 3
    ('Legal'),
    -- 4
    ('Finance'),
    -- 5
    ('Design'),
    -- 6
    ('Sales');-- 7


INSERT INTO role
    (role_title,salary,department_id)
VALUES
    ("HR Coordinator", 60000, 1),
    -- 1
    ("HR Manager", 90000, 1),
    -- 2
    ("Junior Developer", 70000, 2),
    -- 3
    ("Senior Developer", 100000, 2),
    -- 4
    ("Marketing Coordinator", 60000, 3),
    -- 5
    ("Marketing Lead", 90000, 3),
    -- 6
    ("Paralegal", 60000, 4),
    -- 7
    ("Lawyer", 140000, 4),
    -- 8
    ("Finance Analyst", 70000, 5),
    -- 9
    ("Finance VP", 140000, 5),
    -- 10
    ("Associate Designer", 70000, 6),
    -- 11
    ("Design Director", 100000, 6),
    -- 12
    ("Sales Assistant", 65000, 7),
    -- 13
    ("Sales Lead", 100000, 7);
-- 14




INSERT INTO employee
    (first_name,last_name,role_id, manager_id)
VALUES
    ("Pat", "Smith", 2, Null),
    -- HR Manager
    ("John", "Doe", 1, 1),
    -- HR Coordinator
    ("Tim", "Cox", 4, Null),
    -- Senior Developer
    ("Lauren", "Brown", 3, 3),
    -- Junior Developer
    ("Alex", "Bahr", 6, Null),
    -- Marketing Lead
    ("Tom", "Ng", 5, 5),
    -- Marketing Coordinator
    ("Bob", "McGregor", 8, Null),
    -- Lawyer
    ("Jess", "Simone", 7, 7),
    -- Paralegal
    ("Alaina", "Swift", 10, Null),
    -- Finance VP
    ("Erica", "DiMelio", 9, 9),
    -- Finance Analyst
    ("Katy", "Knowles", 12, Null),
    -- Design Director
    ("Taylor", "Perry", 11, 11),
    -- Associate Designer
    ("Cora", "Chan", 14, Null),
    -- Sales Lead
    ("Ryan", "Phelps", 13, 13);
    -- Sales Assistant
   

    