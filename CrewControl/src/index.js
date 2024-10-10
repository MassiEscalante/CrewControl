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

// TODO: Create an async function for handling the main menu prompts
// This function will prompt the user for different actions
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
    // TODO: Based on the user's choice, call the appropriate function to interact with the database
    switch (action) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        // Exit the process when the user chooses to quit
        process.exit();
        break;
      default:
        // If no valid action is selected, return to the main menu
        mainMenu();
    }
  })
  .catch(err => {
    console.error(err);
  });
};

// TODO: Call the mainMenu function to initiate the app
mainMenu();