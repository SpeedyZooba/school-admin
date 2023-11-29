const express = require('express');
const classhour = require("../controllers/classController.js");
const router = express.Router();

router.post('/classhour', classhour.getFreeHoursForTeacher);

module.exports = router;