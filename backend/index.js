const express = require("express");
const cors = require("cors");
const app = express();

const parentRoutes = require('./routes/parentRoute.js');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use('/', parentRoutes);


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const mysql = require('mysql2');
 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Borano98',
  database: 'project'
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