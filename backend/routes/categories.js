const express = require('express');
//change
const router = express.Router();

// Grab the controller functions
const { index, getByName } = require('../controllers/categories.js');

router.get('/', index);

router.get('/:name', getByName);

module.exports = router;
