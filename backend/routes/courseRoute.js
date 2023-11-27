const express = require('express');
const courses = require("../controllers/courseController.js");
const router = express.Router();


// Register a new course
router.post('/courses', courses.registerCourse);

// Delete a course
router.delete('/courses', courses.deleteCourse);

module.exports = router;