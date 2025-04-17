const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Workout = require('./model/Workout');

dotenv.config(); // Load MONGODB_URI from .env

// Sample workout data
const workoutData = [
  // 🟢 Easy Workouts
  {
    name: "Neck Rolls",
    difficulty: "easy",
    description: "Improves neck mobility and reduces stiffness.",
    muscleGroup: "Neck"
  },
  {
    name: "Arm Circles",
    difficulty: "easy",
    description: "Great warm-up for shoulders and arms.",
    muscleGroup: "Shoulders"
  },
  {
    name: "Ankle Rotations",
    difficulty: "easy",
    description: "Improves ankle flexibility and balance.",
    muscleGroup: "Lower Body"
  },
  {
    name: "Wall Push-Ups",
    difficulty: "easy",
    description: "Beginner push-up variation for upper body activation.",
    muscleGroup: "Upper Body"
  },
  {
    name: "Stretch Left Arm",
    difficulty: "easy",
    description: "Gentle stretch for left arm and shoulder.",
    muscleGroup: "Arms"
  },

  // 🟡 Medium Workouts
  {
    name: "Push-Up",
    difficulty: "medium",
    description: "Strengthens chest and triceps.",
    muscleGroup: "Upper Body"
  },
  {
    name: "Squat",
    difficulty: "medium",
    description: "Targets thighs, hips, and glutes.",
    muscleGroup: "Lower Body"
  },
  {
    name: "Step-Ups",
    difficulty: "medium",
    description: "Improves lower body strength and cardio endurance.",
    muscleGroup: "Legs"
  },
  {
    name: "Standing Side Crunch",
    difficulty: "medium",
    description: "Works obliques and core while standing.",
    muscleGroup: "Core"
  },
  {
    name: "Stretch Right Arm",
    difficulty: "medium",
    description: "Mid-level shoulder and triceps stretch.",
    muscleGroup: "Arms"
  },

  // 🔴 Hard Workouts
  {
    name: "Burpees",
    difficulty: "hard",
    description: "Full-body cardio and strength movement.",
    muscleGroup: "Full Body"
  },
  {
    name: "Plank Hold",
    difficulty: "hard",
    description: "Challenges core and improves posture.",
    muscleGroup: "Core"
  },
  {
    name: "Jump Squats",
    difficulty: "hard",
    description: "Explosive leg and glute workout.",
    muscleGroup: "Lower Body"
  },
  {
    name: "Mountain Climbers",
    difficulty: "hard",
    description: "High-intensity core and cardio exercise.",
    muscleGroup: "Core"
  },
  {
    name: "One-Arm Push-Up",
    difficulty: "hard",
    description: "Advanced push-up variation focusing on strength and stability.",
    muscleGroup: "Upper Body"
  }
];

async function seedWorkouts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Workout.deleteMany(); // Optional: clear existing workouts
    await Workout.insertMany(workoutData);
    console.log('✅ Workouts seeded successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error seeding workouts:', error);
  }
}

seedWorkouts();
