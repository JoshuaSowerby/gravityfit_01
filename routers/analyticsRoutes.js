const express = require('express');
const router = express.Router();
const { getWorkoutAnalytics } = require('../controller/analyticsController');

router.get('/:userId', getWorkoutAnalytics);

module.exports = router;
