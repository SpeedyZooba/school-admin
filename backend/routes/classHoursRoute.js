const express = require('express');
const classHours = require("../controllers/classHoursController.js");
const router = express.Router();


// Register a new classroom
router.post('/classHours', classHours.registerClassHours);

module.exports = router;