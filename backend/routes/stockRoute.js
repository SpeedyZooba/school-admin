const express = require('express');
const stocks = require('../controllers/stockController');
const router = express.Router();

//Register a new stock
router.post('/stocks', stocks.registerStock);

// Get all stocks
router.get('/stocks', stocks.getAllStock);

module.exports = router;