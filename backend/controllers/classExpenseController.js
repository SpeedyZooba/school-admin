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

async function getClassExpenses(req, res) {
    try {
        const classExpense = await classExpenseService.findAllClassExpense();
        res.status(200).json(classExpense);
    }
    catch (error) {
        console.error("An error occurred while getting the classExpense.", error);
        res.status(500).json({ error: error.message });
    }
}

async function deleteClassExpenses(req, res) {
    try {
        const { SectionId, CourseId, ProductId } = req.body;
        const classExpense = await classExpenseService.deleteClassExpense({ SectionId, CourseId, ProductId });
        res.status(200).json(classExpense);
    }
    catch (error) {
        console.error("An error occurred while deleting the classExpense.", error);
        res.status(500).json({ error: error.message });
    }
}

async function updateClassExpenses(req, res) {
    try {
        const { SectionIdOld, CourseIdOld, ProductIdOld, ExpenseDateOld, AmountOld, SectionIdNew, CourseIdNew, ProductIdNew, ExpenseDateNew, AmountNew } = req.body;
        const classExpense = await classExpenseService.updateClassExpense({ SectionIdOld, CourseIdOld, ProductIdOld, ExpenseDateOld, AmountOld }, { SectionIdNew, CourseIdNew, ProductIdNew, ExpenseDateNew, AmountNew });
        res.status(200).json(classExpense);
    }
    catch (error) {
        console.error("An error occurred while updatating the classExpense.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    registerClassExpense,
    getClassExpenses,
    deleteClassExpenses,
    updateClassExpenses
}