const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const GeneralExpense = models.general_expense;

async function createGeneralExpense(generalExpenseData){
    try{
        const generalExpense = await GeneralExpense.create(generalExpenseData);
        return generalExpense;
    }
    catch (error)
    {
        console.error("Something went wrong with student creation.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports=
{
    createGeneralExpense
}