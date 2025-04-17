
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  description: { type: String, default: '' },
  muscleGroup: { type: String, default: '' }
});

module.exports = mongoose.model('Workout', workoutSchema);
