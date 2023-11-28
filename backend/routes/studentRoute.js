const express = require('express');
const students = require("../controllers/studentController.js");
const router = express.Router();

router.post('/students', students.registerStudent);

router.get('/students', students.getAllStudent);

module.exports = router;