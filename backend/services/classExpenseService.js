const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const ClassExpense = models.class_expense;


async function createClassExpense(data)
{
    try 
    {
        const classExpense = await ClassExpense.create(data);
        return classExpense;
    }
    catch (error)
    {
        console.error("Something went wrong with classExpense creation.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports = { createClassExpense }
