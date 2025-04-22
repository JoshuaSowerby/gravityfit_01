const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { getRemote, sendLocal } = require('../controller/syncController');
const router = express.Router();

router.post('/remote/:tablename', verifyToken, getRemote);
router.post('/local/:tablename', verifyToken, sendLocal);

module.exports = router;
