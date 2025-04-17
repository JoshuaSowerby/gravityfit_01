const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  gravityScore: { type: Number, default: 0 },     // score for current session/day
  bestScore: { type: Number, default: 0 },        // highest score ever achieved
  streak: { type: Number, default: 0 },           // consecutive days with activity
  lastActiveDate: { type: Date, default: null },    // track activity date for streak
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }]

});


module.exports = mongoose.model('User', userSchema);
