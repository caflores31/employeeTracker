const mysql = require('mysql2');
const fs = require("fs")
const inquirer = require('inquirer');
const cTable = require('console.table');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'Fuckthis@247',
  database: 'employeeDB'
});


connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  start();
});

async function start() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role"
      ]
    }
  ])
    .then(function (response) {
      switch (response.options) {
        case "View all departments":
          viewDepartments() // made
          break;
        case "View all roles":
          viewRoles() //made
          break;
        case "View all employees":
          viewEmployees() // made 
          break;
        case "Add a department":
          addDepartment() // made
          break;
        case "Add a role":
          addRole() // made
          break;
        case "Add an employee":
          addEmployee() // needs work
          break;
      }
    })
};

// view all departments
async function viewDepartments() {
  connection.query(
    `SELECT id AS ID, department_name AS "Department Name"
    FROM department`, function (err, data) {
    if (err) throw err;
    console.table(data)
    start();
  }
  )
};

// view all roles
async function viewRoles() {
  connection.query(
    `SELECT title AS "Employee Role"
    FROM role_employee`, function (err, data) {
    if (err) throw err;
    console.table(data)
    start();
  }
  )
};

// view all employees
async function viewEmployees() {
  connection.query(
    `SELECT first_name AS "First Name", last_name AS "Last Name", 
    role_employee.title AS Role, role_employee.salary 
    AS Salary, department.department_name AS Department 
    FROM employee 
    INNER JOIN department 
    ON department.id = employee.role_id 
    LEFT JOIN role_employee on role_employee.id = employee.role_id`,
    function (err, data) {
      if (err) throw err;
      console.table(data)
      start();
    }
  )
};

// add a department
async function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: "title",
      message: "enter new department name: "
    }
  ])
    .then(function (answer) {
      var query = connection.query("INSERT INTO department (department_name) VALUES (?)",
        [department_name = answer.title],

        function (err, result) {
          if (err) throw err;
          console.log(answer.title + " has been added to department list")
          start();
        })
    })
}

// add a role
async function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: "title",
      message: "enter new role name: "
    }
  ])
    .then(function (answer) {
      var query = connection.query("INSERT INTO role_employee (title) VALUES (?)",
        [title = answer.title],

        function (err, result) {
          if (err) throw err;
          console.log(answer.title + " has been added to role list")
          start();
        })
    })
}


//  this doesn't work yet =============================
// add an employee 
async function addEmployee() {
  connection.query("SELECT * FROM role_employee", function (err, results) {
    if (err) throw err;
  
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "enter the employee's first name: "
    },
    {
      type: "input",
      name: "last_name",
      message: "enter the employee's last name: "
    },
    {
      name: "choice",
      type: "rawlist",
      message: "what is the employee's role?",
      choices: function () {
        var choiceArray = [];
        for (let i = 0; i < results.length; i++) {
          choiceArray.push(results[i].title)
        }
        return choiceArray;
      }
    },
    {
      type: "input",
      name: "manager",
      message: "who is the employee's manager?"
    }
  ])
    .then(function (answer) {
      for (var i=0; i < results.length; i++) {
        if(results[i].title === answer.choice) {
            answer.role_id = results[i].id;
        }
    }
      var query = "INSERT INTO employee SET ?"
        const values = {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role_id,
          // manager_id = answer.manager,
        }

      connection.query(query, values, function (err, result) {
        if (err) throw err;
        console.log(answer.first_name + " has been added to employee list");
        start();
      })
    });
  })
}


