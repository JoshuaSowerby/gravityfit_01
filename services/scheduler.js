const cron = require('node-cron');
const User = require('../model/User');

// Runs every day at midnight (00:00)
const startDailyResetTask = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('[Scheduler] Resetting daily GravityFit scores...');

    try {
      await User.updateMany({}, { gravityScore: 0 });
      console.log('[Scheduler] Daily scores reset to 0 for all users');
    } catch (error) {
      console.error('[Scheduler Error]', error.message);
    }
  });
};

module.exports = { startDailyResetTask };
