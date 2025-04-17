const Workout = require('../model/Workout');

// GET /api/workouts - Get all workouts
exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Optional: POST /api/workouts - Add a new workout (dev/admin use only)
exports.createWorkout = async (req, res) => {
  const { name, difficulty, description, muscleGroup } = req.body;

  try {
    const workout = new Workout({ name, difficulty, description, muscleGroup });
    await workout.save();
    res.status(201).json({ message: 'Workout created', workout });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
