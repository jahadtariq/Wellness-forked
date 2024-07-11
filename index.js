const express = require('express');

// const cron = require('node-cron');

const { connectToDatabase } = require('./controllers/connections');

const bodyParser = require('body-parser');

const { updateHydration } = require('./controllers/Hydration/updateHydration');

const { newMeds } = require('./controllers/Medication/newMeds');
const { getMeds } = require('./controllers/Medication/getMeds');

const { newUser } = require('./controllers/User/newUser');

const { getSmoking, updateSmoking, newSmoking } = require('./controllers/Smoking/smokingapi');
const smokingApi = require('./controllers/Smoking/smokingapi');

const { updatePreferences } = require('./controllers/Hydration/updatePreferences');
const { getHydration } = require('./controllers/Hydration/getHydration');
const { scheduleWorkout } = require('./controllers/Workout/scheduleWorkout');
const { workoutCompletion } = require('./controllers/Workout/workoutCompletion');
const { getWorkouts } = require('./controllers/Workout/getWorkouts');

const app = express();

const PORT = process.env.PORT || 5000;

connectToDatabase()

app.use(bodyParser.urlencoded({ extended: true }))

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
//Post new wrokouts
app.post('/api/schedule/workout/:userId', scheduleWorkout)
//Update wrokouts if completed
app.put('/api/schedule/workout/:id/completion', workoutCompletion)
//Get all workouts marked as scheduled
app.get('/api/schedule/workout/:userId',getWorkouts)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
