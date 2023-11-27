const express = require('express');
const stocks = require('../controllers/stockController');
const router = express.Router();

//Register a new stock
router.post('/stocks', stocks.registerStock);

module.exports = router;

