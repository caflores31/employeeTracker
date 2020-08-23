INSERT INTO department (department_name)
VALUES
('BACKEND DEV'),
('FRONTEND DEV'),
('MANAGER'),
('SALES'),
('FINANCE'),
('RESEARCH'),
('ADVERTISING');

INSERT INTO role_employee (title, salary, department_id)
VALUES
('Data Analyst', 80000, 1),
('FrontEnd Developer', 50000, 2),
('Manager', 90000, 3),
('Software Engineer', 80000, 4),
('HR Manager', 60000, 5),
('Sales Representative', 65000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Grant', 'Emerson', 2, null),
('Melanie', 'Gilman', 3, 1),
('Mallory', 'Korpics', 1, 2),
('Jacob', 'Daughtry', 3, null),
('Rachel', 'Fritz', 1, 1),
('Alex', 'Vasilkov', 2 ,2),
('Jon', 'Prine', 4, 1),
('Sharee', 'Burkeen', 4, 1),
('Taylor', 'Nyquist', 3, 1);

{
        name: "choice",
        type: "rawlist",
        message: "who is the employee's manager?",
        choices: managerList
        
      }