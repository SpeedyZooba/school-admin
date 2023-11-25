const express = require('express');
const staff = require("../controllers/staffController.js");
const router = express.Router();

router.post('/staff', staff.registerStaffMember);

module.exports = router;