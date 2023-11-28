const express = require('express');
const staff = require("../controllers/staffController.js");
const router = express.Router();

router.post('/staff', staff.registerStaffMember);
router.delete('/staff', staff.deleteStaffMember);
router.get('/staff', staff.getAllStaff);

module.exports = router;