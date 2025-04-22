const WorkoutSession = require('../model/WorkoutSession');
const mongoose = require('mongoose');

// 🧠 Helper: Get start date for the time range
const getStartDate = (range) => {
    const now = new Date();
  
    if (range === 'daily') {
      now.setHours(0, 0, 0, 0);
    } else if (range === 'weekly') {
      now.setDate(now.getDate() - 7);
      now.setHours(0, 0, 0, 0);
    } else if (range === 'monthly') {
      now.setDate(now.getDate() - 30); // ✅ Change from start-of-month to last 30 days
      now.setHours(0, 0, 0, 0);
    }
  
    return now;
  };
  

// 📊 GET /api/analytics/?range=daily|weekly|monthly
exports.getWorkoutAnalytics = async (req, res) => {
  const userId = req.user.userId;
  const { range } = req.query;

  if (!['daily', 'weekly', 'monthly'].includes(range)) {
    return res.status(400).json({ message: 'Invalid range. Use daily, weekly or monthly.' });
  }

  try {
    const startDate = getStartDate(range);

    const sessions = await WorkoutSession.find({
      userId: new mongoose.Types.ObjectId(userId),
      startTime: { $gte: startDate }
    }).sort({ startTime: -1 });

    const totalSessions = sessions.length;
    const totalReps = sessions.reduce((sum, s) => sum + s.totalReps, 0);
    const totalScore = sessions.reduce((sum, s) => sum + s.totalScore, 0);

    const averageReps = totalSessions > 0 ? (totalReps / totalSessions).toFixed(1) : 0;
    const averageScore = totalSessions > 0 ? (totalScore / totalSessions).toFixed(1) : 0;

    res.status(200).json({
      range,
      totalSessions,
      totalReps,
      totalScore,
      averageReps,
      averageScore,
      recentSessions: sessions.map(s => ({
        exerciseId: s.exerciseId,
        startTime: s.startTime,
        endTime: s.endTime,
        totalReps: s.totalReps,
        totalScore: s.totalScore,
        difficulty: s.difficulty
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
