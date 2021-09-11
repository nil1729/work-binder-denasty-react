const express = require('express');
const router = express.Router();

// Import Routes;
const rankingRoutes = require('./rankings');

router.use('/rankings', rankingRoutes);

module.exports = router;
