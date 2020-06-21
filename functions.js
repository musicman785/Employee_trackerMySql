const mysql = require("mysql");

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

module.exports = employeesAll;