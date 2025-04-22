const express = require('express');
const router = express.Router(); 
const { verifyToken } = require('../middleware/authMiddleware');


const {
  getUserHistory,
  updateUserProfile,
  addFavoriteWorkout,
  getFavoriteWorkouts,
  removeFavoriteWorkout,
  getProfile
} = require('../controller/profileController');

// 📥 Update profile
router.put('/', verifyToken, updateUserProfile);

// 📊 Get user workout history
router.get('/history', verifyToken, getUserHistory);

// ⭐ Add to favorites
router.post('/favorites', verifyToken, addFavoriteWorkout);

// ⭐ Get favorites
router.get('/favorites', verifyToken, getFavoriteWorkouts);

// DELETE Favorites
router.delete('/favorites/:workoutId', verifyToken, removeFavoriteWorkout);

router.get('/', verifyToken, getProfile)

module.exports = router; // ✅ Export the router
