const express = require('express');
const generalExpenses = require("../controllers/generalExpenseController.js");
const router = express.Router();

router.post('/generalExpenses', generalExpenses.registerGeneralExpense);

module.exports = router;