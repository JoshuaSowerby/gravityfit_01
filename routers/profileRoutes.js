const express = require('express');
const router = express.Router(); 
const { verifyToken } = require('../middleware/authMiddleware');


const {
  getUserHistory,
  updateUserProfile,
  addFavoriteWorkout,
  getFavoriteWorkouts,
  removeFavoriteWorkout
} = require('../controller/profileController');

// 📥 Update profile
router.put('/:userId', updateUserProfile);

// 📊 Get user workout history
router.get('/:userId/history', getUserHistory);

// ⭐ Add to favorites
router.post('/:userId/favorites', addFavoriteWorkout);

// ⭐ Get favorites
router.get('/:userId/favorites', getFavoriteWorkouts);

// DELETE Favorites
router.delete('/:userId/favorites/:workoutId', removeFavoriteWorkout);

module.exports = router; // ✅ Export the router
