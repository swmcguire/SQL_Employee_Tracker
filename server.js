const cTable = require('console.table');
const inquirer = require('inquirer');
const express = require('express');
const mysql = require ('mysql2');

const PORT = process.env.PORT || 3001;

const app = express();

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

'View all departments', 
'View all roles',
'View all employees',
'Add a department', 
'Add a role',
'Add an employee',
'Update an employee role'



//---------- CREATE QUERIES TO RETURN DATA ----------//

//--------VIEW ALL DEPTS
//----SELECT * FROM department

//--------VIEW ALL ROLES
//----SELECT r.id, r.title, d.name, r.salary FROM role r
//    INNER JOIN department d on r.department_id = d.id

//--------VIEW ALL EMPLOYEES
//-----SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary,e.manager_id
//       FROM employee e
//     INNER JOIN role r on e.role_id = r.id
//     INNER JOIN department d on d.id = r.department_id


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