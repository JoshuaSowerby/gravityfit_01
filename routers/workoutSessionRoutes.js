const express = require('express');
const router = express.Router();
const { startSession, endSession, getWorkoutSessions, postWorkoutSession } = require('../controller/workoutSessionController');
const { verifyToken } = require('../middleware/authMiddleware');


router.post('/start', verifyToken, startSession);  // POST /api/session/start
router.post('/end', verifyToken, endSession);      // POST /api/session/end
router.get('/', verifyToken, getWorkoutSessions);  // POST /api/session
router.post('/', verifyToken, postWorkoutSession);  // POST /api/session

module.exports = router;
