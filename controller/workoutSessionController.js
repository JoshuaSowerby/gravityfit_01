const WorkoutSession = require('../model/WorkoutSession');
const SensorEvent = require('../model/SensorEvent');

/**
 * Starts a new workout session
 * @route POST /api/session/start
 * @body { userId, exerciseId, difficulty }
 */
exports.startSession = async (req, res) => {
  const { userId, exerciseId, difficulty = 'medium' } = req.body;

  try {
    const session = new WorkoutSession({
      userId,
      exerciseId,
      difficulty
    });

    await session.save();

    res.status(201).json({
      message: 'Workout session started',
      sessionId: session._id,
      difficulty,
      startTime: session.startTime
    });
  } catch (error) {
    console.error('[Start Session Error]', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Ends a workout session, calculates total reps, score, and awards badge
 * @route POST /api/session/end
 * @body { sessionId }
 */
exports.endSession = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await WorkoutSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    const endTime = new Date();

    // 1. Get all valid sensor events for this session
    const events = await SensorEvent.find({
      userId: session.userId,
      exerciseId: session.exerciseId,
      isRep: true,
      timestamp: { $gte: session.startTime, $lte: endTime }
    });

    const totalReps = events.length;

    // 2. Score multiplier based on difficulty
    const difficultyFactor = {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    };
    const factor = difficultyFactor[session.difficulty] || 1.0;

    // 3. Calculate total score using motion magnitude
    const totalScore = events.reduce((sum, event) => {
      const { x, y, z } = event.motion;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      let baseScore = 0;
      if (magnitude >= 14) baseScore = 3;
      else if (magnitude >= 12) baseScore = 2;
      else baseScore = 1;

      return sum + (baseScore * factor);
    }, 0);

    // 4. Badge logic
    let badge = null;
    if (session.difficulty === 'hard' && totalScore >= 30) {
      badge = '🔥 Iron Warrior';
    } else if (session.difficulty === 'medium' && totalScore >= 40) {
      badge = '💪 Consistency Champ';
    } else if (session.difficulty === 'easy' && totalReps >= 20) {
      badge = '🏃 Hustler Beginner';
    }

    // 5. Save session
    session.endTime = endTime;
    session.totalReps = totalReps;
    session.totalScore = Math.round(totalScore);
    await session.save();

    res.json({
      message: 'Workout session ended',
      sessionId: session._id,
      durationInMin: Math.round((endTime - session.startTime) / 60000),
      totalReps,
      totalScore: session.totalScore,
      badgeEarned: badge
    });
  } catch (error) {
    console.error('[End Session Error]', error);
    res.status(500).json({ error: error.message });
  }
};
