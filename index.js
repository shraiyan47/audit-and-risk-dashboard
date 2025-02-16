const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//port
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

// import routes
// const DailyReport = require('./routes/dailyreportroutes');
const IssueRoute = require('./routes/issueroutes');
const planRoute = require('./routes/planroutes');
const riskRoute = require('./routes/riskroutes');

const monthlySheetRoute = require('./routes/monthlysheetroutes');
const incomePlanRoute = require('./routes/incomeplanroutes');
const incomeRoute = require('./routes/incomeroutes');
const expenseRoute = require('./routes/expenseroutes');
const expensePlanRoute = require('./routes/expenseplanroutes');
const userRoute = require('./routes/userroutes');
mongoose.set("strictQuery", false);

// Connect MongoDB
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("DB Conn Succ"))
    .catch(err => console.log(err))


// app.use('/', DailyReport);
app.use('/', IssueRoute);
app.use('/', planRoute);
app.use('/', riskRoute);


app.use('/', incomePlanRoute);
app.use('/', incomeRoute);
app.use('/', expenseRoute);
app.use('/', expensePlanRoute);
app.use('/', monthlySheetRoute);
app.use('/', userRoute);

//add port and connect to server
app.listen(PORT,HOST, () => console.log("Server connected - office localhost ip : http://192.168.11.226:5000"));