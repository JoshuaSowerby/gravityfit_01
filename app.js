const express = require('express');
const app = express();
const homeRoutes = require('./routers/homeRoutes');
const workoutRoutes = require('./routers/workoutRoutes.js');
// const profileRoutes = require('./routers/profileRoutes');
const sensorRoutes = require('./routers/sensorRoutes');
const authRoutes = require('./routers/authRoutes');
const leaderboardRoutes = require('./routers/leaderboardRoutes');
const sessionRoutes = require('./routers/workoutSessionRoutes');
const profileRoutes = require('./routers/profileRoutes');
const analyticsRoutes = require('./routers/analyticsRoutes');

const mocksessionRoutes = require('./routers/sessionRoutes'); //testing purpose only

app.use(express.json());

// Routes
app.use('/api/home', homeRoutes);
app.use('/api/workout', workoutRoutes);
// app.use('/api/profile', profileRoutes);
app.use('/api/sensor', sensorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/session', mocksessionRoutes); // ✅ Enable all session routes ** temporary


module.exports = app;
