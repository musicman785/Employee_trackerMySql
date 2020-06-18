const mysql = require("mysql");
const inqurer = require("inquirer");
const table = require("console.table")


const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "employeeTracker_db"
  });
  

function runEmployee() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View All Employees":
          allEmployees;
          break;
  
        case "View All Employees By Department":
          deptEmployees();
          break;
  
        case "View All Employees By Manager":
          rangeSearch();
          break;
  
        case "Add Employee":
          songSearch();
          break;

        case "Remove Employee":
          songSearch();
          break;

        case "Update Employee Role":
          songSearch();
           break;

        case "Update Employee Manager":
          songSearch();
          break;
            
        case "exit":
          connection.end();
          break;

          
        }
      });
  } 

  // Need function to say that if user selects VIEW ALL EMPLOYEES, then show table of employees with all values. (id, first_name, last_name, role, department, salary, manager) 

   // Need function to say that if user selects VIEW EMPLOYEES BY DEPARTMENT, then ask question about what department, then return list for all employees under selected department

   // Need function to say that if user selects VIEW EMPLOYEES BY MANAGER, then ask question to select manager_id, then return list for all employees under selected manager_id

  // if not then restart the question of "What would you like to Do?"

  // Need a function to say if the user wants to ADD NEW EMPLOYEE, then prompt question for first_name, last_namt, role, department, salary, and manager, then add the new employee to the employee table. 