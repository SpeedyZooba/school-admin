const classExpenseService = require("../services/classExpenseService.js");

async function registerClassExpense(req, res) {
    try {
        const { SectionId, CourseId, ProductId, ExpenseDate, Amount } = req.body;
        const classExpense = await classExpenseService.createClassExpense({ SectionId, CourseId, ProductId, ExpenseDate, Amount });
        res.status(201).json(classExpense);
    }
    catch (error) {
        console.error("An error occurred while registering the classExpense.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { registerClassExpense }