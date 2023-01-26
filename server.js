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




//---------- CREATE QUERIES TO RETURN DATA ----------//

//--------VIEW ALL DEPTS

//--------VIEW ALL ROLES

//--------VIEW ALL EMPLOYEES
//-----JOIN ALL TABLES TOGETHER


//---------- CREATE QUERIES TO UPDATE TABLES ----------//

//--------ADD DEPARTMENT 
    //-----UPDATE TABLE DEPARTMENT


//--------ADD ROLE
    //-----UPDATE TABLE ROLES



//--------ADD EMPLOYEE 
    //-----UPDATE TABLE EMPLOYEE