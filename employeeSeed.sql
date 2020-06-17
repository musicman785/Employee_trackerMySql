DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCE role (id),
  FOREIGN KEY (manager_id) REFERENCE employee(id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  PRIMARY KEY(id),
 FOREIGN KEY(deparment_id) REFERENCE deparment(id)
);

CREATE TABLE deparment (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30)
    PRIMARY KEY(id),
);