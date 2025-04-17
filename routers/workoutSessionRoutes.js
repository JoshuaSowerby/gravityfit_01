const express = require('express');
const router = express.Router();
const { startSession, endSession } = require('../controller/workoutSessionController');


router.post('/start', startSession);  // POST /api/session/start
router.post('/end', endSession);      // POST /api/session/end

module.exports = router;
