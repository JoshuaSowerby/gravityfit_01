________________________________________
📂 FOLDER + FILE STRUCTURE 
________________________________________
📁 config/
•	db.js: Connects to MongoDB using mongoose. Called in app.js to initialize the database.
________________________________________
📁 controller/
Handles core business logic for each route.

File -> Purpose

authController.js -> Manages registration and login. Generates JWT tokens.

profileController.js -> Updates profile (bio, age, imageUrl), manages favorites, gets workout history.

sensorController.js -> Receives real-time sensor data, evaluates form, gives feedback, and tracks reps.

workoutController.js -> Handles workout CRUD (create/list/edit workouts).

workoutSessionController.js -> Starts and ends workout sessions. Tracks reps, time, score.

leaderboardController.js -> Calculates and returns top users by daily score.

analyticsController.js -> Returns analytics for user (daily/weekly/monthly totals, averages).

homeController.js -> Currently minimal or placeholder – could manage GravityFit score overview.
________________________________________
📁 middleware/
•	authMiddleware.js: Verifies JWT token before allowing access to protected routes.
________________________________________
📁 mock/
•	mockWorkoutSessions.js: Contains pre-filled workout session data to simulate real usage (used with mock API).
________________________________________
📁 model/
Mongoose schemas for MongoDB collections.

Model -> Purpose

User.js -> Stores username, email, hashed password, gravityScore, bestScore, streak, favorites.

Profile.js -> Stores user’s extended info: age, bio, imageUrl.

Workout.js -> List of all workouts (Push-up, Squats, etc.). Includes difficulty and muscle group.

WorkoutSession.js -> Tracks each session with total score, reps, start and end time.

SensorEvent.js -> Logs every rep/movement, motion values, feedback score, correctness.
________________________________________
📁 routers/
Links HTTP routes to controller logic.

Route File -> Purpose

authRoutes.js -> /api/auth/ – Register and login routes.

profileRoutes.js	-> /api/profile/ – Profile, favorites, and history routes.

sensorRoutes.js	-> /api/sensor/ – Accepts sensor data and returns real-time feedback.

sessionRoutes.js	-> /api/session/ – Starts, ends sessions, mock endpoint for seeding.

workoutRoutes.js	-> /api/workouts/ – View, add, and manage workouts.

workoutSessionRoutes.js	-> Groups session logic separately.

leaderboardRoutes.js	-> /api/leaderboard/ – Returns top scores.

analyticsRoutes.js	-> /api/analytics/ – Summary of workout performance over time.

homeRoutes.js	-> Reserved for home dashboard summary.
________________________________________
📁 services/

File	-> Role
sensorFeedbackService.js -> Core engine that evaluates sensor input and returns form feedback + score.

scoreService.js	-> Calculates GravityFit score per rep (e.g. based on reps, difficulty, accuracy).

scheduler.js	-> (Planned) Could be used for daily reset tasks (e.g. leaderboard).
________________________________________
📄 Other Files
•	.env: Stores sensitive info like MONGODB_URI, JWT_SECRET

•	app.js: Main entry point that connects Express, DB, routes

•	index.js: Could also be app launcher

•	seedWorkouts.js: Seeds your database with a full set of workout types (easy → hard)
________________________________________
🔁 SYSTEM FLOW OVERVIEW (Back to Frontend)

[Login/Register]
     
      ↓
      
  [User Dashboard]
      
      ↓
      
[Choose Workout]
    
      ↓
      
[Start Session] → POST /api/session/start
     
      ↓

[Sensor Sends Data] → POST /api/sensor/data

      ↓

[Feedback Returned] ← (bend your elbow, nice rep)

      ↓

[Finish Workout] → POST /api/session/end
   
      ↓

[Profile Updates] ← gravityScore, bestScore, streak

      ↓

[Dashboard Charts] ← GET /api/analytics/:userId?range=weekly
________________________________________
🧠this backend system is capable of:

✅ Authenticating users


✅ Managing profiles & favorite workouts

✅ Recording workout sessions

✅ Analyzing sensor input

✅ Giving real-time feedback

✅ Visualizing performance dashboards

✅ Ranking users on leaderboards
________________________________________





