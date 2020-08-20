INSERT INTO department (name)
VALUES
('BACKEND DEV'),
('FRONTEND DEV'),
('MANAGER'),
('SALES');

INSERT INTO role_employee (title, salary, department_id)
VALUES
('Data Analyst', 80000, 1),
('FrontEnd Developer', 50000, 2),
('Manager', 90000, 3),
('Sales Rep', 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Grant', 'Emerson', 2, null),
('Melanie', 'Gilman', 3, null),
('Mallory', 'Korpics', 1, 2),
('Jacob', 'Daughtry', 3, 1),
('Rachel', 'Fritz', 1, 1),
('Alex', 'Vasilkov', 2 ,2),
('Jon', 'Prine', 4, 1),
('Sharee', 'Burkeen', 4, 1),
('Taylor', 'Nyquist', 3, 1);