const mongoose = require('mongoose');

const workoutSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  exerciseId: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }, 
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  totalReps: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 }
});

module.exports = mongoose.model('WorkoutSession', workoutSessionSchema);
