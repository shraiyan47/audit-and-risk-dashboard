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
const IssueRoute = require('./routes/issueroutes'); 
const riskRoute = require('./routes/riskroutes');
const mitigationRoute = require('./routes/mitigationroutes');

const userRoute = require('./routes/userroutes');
mongoose.set("strictQuery", false);

// Connect MongoDB
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("DB Conn Succ"))
    .catch(err => console.log(err))


// app.use('/', DailyReport);
app.use('/', IssueRoute);
app.use('/', riskRoute);
app.use('/', mitigationRoute);
app.use('/', userRoute);

//add port and connect to server
app.listen(PORT,HOST, () => console.log("Server connected - office localhost ip : http://192.168.11.226:5000"));