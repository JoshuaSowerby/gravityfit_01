const User = require('../model/User');

exports.getHomeData = async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ gravityScore: -1 }).limit(5);
    res.json({
      gravityScore: 60, // static for now
      leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
