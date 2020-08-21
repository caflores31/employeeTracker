DROP DATABASE IF EXISTS employeeDb;
CREATE DATABASE employeeDb;
USE employeeDb;






CREATE TABLE department (
  id INTEGER PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL,
);
CREATE TABLE employee_role (
  id INTEGER PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INTEGER,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
);
CREATE TABLE employee (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INTEGER UNSIGNED, (FOREIGN KEY)
  role_id INTEGER UNSIGNED NOT NULL,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES employee_role(id) ON DELETE CASCADE,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee_role(title) ON DELETE CASCADE,
);

