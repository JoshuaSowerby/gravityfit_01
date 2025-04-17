const app = require('./app');
const connectDB = require('./config/db');
const { startDailyResetTask } = require('./services/scheduler');
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

startDailyResetTask(); // ⏱ Start daily reset
