DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role (id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id),
 FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept VARCHAR(30),
    PRIMARY KEY(id)
);

-- SELECT DISTINCT manager.*
-- FROM employee
-- INNER JOIN employee manager on employee.manager_id = manager.id

USE employeeTracker_db;


-- This syntax joins values from department table to role table
SELECT role.title, role.salary, department.dept
FROM role
INNER JOIN  department
ON role.id = role.department_id

--  This syntax may have to be added in js
-- This syntax joins values role  table w/dept_id to employee table 
SELECT employee.first_name, employee.last_name, role.title, role.salary
FROM employee
INNER JOIN role
ON employee.id = role.role_id
ORDER BY  employee.title