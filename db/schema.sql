-- drops database if it currently exists 
DROP DATABASE IF EXISTS employee_db;

-- create new database
CREATE DATABASE employee_db;

-- Makes switch to newly created database

USE employee_db;

CREATE TABLE department
(
  id INT
  AUTO_INCREMENT PRIMARY KEY,
  -- INT PRIMARY KEY
  department_name VARCHAR
  (30) NOT NULL
  -- to hold department name
);

  CREATE TABLE role
  (
    id INT
    AUTO_INCREMENT PRIMARY KEY,
  -- primary key makes sure each id is unique and is also an index
  role_title VARCHAR
    (30) NOT NULL,
  salary DECIMAL
    (7,0) UNSIGNED NOT NULL,
  department_id INTEGER,
  FOREIGN KEY
    (department_id) REFERENCES department
    (id)
  -- holds reference to department id (department name) and deletes the corresponding records if parent is
);

    CREATE TABLE employee
    (
      id INT
      AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR
      (30) NOT NULL,
  last_name VARCHAR
      (30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY
      (role_id) REFERENCES role
      (id),
  FOREIGN KEY
      (manager_id) REFERENCES employee
      (id)
      );


