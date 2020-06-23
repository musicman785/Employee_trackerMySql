const mysql = require("mysql");
const inquirer = require("inquirer");
const { createPromptModule } = require("inquirer");

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
        "Update Employee Manager",
        "View All Roles",
        "View All Departments",
        "Add Roles",
        "Add Department",
        "exit"
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

        case "View All Roles":
          allRoles();
          break;

        case "View All Departments":
          allDept();
          break;

        case "Add Department":
          addDept();
          break;

        case "Add Roles":
          addRoles();
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
ON employee.role_id = role.id
INNER JOIN department
ON role.department_id = department.id`);

const mgrTable = (`SELECT  e.id, e.first_name, e.last_name, role.title, role.salary , d.dept, 
CONCAT(m.first_name , (" "),m.last_name) AS Manager
FROM employee e  
LEFT JOIN employee m ON m.id = e.manager_id JOIN role   
JOIN department d ON  role.department_Id = d.id AND e.role_id = role.id`);



//Function calls all employees with all values
const employeesAll = () => {
  connection.query(mgrTable, (err, res) => {
    if (err) throw err;
    console.table(res);
    ask();
  })
};

// Function to call employees based on department
const department = () => {
  let dept = [];
  connection.query("SELECT * FROM department", (err, res) => {
    res.forEach(element => {
      dept.push(element.dept);
    })

    inquirer.prompt({

      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: dept

    }).then(response => {

      connection.query(`${mgrTable}
      WHERE dept = "${response.action}"`, (err, res) => {
        console.table(res);
        ask();
      })

    })
  })
}
// Function adds new employees to database
const add = () => {
  let newDept = [];
  connection.query("SELECT * FROM department", (err, res) => {
    res.forEach(element => {
      newDept.push(`${element.id} ${element.dept}`);
    })
    let newPosition = [];
    connection.query("SELECT id, title FROM role", (err, res) => {
      res.forEach(element => {
        newPosition.push(`${element.id} ${element.title}`);
      })
      let newManager = [];
      connection.query(`SELECT id, first_name, last_name FROM employee`, (err, res) => {
        res.forEach(element => {
          newManager.push(`${element.id} ${element.first_name} ${element.last_name}`)

        })

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
            choices: newDept
          },
          {
            name: "role",
            type: "list",
            message: "Choose employee's role",
            choices: newPosition
          },
          {
            name: "manager",
            type: "list",
            message: "Choose employee's manager",
            choices: newManager
          }
        ]).then(res => {
          let roleCode = parseInt(res.role);
          let mgrCode = parseInt(res.manager)
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: res.first,
              last_name: res.last,
              role_id: roleCode,
              manager_id: mgrCode
            }, (err, res) => {
              if (err) throw err
            }
          )
          connection.query(mgrTable, (err, res) => {
            if (err) throw err;
            console.table(res);
            ask();
          })
        })
      })
    })
  })
}
// Function remove employees from database
const remove = () => {
  let active = [];

  connection.query(`SELECT  id, first_name, last_name FROM employee`, (err, res) => {
    res.forEach(element => {
      active.push(`${element.id} ${element.first_name} ${element.last_name}`);
    });

    inquirer.prompt(
      {
        name: "remove",
        type: "list",
        message: "Who would you like to remove?",
        choices: active
      }

    ).then(response => {
      console.log(response);
      let empID = parseInt(response.remove);

      connection.query(`DELETE FROM employee WHERE id = ${empID}`, (err, res) => {
        console.table(response);
        ask();
      })
    })
  })
}

// Update Employee Role

const updateRole = () => {
  const employees = [];

  connection.query(`SELECT  id, first_name, last_name FROM employee`, (err, res) => {
    res.forEach(element => {
      employees.push(`${element.id} ${element.first_name} ${element.last_name}`);
    });
    let newPosition = [];
    connection.query("SELECT id, title FROM role", (err, res) => {
      res.forEach(element => {
        newPosition.push(`${element.id} ${element.title}`);
      })

      inquirer.prompt([
        {
          name: "update",
          type: "list",
          message: "Choose employee whose role you woule like to update?",
          choices: employees
        },
        {
          name: "role",
          type: "list",
          message: "Choose employee's role",
          choices: newPosition
        }
      ]).then(res => {
        let roleCode = parseInt(res.role);
        let empID = parseInt(res.update);
        connection.query(
          `UPDATE employee SET role_id = ${roleCode} WHERE id = ${empID}`,
          (err, res) => {
            if (err) throw err
          }
        )
        connection.query(mgrTable, (err, res) => {
          if (err) throw err;
          console.table(res);
          ask();
        })
      })
    })
  })
}
// View all Roles 
const allRoles = () => {
  connection.query("SELECT id, title FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    ask();
  })
};

// View all departments
const allDept = () => {
  connection.query("SELECT id, dept FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    ask();
  })
};

// Add new Departments 
const addDept = () => {

  inquirer
    .prompt({

      name: "role",
      type: "input",
      message: "Please Enter New Department"

    }
    ).then(res => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept: res.role
        },
        (err, res) => {
          if (err) throw err;
        }
      )
      connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        ask();
      })
    })

}

// Add new Roles 
const addRoles = () => {

  inquirer.prompt({
    name: "validation",
    type: "list",
    message: "Does This Role Already Exist",
    choices: ["Yes", "No"]

  }).then(res => {
    if (res.validation === "Yes") {
      createRole();
    } else {
      ask();
    };

  })
};
const createRole = () => {
  let newRoleDept = [];
  connection.query("SELECT * FROM department", (err, res) => {
    res.forEach(element => {
      newRoleDept.push(`${element.id} ${element.dept}`);
    })

    inquirer
      .prompt([{

        name: "role",
        type: "input",
        message: "Please Enter New Role"

      },
      {
        name: "salary",
        type: "input",
        message: "What Is The Salary?"
      },
      {
        name: "department",
        type: "list",
        message: "Please Choose Department For New Role",
        choices: newRoleDept
      }
      ]).then(res => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: res.role,
            salary: res.salary,
            department_id: parseInt(res.department)
          },
          (err, res) => {
            if (err) throw err;
          }
        )
        connection.query("SELECT * FROM role", (err, res) => {
          if (err) throw err;
          console.table(res);
          ask();
        })
      })
  })
}




