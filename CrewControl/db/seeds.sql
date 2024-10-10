-- Departments
INSERT INTO department (name) VALUES ('Cardiologist'), ('Airline Pilot'), ('Investment Banker');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES 
  ('Cardiologist', 324760, 1),
  ('Airline Pilot', 215600, 2),
  ('Investment Banker', 144633, 3);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
  ('Elena', 'Montserrat', 1, NULL), 
  ('Luz', 'Marisol', 2, 1), 
  ('Violeta', 'Valentina', 3, NULL);
