const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table")


const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Rudim3nts08",
    database: "employeeTracker_db"
  });

  // connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  ask();
});
  

function ask() {
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
          employeesAll();
          break;
  
        case "View All Employees By Department":
          department();
          break;
  
        case "View All Employees By Manager":
          manager();
          break;
  
        case "Add Employee":
          add();
          break;

        case "Remove Employee":
          remove();
          break;

        case "Update Employee Role":
          updateRole();
           break;

        case "Update Employee Manager":
          updateManager();
          break;
            
        case "exit":
          connection.end();
          break;

          
        }
      });
  } 
  const employeesAll = () => {
     connection.query(`SELECT employee.id, first_name, last_name, title, dept, salary, manager_id
     FROM employee
     INNER JOIN role
     ON employee.dept_id = role.id
     INNER JOIN department
     ON role.department_id = department.id`, (err, res) =>{
       if (err) throw err;
      console.table(res);
      ask();
    })
  };

  // Need function to say that if user selects VIEW ALL EMPLOYEES, then show table of employees with all values. (id, first_name, last_name, role, department, salary, manager) 

   // Need function to say that if user selects VIEW EMPLOYEES BY DEPARTMENT, then ask question about what department, then return list for all employees under selected department

   // Need function to say that if user selects VIEW EMPLOYEES BY MANAGER, then ask question to select manager_id, then return list for all employees under selected manager_id

  // if not then restart the question of "What would you like to Do?"

  // Need a function to say if the user wants to ADD NEW EMPLOYEE, then prompt question for first_name, last_namt, role, department, salary, and manager, then add the new employee to the employee table. 