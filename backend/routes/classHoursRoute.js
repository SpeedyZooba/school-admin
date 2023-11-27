const express = require('express');
const classHours = require("../controllers/classHoursController.js");
const router = express.Router();


// Register a new classroom
router.post('/classHours', classHours.registerClassHours);

// find all
router.get('/classHours', classHours.getClassHours);

// delete
router.post('/classHoursDelete', classHours.deleteClassHours);

// update
router.post('/classHoursUpdate', classHours.updateClassHours);

module.exports = router;