/*module.exports = app => {
    const parents = require("../controllers/parentController.js");
  
    var router = require("express").Router();
  
    // Create a new student
    router.post("/parents", parents.registerParent);
  
    
    app.use('/parents', router);
  };
*/


const express = require('express');
const parents = require('../controllers/parentController.js');

const router = express.Router();

// Create a new parent
router.post('/parents', parents.registerParent);

router.get('/parents', parents.getAllParents);

module.exports = router;