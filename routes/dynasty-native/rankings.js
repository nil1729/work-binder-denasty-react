const express = require('express');
const router = express.Router();

// Import Controllers
const { getRankings } = require('../../controllers/dynasty-native/rankings');

// Google Sheets Config
const { authorizeQuery } = require('../../config/sheets_authorize');

router.route('/:ranking_type').get(authorizeQuery, getRankings);

module.exports = router;
