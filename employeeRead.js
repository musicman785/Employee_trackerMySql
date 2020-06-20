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
connection.connect(err => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  ask();
});


const ask = () => {
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
    .then(answer => {
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

// Variable that holds main sql syntax for join database table
const tableAll = (`SELECT employee.id, first_name, last_name, title, dept, salary, manager_id
FROM employee
INNER JOIN role
ON employee.dept_id = role.id
INNER JOIN department
ON role.department_id = department.id`);



//Function calls all employees with all values
const employeesAll = () => {
  connection.query(tableAll, (err, res) => {
    if (err) throw err;
    console.table(res);
    ask();
  })
};

// Function to call employees based on department
const department = () => {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "Engineering",
      "Finance",
      "Legal",
      "Sales",
    ]
  }).then(response => {
    connection.query(`${tableAll}
    WHERE dept = "${response.action}"`, (err, res) => {
      console.table(res);
      ask();
    })
  })

}
// Function adds new employees to database
const add = () => {
  inquirer.prompt([
    {
      name: "first",
      type: "input",
      message: "Enter employee's first name."
    },
    {
      name: "last",
      type: "input",
      message: "Enter empoyee's last name."
    },
    {
      name: "department",
      type: "list",
      message: "Choose employee's department",
      choices: ["Sales", "Engineering", "Finance", "Legal"]
    },
    {
      name: "role",
      type: "list",
      message: "Choose employee's role",
      choices: ["1 Software Engineer", "2 Accountant", "3 Lawyer", "4 Salesperson", "5 Lead Engineer", "6 Legal Team Lead", "7 Sales Lead"]
    }
  ]).then(res => {
    let roleCode = parseInt(res.role.charAt(0));
    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: res.first,
        last_name: res.last,
        dept_id: roleCode
      }, (err, res) => {
        if (err) throw err
      }
    )
    connection.query(tableAll, (err, res) => {
      if (err) throw err;
      console.table(res);
      ask();
    })
  })
}
// Function remove employees from database
const remove = () => {
  let active = [];

  connection.query(`SELECT first_name, last_name FROM employee`, (err, res) => {
    res.forEach(element => {
      active.push(`${element.id} ${element.first_name} ${element.last_name}`);
    });
  })

  inquirer.prompt(
    {
      name: "remove",
      type: "list",
      message: "Who would you like to remove?",
      choices: active
    }

  ).then(res => {

    let empID = parseInt(res.remove.charAt(0));

    connection.query(`DELETE  FROM employee WHERE id = ${empID}`, (err, res) => {
      console.table(response);
      ask();
    })
  })
}

// dept: res.department
  // Need function to say that if user selects VIEW ALL EMPLOYEES, then show table of employees with all values. (id, first_name, last_name, role, department, salary, manager)

   // Need function to say that if user selects VIEW EMPLOYEES BY DEPARTMENT, then ask question about what department, then return list for all employees under selected department

   // Need function to say that if user selects VIEW EMPLOYEES BY MANAGER, then ask question to select manager_id, then return list for all employees under selected manager_id

  // if not then restart the question of "What would you like to Do?"

  // Need a function to say if the user wants to ADD NEW EMPLOYEE, then prompt question for first_name, last_namt, role, department, salary, and manager, then add the new employee to the employee table. 