import inquirer from 'inquirer'; 
import { 
  viewAllDepartments, 
  viewAllRoles, 
  viewAllEmployees, 
  addDepartment, 
  addRole, 
  addEmployee, 
  updateEmployeeRole 
} from './employeeQueries.js';


const mainMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ])
  .then(({ action }) => {
    
    switch (action) {
      case 'View all departments':
        viewAllDepartments(mainMenu); 
        break;
      case 'View all roles':
        viewAllRoles(mainMenu);
        break;
      case 'View all employees':
        viewAllEmployees(mainMenu);
        break;
      case 'Add a department':
        addDepartment(mainMenu);
        break;
      case 'Add a role':
        addRole(mainMenu);
        break;
      case 'Add an employee':
        addEmployee(mainMenu);
        break;
      case 'Update an employee role':
        updateEmployeeRole(mainMenu);
        break;
      case 'Exit':
        
        process.exit();
        break;
      default:
        
        mainMenu();
    }
  })
  .catch(err => {
    console.error('An error occurred:', err);
  });
};


mainMenu();