const express = require('express');
const router = express.Router(); // ✅ DEFINE THIS FIRST


const { getAllWorkouts } = require('../controller/workoutController');
const { verifyToken } = require('../middleware/authMiddleware');


// Get all workouts
router.get('/workouts', getAllWorkouts);

module.exports = router;
