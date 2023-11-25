const stockService = require('../services/stockService.js');

async function registerStock(req, res){
    try {
        const { ProductId, ProductName, Amount } = req.body;
        const stock = await stockService.createStock({ ProductId, ProductName, Amount });
        res.status(201).json(stock);
    } catch (error) {
        console.error("An error occurred while registering the stock.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports={
    registerStock
}