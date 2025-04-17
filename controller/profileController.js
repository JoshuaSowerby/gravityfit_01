const Profile = require('../model/Profile');
const WorkoutSession = require('../model/WorkoutSession');
const User = require('../model/User');
const Workout = require('../model/Workout');

/**
 * GET /api/profile/:userId/history
 * Returns workout session history and user stats
 */
exports.getUserHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const sessions = await WorkoutSession.find({ userId }).sort({ startTime: -1 });

    const totalSessions = sessions.length;
    const totalScore = sessions.reduce((sum, s) => sum + s.totalScore, 0);
    const totalReps = sessions.reduce((sum, s) => sum + s.totalReps, 0);
    const bestSession = sessions.reduce((max, s) => s.totalScore > max.totalScore ? s : max, sessions[0] || { totalScore: 0 });
    const averageReps = totalSessions > 0 ? (totalReps / totalSessions).toFixed(1) : 0;

    res.json({
      username: user.username,
      streak: user.streak,
      bestScore: user.bestScore,
      currentGravityScore: user.gravityScore,
      totalSessions,
      totalScore,
      totalReps,
      averageReps,
      bestSession: {
        score: bestSession.totalScore || 0,
        reps: bestSession.totalReps || 0,
        date: bestSession.startTime || null
      },
      sessionHistory: sessions.map(s => ({
        sessionId: s._id,
        exerciseId: s.exerciseId,
        startTime: s.startTime,
        endTime: s.endTime,
        totalReps: s.totalReps,
        totalScore: s.totalScore
      }))
    });
  } catch (error) {
    console.error('[User History Error]', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * PUT /api/profile/:userId
 * Updates bio, age, or profile image
 */
exports.updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { bio, age, imageUrl } = req.body;

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      { bio, age, imageUrl },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ⭐ Add workout to favorites
exports.addFavoriteWorkout = async (req, res) => {
  const { userId } = req.params;
  const { workoutId } = req.body;

  try {
    const user = await User.findById(userId);
    const workout = await Workout.findById(workoutId);

    if (!user || !workout) return res.status(404).json({ message: 'User or Workout not found' });

    if (!user.favorites.includes(workoutId)) {
      user.favorites.push(workoutId);
      await user.save();
    }

    res.json({ message: 'Workout added to favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📤 Get user's favorite workouts
exports.getFavoriteWorkouts = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Remove a workout from user's favorites
 * @route DELETE /api/profile/:userId/favorites/:workoutId
 */
exports.removeFavoriteWorkout = async (req, res) => {
  const { userId, workoutId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // // 🔐 Security check: user can only remove their own favorites
    // if (req.user.userId !== userId) {
    //   return res.status(403).json({ message: 'Unauthorized' });
    // }
    
    // Remove workoutId from favorites array
    user.favorites = user.favorites.filter(
      favId => favId.toString() !== workoutId
    );

    await user.save();

    res.json({ message: 'Workout removed from favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

