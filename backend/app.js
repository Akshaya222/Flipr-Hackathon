const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
require('./db/connection');
// const userRoutes = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(userRoutes);

// module.exports = app;
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server running at PORT ${port}`);
});
