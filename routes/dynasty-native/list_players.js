const express = require('express');
const router = express.Router();

// Import Controllers
const { getPlayerList, getAllPlayers } = require('../../controllers/dynasty-native/list_players');

// Google Sheets Config
const { authorizeQuery } = require('../../config/sheets_authorize');

router.route('/:league_format').get(authorizeQuery, getPlayerList);
router.route('/get_players/all').get(authorizeQuery, getAllPlayers);

module.exports = router;
