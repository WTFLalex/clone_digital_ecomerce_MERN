const express = require('express');
const app = express();
require('dotenv').config();
const path = require('node:path')

//init middleware: helmet, morgan, compression, express.json(), static, urlencoded
app.use(express.json());
app.use(express.urlencoded({extended: false, limit: '30mb'}));
app.use(express.static(path.join(__dirname, 'public')));

//init database


//init routes

app.get('/', (req, res)=>{
    res.send('home');
})

module.exports = app