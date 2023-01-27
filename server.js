const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'abc123',
        database: 'cms_db'
    },

    console.log(`Connected to the cms_db`)
);

//---------- CREATE COMMAND PROMPTS ----------//
const action = [
    {
        type: "list",
        name: "action",
        message: "Please choose action below",
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit'
        ]
    },
    //-------------------------------Add Department Prompt
    {
        type: "input",
        name: "newDept",
        message: "What is the new department?",
        when: (answers) => {
            if (answers.action === 'Add a department') {
                return true;
            };
        },
    },
    //-------------------------------Add Role Prompt
    {
        type: "input",
        name: "newTitle",
        message: "What is the new title?",
        when: (answers) => {
            if (answers.action === 'Add a role') {
                return true;
            };
        },
    },
    {
        type: "input",
        name: "newSalary",
        message: "What is the new salary?",
        when: (answers) => {
            if (answers.action === 'Add a role') {
                return true;
            };
        },
    },
    {
        type: "input",
        name: "newDeptId",
        message: "What department is this role in?",
        when: (answers) => {
            if (answers.action === 'Add a role') {
                return true;
            };
        },
    },
    //-------------------------------Add Employee Prompt
    {
        type: "input",
        name: "newFirst",
        message: "What is the new employee's first name?",
        when: (answers) => {
            if (answers.action === 'Add an employee') {
                return true;
            };
        },
    },
    {
        type: "input",
        name: "newLast",
        message: "What is the new employee's last name?",
        when: (answers) => {
            if (answers.action === 'Add an employee') {
                return true;
            };
        },
    },
    {
        type: "input",
        name: "newRoleId",
        message: "What is the new employee's role id?",
        when: (answers) => {
            if (answers.action === 'Add an employee') {
                return true;
            };
        },
    },
    {
        type: "input",
        name: "newManagerId",
        message: "What is the new employee's manager id?",
        when: (answers) => {
            if (answers.action === 'Add an employee') {
                return true;
            };
        },
    },
    //-------------------------------Update Employee Prompt
    {
        type: "input",
        name: "userUpdate",
        message: "Which user do you want to update? Pick an id number",
        when: (answers) => {
            if (answers.action === 'Update an employee role') {
                return true;
            };
        },
    },
    {
        type: "input",
        name: "updateFirst",
        message: "What is the user's new first name?",
        when: (answers) => {
            if (answers.action === 'Update an employee role') {
                return true;
            };
        },
    },
    {
        type: "input",
        name: "updateLast",
        message: "What is the user's new last name?",
        when: (answers) => {
            if (answers.action === 'Update an employee role') {
                return true;
            };
        },
    },
    {
        type: "input",
        name: "updateRoleId",
        message: "What is the user's new role id?",
        when: (answers) => {
            if (answers.action === 'Update an employee role') {
                return true;
            };
        },
    },
    {
        type: "input",
        name: "updateManagerId",
        message: "What is the user's new Manager id?",
        when: (answers) => {
            if (answers.action === 'Update an employee role') {
                return true;
            };
        },
    },

];

//-------- CASE WHEN TO TELL THE PROGRAM WHICH FUNCTION TO RUN ------//

const mainMenu = () => {
inquirer.prompt(action).then((answers) => {
    //console.log(answers.newDept);
    switch (answers.action) {
        case 'View all departments':
            viewDept();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmps();
            break;
        case 'Add a department':
            const addDeptCont = addDept(answers);
            break;
        case 'Add a role':
            const addRoleCont = addRole(answers);
            break;
        case 'Add an employee':
            const addEmpCont = addEmp(answers);
            break;
        case 'Update an employee role':
            const updateEmpCont = updateEmp(answers);
            break;
        default:
            quit();
    }
}
);
};
//---------- CREATE QUERIES TO RETURN DATA ----------//

//--------VIEW ALL DEPTS
function viewDept() {
    db.query(`select id as 'Department ID', name as 'Department Name' from department ORDER by id;`, function (err, results) {
        console.table(results);
        mainMenu();
    });
};

//--------VIEW ALL ROLES
function viewRoles() {
    db.query(`SELECT r.id as 'Role Id' , r.title as 'Job Title', d.name as Department, r.salary as Salary FROM role r INNER JOIN department d on r.department_id = d.id ORDER by r.id;`, function (err, results) {
        console.table(results);
        mainMenu();
    });
};

//--------VIEW ALL EMPLOYEES
function viewEmps() {
    db.query(`select e.id as 'Employee Id', e.first_name as 'First Name', e.last_name as 'Last Name', r.title as 'Job Title', d.name as Department, r.salary as Salary, CONCAT(e2.first_name, " ", e2.last_name) as Manager FROM department d INNER JOIN role r on d.id = r.department_id INNER JOIN employee e on e.role_id = r.id LEFT JOIN employee e2 on e2.id = e.manager_id ORDER by e.id ;`, function (err, results) {
        console.table(results);
        mainMenu();
    });
};


//---------- CREATE QUERIES TO UPDATE TABLES ----------//

//--------ADD DEPARTMENT 

const addDept = ({ newDept }) => {
    db.query(`INSERT INTO department(name) VALUES('${newDept}');`, function (err, results) {
        console.table(`Department Added`);
        mainMenu();
    });
};

//--------ADD ROLE
const addRole = ({ newTitle, newSalary, newDeptId }) => {
    db.query(`INSERT INTO role(title,salary,department_id) VALUES('${newTitle}',${newSalary},${newDeptId});`, function (err, results) {
        console.table(`Roles Added`);
        mainMenu();
    }); 
};

//--------ADD EMPLOYEE 
const addEmp = ({ newFirst, newLast, newRoleId, newManagerId }) => {
    db.query(`INSERT INTO employee(first_name, last_name, role_id,manager_id) VALUES('${newFirst}','${newLast}',${newRoleId},${newManagerId});`, function (err, results) {
        console.table(`Employee Added`);
        mainMenu();
    }); 
};

//--------UPDATE EMPLOYEE 

const updateEmp = ({ userUpdate, updateFirst, updateLast, updateRoleId, updateManagerId }) => {
    db.query(`UPDATE employee SET first_name='${updateFirst}', last_name='${updateLast}', role_id=${updateRoleId}, manager_id=${updateManagerId}  WHERE id =${userUpdate});`, function (err, results) {
        console.table(`Employee Updated`);
        mainMenu();
    });
    
};

function quit() {
    process.exit();
}

mainMenu();