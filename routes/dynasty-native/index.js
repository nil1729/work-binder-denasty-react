const express = require('express');
const router = express.Router();

// Import Routes;
const rankingRoutes = require('./rankings');

router.use('/rankings', rankingRoutes);
router.use('/list_players', require('./list_players'));

module.exports = router;
