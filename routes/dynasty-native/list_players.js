const express = require('express');
const router = express.Router();

// Import Controllers
const { getPlayerList } = require('../../controllers/dynasty-native/list_players');

// Google Sheets Config
const { authorizeQuery } = require('../../config/sheets_authorize');

router.route('/:league_format').get(authorizeQuery, getPlayerList);

module.exports = router;
