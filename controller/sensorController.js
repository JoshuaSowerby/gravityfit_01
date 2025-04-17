const SensorEvent = require('../model/SensorEvent');
const User = require('../model/User');
const { analyzeMotion } = require('../services/sensorFeedbackService'); // ✅ Import feedback analyzer

/**
 * Receives real-time sensor data (motion/stretch), updates user scores, gives feedback & stores event
 */
exports.receiveSensorData = async (req, res) => {
  const { userId, exerciseId, motion } = req.body;

  try {
    // 🧠 Use AI logic to analyze motion quality
    const { isCorrect, feedbackMessage, score } = analyzeMotion(motion, exerciseId);

    const totalMotion = (score / 5) * 100; // 5 = max score components
    const isRep = score > 0;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Save this motion event
    const newEvent = new SensorEvent({
      userId,
      username: user.username,
      exerciseId,
      motion,
      totalMotion,
      isRep,
      score
    });
    await newEvent.save();

    // 📈 Update user progress if it's a valid rep
    if (isRep) {
      user.gravityScore += score;

      if (user.gravityScore > user.bestScore) {
        user.bestScore = user.gravityScore;
      }

      const today = new Date();
      const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;

      if (!lastActive || isNewDay(today, lastActive)) {
        user.streak = isYesterday(today, lastActive) ? user.streak + 1 : 1;
      }

      user.lastActiveDate = today;
      await user.save();
    }

    // ✅ Return feedback to frontend
    res.status(200).json({
      success: true,
      feedback: feedbackMessage,
      isRep,
      score,
      totalMotion: totalMotion.toFixed(2),
      summary: {
        username: user.username,
        gravityScore: user.gravityScore,
        bestScore: user.bestScore,
        streak: user.streak
      }
    });
  } catch (err) {
    console.error('[SensorData Error]', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

function isNewDay(today, lastDate) {
  return today.toDateString() !== lastDate.toDateString();
}

function isYesterday(today, lastDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  const diff = today - lastDate;
  return diff >= oneDay && diff < oneDay * 2;
}
