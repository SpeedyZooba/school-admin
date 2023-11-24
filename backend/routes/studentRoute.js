const express = require('express');
const students = require("../controllers/studentController.js");
const router = express.Router();


// Register a new student
router.post('/students', students.registerStudent);

module.exports = router;