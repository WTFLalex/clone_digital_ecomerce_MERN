const express = require('express');
const app = express();
require('dotenv').config();
const path = require('node:path')

//init middleware: helmet, morgan, compression, express.json(), static, urlencoded
app.use(express.json());
app.use(express.urlencoded({extended: false, limit: '30mb'}));
app.use(express.static(path.join(__dirname, 'public')));

//init database
require('./database/mongodb.init')


//init routes

// app.use('', require('./routes/index'))
const initRoutes = require('./routes/index')
initRoutes(app)



//handling error
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next)=>{
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})


module.exports = app