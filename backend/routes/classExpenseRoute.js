const express = require('express');
const classExpense = require("../controllers/classExpenseController.js");
const router = express.Router();


// Register a new classexpense
router.post('/classExpense', classExpense.registerClassExpense);

module.exports = router;