const express = require('express');
const router = express.Router();
const { getWorkoutAnalytics } = require('../controller/analyticsController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getWorkoutAnalytics);

module.exports = router;
