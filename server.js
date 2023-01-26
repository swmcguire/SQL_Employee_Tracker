const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require ('mysql2');

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
        'Update an employee role'
    ],
},
];

inquirer.prompt(action).then((answers) => {
    console.log(answers.action);
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
            addDept();
            break;
        case'Add a role':
            addRole();
            break;
        case'Add an employee':
            addEmp();
            break;
        case'Update an employee role':
            updateEmp();
            break;
        default:    
            return `Please make a selection`;
    } 
}
);

//---------- CREATE QUERIES TO RETURN DATA ----------//

//--------VIEW ALL DEPTS
function viewDept() {
    db.query('select * from department;', function (err, results) {
    console.table(results);
});
};

//--------VIEW ALL ROLES
function viewRoles() {
    db.query('SELECT r.id, r.title, d.name, r.salary FROM role r INNER JOIN department d on r.department_id = d.id;', function (err, results) {
        console.table(results);
});
};


//--------VIEW ALL EMPLOYEES
function viewEmps(){
    db.query('select e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(e2.first_name, " ", e2.last_name) as manager FROM department d INNER JOIN role r on d.id = r.department_id INNER JOIN employee e on e.role_id = r.id LEFT JOIN employee e2 on e2.id = e.manager_id ;', function (err, results) {
        console.table(results);
});
};



//---------- CREATE QUERIES TO UPDATE TABLES ----------//

//--------ADD DEPARTMENT 
    //-----INSERT INTO department
    //     VALUES ('dept_name')


//--------ADD ROLE
    //-----INSERT INTO ROLE
    //     VALUES ('title','salary', 'dept_id')



//--------ADD EMPLOYEE 
    //-----INSERT INTO employee
    //     VALUES('first_name','last_name','role','manager')

//--------UPDATE EMPLOYEE 
    //-----UPDATE employee SET first_name = 'first_name', last_name='last_name, role='role',manager='manager' WHERE id = ''