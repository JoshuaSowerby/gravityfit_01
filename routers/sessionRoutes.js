const express = require('express');
const router = express.Router();

const WorkoutSession = require('../model/WorkoutSession');
const mockSessions = require('../mock/mockWorkoutSessions');

// Existing routes here (start, end, etc.)

// ✅ MOCK DATA SEEDING ROUTE
router.post('/mock', async (req, res) => {
  try {
    await WorkoutSession.insertMany(mockSessions);
    res.json({ message: 'Mock sessions inserted ✅' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
