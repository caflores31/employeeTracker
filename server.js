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
        "View all employees by Manager",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        'Remove Employee',
        'Remove Department',
        'Remove Role',
        'View All Employees by Department',
        'View all Employees by Manager',
        'Update Employee Manager'
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
        case "View all employees by Manager":
          viewEmployeesByManager() // working on this 
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
        case "Update Employee Role":
          updateRole() // toDo
          break;
        case "Remove Employee":
          removeEmployee() // toDo
          break;
        case "Remove Department":
          removeDept() // toDo
          break;
        case "Remove Role":
          removeRole() // toDo
          break;
        case "View All Employees by Department":
          employeesByDep() // toDo
          break;
        case "View All Employees by Manager":
          employeesByMan() // toDo
          break;
        case "Update Employee Manager":
          updateManager() // toDo
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
    `SELECT role_employee.id AS ID, title AS "Employee Role", role_employee.salary
    AS Salary, department_id AS "Dept #", title AS "Department"
    FROM role_employee
    INNER JOIN department
    ON department.id = department_id`,
    function (err, data) {
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

// ================================ working on this now =======
// view employees by manager
async function viewEmployeesByManager() {
  connection.query(`SELECT first_name AS "First Name", 
  last_name AS "Last Name", 
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
    })
}

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
function addRole() {
  var roleQuery = "SELECT * FROM role_employee;";
  var departmentQuery = "SELECT * FROM department;";

  connection.query(roleQuery, function (err, roles) {
    connection.query(departmentQuery, function (err, department) {

      if (err) throw err;

      inquirer.prompt([

        {
          name: "newRole",
          type: "input",
          message: ["what role would you like to add?"]
        },
        {
          name: "newSalary",
          type: "input",
          message: "What is the salary you would like to add?"
        },
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var arrayOfChoices = [];
            for (var i = 0; i < department.length; i++) {
              arrayOfChoices.push(department[i].department_name);
            }

            return arrayOfChoices;
          },
          message: "which department does this role belong to?"
        },
      ]).then(function (answer) {
        for (var i = 0; i < department.length; i++) {
          if (department[i].department_name === answer.choice) {
            answer.department_id = department[i].id;
          }
        }
        var query = "INSERT INTO role_employee SET ?"
        const values = {
          title: answer.newRole,
          salary: answer.newSalary,
          department_id: answer.department_id
        }
        connection.query(query, values, function (err) {
          if (err) throw err;
          console.table("role created!");
          start();
        })
      })
    })
  })
};

// Update Employee Role
function updateRole() {
  inquirer.prompt([
    {
      name: "updateRole",
      type: "input",
      message: ["what role would you like to add?"]
    },
  ]).then(function (answer) {
    var query = "INSERT INTO employee_role SET ?"
    var addRole = connection.query(query, [{ title: answer.newRole }], function (err) {
      if (err) throw err;
      console.table("role created!");
      start()
    })
  })
};


const employeeList = () => new Promise ((resolve, reject) => {
  connection.query("SELECT CONCAT(first_name,' ',last_name) AS NAME FROM employee WHERE role_id = 3",  (err, results) => {
    if (err) throw err;

    return resolve(results);
  })
})

//  this doesn't work yet =============================
// add an employee 
async function addEmployee() {
  connection.query("SELECT * FROM role_employee", async function (err, results) {
    if (err) throw err;

    const rolesList = results.map(function (item) {
      return item.title;
    })

    // console.log(rolesList);
    const employees = await employeeList();
    // console.log(employees);

    const managerList = employees.map(function (item) {
      return item.NAME
    })
    console.log(managerList);

    inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "enter the employee's first name: "
      },
      {
        type: "input",
        name: "lastName",
        message: "enter the employee's last name: "
      },
      {
        name: "choice",
        type: "rawlist",
        message: "what is the employee's role?",
        choices: rolesList
      },
      {
        name: "choice2",
        type: "rawlist",
        message: "who is the employee's manager?",
        choices: managerList
      }
    ])
      .then(function (answer) {
        // let manager = managers.find(obj => obj.Manager === answers.manager);
        for (var i = 0; i < results.length; i++) {
          if (results[i].title === answer.choice) {
            answer.role_id = results[i].id;
          }
        }

        var query = "INSERT INTO employee SET ?"
        const values = {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role_id,
          // manager_id: answer.manager,
        }

        connection.query(query, values, function (err, result) {
          if (err) throw err;
          console.log(answer.firstName + " has been added to employee list");
          start();
        })
      });

  })
}


