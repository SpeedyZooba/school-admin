const express = require('express');
const classroom = require("../controllers/classroomController.js");
const router = express.Router();


// Register a new classroom
router.post('/classroom', classroom.registerClassroom);

// Find all classrooms
router.get('/classroom', classroom.getClassroom);

// Delete classroom with id
router.post('/classroomDelete', classroom.deleteClassroom);

// Update classroom
router.post('/classroomUpdate', classroom.updateClassroom);


module.exports = router;