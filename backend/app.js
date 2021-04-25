const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
require('./db/connection');
const userRoutes = require('./routes/user');
const excelRoute=require('./routes/excel-data');
const jsonRoute=require('./routes/json-data');
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(userRoutes);
app.use(excelRoute);
app.use(jsonRoute)

// module.exports = app;
const port = process.env.PORT || 3007;

app.listen(port, ()=>{
    console.log(`Server running at PORT ${port}`);
});
