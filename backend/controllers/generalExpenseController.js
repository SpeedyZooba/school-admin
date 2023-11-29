const generalExpenseService = require("../services/generalExpenseService.js");

async function registerGeneralExpense(req, res) 
{
    try 
    {
        const { ExpenseId, ExpenseName, Amount, ExpenseDate } = req.body;
        const generalExpense = await generalExpenseService.createGeneralExpense({ ExpenseId, ExpenseName, Amount, ExpenseDate });
        res.status(201).json(generalExpense);
    }
    catch (error) 
    {
        console.error("An error occurred while registering the student.", error);
        res.status(500).json({ error: error.message });
    }
}

async function getAllGeneralExpenses(req, res)
{
    try
    {
        const generalExpenseList = await generalExpenseService.getAllGeneralExpenses();
        res.status(200).json(generalExpenseList);
    }
    catch (error)
    {
        console.error("An error occured while gathering the expense list.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports=
{
    registerGeneralExpense,
    getAllGeneralExpenses
}