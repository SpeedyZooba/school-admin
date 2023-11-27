const express = require('express');
const classExpense = require("../controllers/classExpenseController.js");
const router = express.Router();


// Register a new classexpense
router.post('/classExpense', classExpense.registerClassExpense);

// find all
router.get('/classExpense', classExpense.getClassExpenses);

// delete
router.post('/classExpenseDelete', classExpense.deleteClassExpenses);

// update
router.post('/classExpenseUpdate', classExpense.updateClassExpenses);

module.exports = router;