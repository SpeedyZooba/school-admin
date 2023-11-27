const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const Stock = models.stocks;

async function createStock(stockData)
{
    try 
    {
        const stock = await Stock.create(stockData);
        return stock;
    }
    catch (error)
    {
        console.error("Something went wrong with stock creation.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports=
{
    createStock
}