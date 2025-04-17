const express = require('express');
const router = express.Router();
const { getHomeData } = require('../controller/homeController');

router.get('/', getHomeData);

module.exports = router;
