import pool from './connection.js';
import inquirer from 'inquirer'; 

//To view all departments
const viewAllDepartments = () => {
  pool.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results.rows);
    mainMenu();
  });
};

//To view all roles
const viewAllRoles = () => {
  pool.query(`
    SELECT role.id, role.title, department.name AS department, role.salary 
    FROM role 
    JOIN department ON role.department_id = department.id`, 
    (err, results) => {
      if (err) throw err;
      console.table(results.rows);
      mainMenu();
    });
};

//To view all employees
const viewAllEmployees = () => {
  pool.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id 
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id`, 
    (err, results) => {
      if (err) throw err;
      console.table(results.rows);
      mainMenu();
    });
};

// Adding a department
const addDepartment = () => {
  inquirer.prompt([
    {
      name: 'name',
      message: 'Enter the new department name:'
    }
  ]).then(({ name }) => {
    pool.query('INSERT INTO department (name) VALUES ($1)', [name], (err) => {
      if (err) throw err;
      console.log(`Added department: ${name}`);
      mainMenu();
    });
  });
};

// Adding a role
const addRole = () => {
  inquirer.prompt([
    { name: 'title', message: 'Enter the new role title:' },
    { name: 'salary', message: 'Enter the role salary:' },
    { name: 'department_id', message: 'Enter the department id for this role:' }
  ]).then(({ title, salary, department_id }) => {
    pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
      [title, salary, department_id], (err) => {
        if (err) throw err;
        console.log(`Added role: ${title}`);
        mainMenu();
      });
  });
};

// Adding an employee
const addEmployee = () => {
  inquirer.prompt([
    { name: 'first_name', message: 'Enter the employee first name:' },
    { name: 'last_name', message: 'Enter the employee last name:' },
    { name: 'role_id', message: 'Enter the role id for this employee:' },
    { name: 'manager_id', message: 'Enter the manager id (leave blank if none):' }
  ]).then(({ first_name, last_name, role_id, manager_id }) => {
    pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
      [first_name, last_name, role_id, manager_id || null], (err) => {
        if (err) throw err;
        console.log(`Added employee: ${first_name} ${last_name}`);
        mainMenu();
      });
  });
};

// Updating an employee role
const updateEmployeeRole = () => {
  pool.query('SELECT * FROM employee', (err, employees) => {
    if (err) throw err;

    const employeeChoices = employees.rows.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee to update:',
        choices: employeeChoices
      },
      {
        name: 'role_id',
        message: 'Enter the new role id for the employee:'
      }
    ]).then(({ employee_id, role_id }) => {
      pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id], (err) => {
        if (err) throw err;
        console.log('Updated employee role');
        mainMenu();
      });
    });
  });
};

export { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };