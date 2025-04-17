const express = require('express');
const router = express.Router();
const { receiveSensorData } = require('../controller/sensorController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/data', receiveSensorData);

module.exports = router;
