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
  } // Can I put functions in mysql to activate after 