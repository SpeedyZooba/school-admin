const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const GeneralExpense = models.general_expense;

async function createGeneralExpense(generalExpenseData)
{
    try
    {
        const generalExpense = await GeneralExpense.create(generalExpenseData);
        return generalExpense;
    }
    catch (error)
    {
        console.error("Something went wrong with general expense creation.", error);
        throw new Error("Something went wrong.");
    }
}

async function getAllGeneralExpenses()
{
    try
    {
        const generalExpenses = await GeneralExpense.findAll();
        return generalExpenses;
    }
    catch (error)
    {
        console.error("Something went wrong while fetching general expenses.", error);
        throw new Error("Something went wrong while fetching the general expenses.");
    }
}

module.exports=
{
    createGeneralExpense,
    getAllGeneralExpenses
}