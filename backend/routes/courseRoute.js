const express = require('express');
const courses = require("../controllers/courseController.js");
const router = express.Router();


// Register a new student
router.post('/courses', courses.registerCourse);

module.exports = router;