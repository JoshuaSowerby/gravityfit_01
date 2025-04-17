const User = require('../model/User');

/**
 * GET /api/leaderboard/daily
 * Returns daily leaderboard with only username and gravityScore
 */
exports.getDailyLeaderboard = async (req, res) => {
  try {
    // Fetch top 5 users by daily gravityScore
    const users = await User.find({})
      .select('username gravityScore')  // Only return required fields
      .sort({ gravityScore: -1 })       // Descending order
      .limit(5);                       // Top 5

    // Add rank numbers
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      gravityScore: user.gravityScore
    }));

    res.json({
      date: new Date().toLocaleDateString(),
      leaderboard
    });
  } catch (err) {
    console.error('[Leaderboard Error]', err);
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
};
