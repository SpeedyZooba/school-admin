const express = require("express");
const cors = require("cors");
const dbConfig = require('./config.js');

const app = express();

const parentRoutes = require('../backend/routes/parentRoute.js');
const studentRoutes = require('../backend/routes/studentRoute.js');
const staffRoutes = require('../backend/routes/staffRoutes.js');
const classroomRoutes = require('../backend/routes/classroomRoute.js');
const classHoursRoutes = require('../backend/routes/classHoursRoute.js');
const classExpenseRoutes = require('../backend/routes/classExpenseRoute.js');
const courseRoutes = require('../backend/routes/courseRoute.js');
const generalExpenseRoutes = require('../backend/routes/generalExpenseRoute.js');
const stockRoutes = require('../backend/routes/stockRoute.js');
const classhourRoute = require('../backend/routes/classhourRoute.js');

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use('/', parentRoutes);
app.use('/', studentRoutes);
app.use('/', staffRoutes);
app.use('/', classroomRoutes);
app.use('/', classHoursRoutes);
app.use('/', classExpenseRoutes);
app.use('/', courseRoutes);
app.use('/', generalExpenseRoutes);
app.use('/', stockRoutes);
app.use('/', classhourRoute)

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const mysql = require('mysql2');
 
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
 
connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to MySQL database!');
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "School Administration" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});