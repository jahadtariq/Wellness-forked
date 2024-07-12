const express = require('express');
const helmet = require('helmet')
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

// Routes import Statements
const { ExcersiceRouter } = require('./Routes/ExcerciseRouter');
const { HydrationRouter } = require('./Routes/HydrationRouter');
const { MedicationRouter } = require('./Routes/MedicationRouter');
const { SmokingRouter } = require('./Routes/SmokingRouter');
const { UserRouter } = require('./Routes/UserRouter');
const { WorkoutRouter } = require('./Routes/WorkoutRouter');

//Establishing connection with the database
const { connectToDatabase } = require('./controllers/connections');
connectToDatabase()

//Express App Configurations
const app = express();
const PORT = process.env.PORT || 5000;
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))


// Routes
app.use(ExcersiceRouter)
app.use(HydrationRouter)
app.use(MedicationRouter)
app.use(SmokingRouter)
app.use(UserRouter)
app.use(WorkoutRouter)

//Importing Controllers

// User API's
app.post('/user/post', newUser);

// Medication API's
app.post('/api/medication/post', newMeds);
app.get("/api/medication/get/:userId", getMeds);

// Hydration API's
// app.post('/api/hydration/post', newHydration);
app.post('/api/hydration/:id', updateHydration);
app.get('/api/hydration/:id', getHydration);
app.post('/api/preferences/:id', updatePreferences);

// Smoking API's
app.put('/api/smoking/:id', smokingApi)

//Workout
app.post('/api/schedule/workout/:userId', scheduleWorkout)
app.put('/api/schedule/workout/:id/completion', workoutCompletion)
//Get all workouts marked as scheduled
app.get('/api/schedule/workout/:userId', getWorkouts)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
