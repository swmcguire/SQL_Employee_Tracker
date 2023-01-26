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