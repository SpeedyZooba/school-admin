const express = require('express');
const generalExpenses = require("../controllers/generalExpenseController.js");
const router = express.Router();

router.post('/generalExpenses', generalExpenses.registerGeneralExpense);

router.get('/generalExpenses', generalExpenses.getAllGeneralExpenses);

module.exports = router;