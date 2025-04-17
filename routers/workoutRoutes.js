const express = require('express');
const router = express.Router(); // ✅ DEFINE THIS FIRST

const {
    getUserHistory,
    updateUserProfile,
    addFavoriteWorkout,
    getFavoriteWorkouts
  } = require('../controller/profileController');

  // Add to favorites
  router.post('/:userId/favorites', addFavoriteWorkout);
  
  // Get all favorites
  router.get('/:userId/favorites', getFavoriteWorkouts);
  
  
    // Add to favorites
    router.post('/:userId/favorites', addFavoriteWorkout);

    // Get all favorites
    router.get('/:userId/favorites', getFavoriteWorkouts);

module.exports = router;
