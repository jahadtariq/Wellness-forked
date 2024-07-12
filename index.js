const express = require('express');

// const cron = require('node-cron');

const { connectToDatabase } = require('./controllers/connections');

const bodyParser = require('body-parser');

const { updateHydration } = require('./controllers/Hydration/updateHydration');

const { newMeds } = require('./controllers/Medication/newMeds');
const { getMeds } = require('./controllers/Medication/getMeds');

const { newUser } = require('./controllers/User/newUser');

const smokingApi = require('./controllers/Smoking/smokingapi');

const { updatePreferences } = require('./controllers/Hydration/updatePreferences');
const { getHydration } = require('./controllers/Hydration/getHydration');
const { scheduleWorkout } = require('./controllers/Workout/scheduleWorkout');
const { workoutCompletion } = require('./controllers/Workout/workoutCompletion');
const { getWorkouts } = require('./controllers/Workout/getWorkouts');
const { Mixed } = require('./models/Mixed');

const app = express();

const PORT = process.env.PORT || 5000;

connectToDatabase()

app.use(bodyParser.urlencoded({ extended: true }))

//middleware for ensuring connection to db



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
app.get('/api/schedule/workout/:userId', getWorkouts)



// GET /exercises
app.get('/exercises/:limit', async (req, res) => {
    const limit = req.params.limit;
    // Logic to fetch all exercises
});

// GET /exercises/bodyPart/:bodyPart
app.get('/exercises/bodyPart/:bodyPart/:limit', async (req, res) => {
    const bodyPart = req.params.bodyPart;
    const limit = req.params.limit;
    // Logic to fetch exercises for a specific body part
});

// GET /exercises/bodyPartList
app.get('/exercises/bodyPartList/:limit', async (req, res) => {
    const limit = req.params.limit;
    // Logic to fetch list of body parts available for exercises
});

// GET /exercises/equipment/:type
app.get('/exercises/equipment/:type/:limit', async (req, res) => {
    const equipmentType = req.params.type;
    const limit = req.params.limit;
    // Logic to fetch exercises based on equipment type
});

// GET /exercises/equipmentList
app.get('/exercises/equipmentList/:limit', async (req, res) => {
    const limit = req.params.limit;
    // Logic to fetch list of equipment available for exercises
});

// GET /exercises/exercise/:id
app.get('/exercises/exercise/:id/:limit', async (req, res) => {
    const exerciseId = req.params.id;
    const limit = req.params.limit;
    // Logic to fetch exercise details by ID
});

// GET /exercises/name/:name
app.get('/exercises/name/:name/:limit', async (req, res) => {
    const exerciseName = req.params.name;
    const limit = req.params.limit;
    // Logic to fetch exercise details by name
});

// GET /exercises/target/:target
app.get('/exercises/target/:target/:limit', async (req, res) => {
    const target = req.params.target;
    const limit = req.params.limit;
    // Logic to fetch exercises targeting a specific muscle or fitness goal
});

// GET /exercises/targetList
app.get('/exercises/targetList/:limit', async (req, res) => {
    const limit = req.params.limit;
    // Logic to fetch list of targets (muscle groups or fitness goals)
});

// Example of a custom route with parameters
// GET /api/apiName/exercise/:exerciseName/:limit
app.get('/api/apiName/exercise/:exerciseName/:limit', async (req, res) => {
    const exerciseName = req.params.exerciseName;
    const limit = req.params.limit;
    // Logic to fetch exercises by name with a limit
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
