const express = require('express');
const router = express.Router();
const { getDailyLeaderboard } = require('../controller/leaderboardController');

router.get('/daily', getDailyLeaderboard); // GET /api/leaderboard/daily

module.exports = router;
