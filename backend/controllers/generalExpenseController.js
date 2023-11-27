const generalExpenseController = require("../services/generalExpenseService");

async function registerGeneralExpense(req, res) {
    try {
        const { ExpenseId, ExpenseName, Amount, ExpenseDate } = req.body;
        const generalExpense = await generalExpenseController.createGeneralExpense({ ExpenseId, ExpenseName, Amount, ExpenseDate });
        res.status(201).json(generalExpense);
    }
    catch (error) {
        console.error("An error occurred while registering the student.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports=
{
    registerGeneralExpense
}