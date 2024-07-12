const express = require('express');
const helmet = require('helmet')
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
const Workout = require('./models/Workout');
const { Mixed } = require('./models/Mixed');

const app = express();

const PORT = process.env.PORT || 5000;

connectToDatabase()
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))


// GET random excercise length of limit.
app.get('/exercises/:limit', async (req, res) => {
    const limit = req.params.limit;
    const excersises = await Mixed.find({}).limit(limit)
    res.status(200).json({ data: excersises })

});

// GET searched results for specific body part
app.get('/exercises/bodyPart/:bodyPart/:limit', async (req, res) => {
    const bodyPart = req.params.bodyPart;
    const limit = req.params.limit;
    const excersises = await Mixed.find({ bodyPart: { $regex: "^" + bodyPart } }).limit(limit);
    res.status(200).json({ data: excersises })
});

// GET /exercises/equipment/:type
app.get('/exercises/equipment/:type/:limit', async (req, res) => {
    const equipmentType = req.params.type;
    const limit = req.params.limit;
    const excersises = await Mixed.find({ equipment: { $regex: "^" + equipmentType } }).limit(limit);
    res.status(200).json({ data: excersises })
});


// GET /exercises/name/:name
app.get('/exercises/name/:name/:limit', async (req, res) => {
    const exerciseName = req.params.name;
    const limit = req.params.limit;
    const excersises = await Mixed.find({ name: { $regex: "^" + exerciseName } }).limit(limit);
    res.status(200).json({ data: excersises })
});

// GET /exercises/target/:target
app.get('/exercises/target/:target/:limit', async (req, res) => {
    const target = req.params.target;
    const limit = req.params.limit;
    const excersises = await Mixed.find({ target: { $regex: "^" + target } }).limit(limit);
    res.status(200).json({ data: excersises })

});





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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
