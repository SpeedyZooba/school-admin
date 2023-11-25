const express = require('express');
const classroom = require("../controllers/classroomController.js");
const router = express.Router();


// Register a new classroom
router.post('/classroom', classroom.registerClassroom);

module.exports = router;