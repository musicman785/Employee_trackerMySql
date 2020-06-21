DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id),
 FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);


USE employeeTracker_db;

SELECT employee.id, first_name, last_name, title, dept, salary, manager_id
FROM employee
INNER JOIN role
ON employee.role_id = role.id
INNER JOIN department
ON role.department_id = department.id;




