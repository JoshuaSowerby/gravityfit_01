const mongoose = require('mongoose');

const userId = new mongoose.Types.ObjectId("67f55d6cd049ec9d4a2f081a"); // Replace with your actual user ID

module.exports = [
  // Today
  {
    userId,
    exerciseId: "Push-Up",
    difficulty: "medium",
    startTime: new Date(),
    endTime: new Date(),
    totalReps: 20,
    totalScore: 50
  },
  {
    userId,
    exerciseId: "Jump Squats",
    difficulty: "hard",
    startTime: new Date(),
    endTime: new Date(),
    totalReps: 18,
    totalScore: 55
  },
  // Yesterday
  {
    userId,
    exerciseId: "Burpees",
    difficulty: "hard",
    startTime: new Date(Date.now() - 1 * 86400000),
    endTime: new Date(Date.now() - 1 * 86400000 + 600000),
    totalReps: 15,
    totalScore: 45
  },
  // 3 days ago
  {
    userId,
    exerciseId: "Plank Hold",
    difficulty: "hard",
    startTime: new Date(Date.now() - 3 * 86400000),
    endTime: new Date(Date.now() - 3 * 86400000 + 600000),
    totalReps: 10,
    totalScore: 30
  },
  // 7 days ago
  {
    userId,
    exerciseId: "Wall Push-Ups",
    difficulty: "easy",
    startTime: new Date(Date.now() - 7 * 86400000),
    endTime: new Date(Date.now() - 7 * 86400000 + 600000),
    totalReps: 25,
    totalScore: 35
  },
  // 12 days ago
  {
    userId,
    exerciseId: "Arm Circles",
    difficulty: "easy",
    startTime: new Date(Date.now() - 12 * 86400000),
    endTime: new Date(Date.now() - 12 * 86400000 + 600000),
    totalReps: 40,
    totalScore: 40
  },
  // 20 days ago
  {
    userId,
    exerciseId: "Step-Ups",
    difficulty: "medium",
    startTime: new Date(Date.now() - 20 * 86400000),
    endTime: new Date(Date.now() - 20 * 86400000 + 600000),
    totalReps: 12,
    totalScore: 28
  }
];
