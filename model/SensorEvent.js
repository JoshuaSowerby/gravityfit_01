const mongoose = require('mongoose');

const sensorEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String, 
  exerciseId: String,
  motion: {
    left: Number,
    middle: Number,
    right: Number,
    leftStretch: Number,
    rightStretch: Number
  },
  totalMotion: Number,
  isRep: Boolean,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorEvent', sensorEventSchema);
