const express = require('express');
const classhour = require("../controllers/classController.js");
const router = express.Router();

router.post('/schedule', classhour.createSchedule);

router.get('/schedule/class', classhour.getClassSchedule);

router.get('/schedule/student', classhour.getStudentSchedule);

router.get('/schedule/teacher', classhour.getTeacherSchedule);

module.exports = router;