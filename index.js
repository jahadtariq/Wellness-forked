const express = require('express');

// const cron = require('node-cron');

const { connectToDatabase } = require('./controllers/connections');

const bodyParser = require('body-parser');

const { updateHydration } = require('./controllers/Hydration/updateHydration');

const { newMeds } = require('./controllers/Medication/newMeds');
const { getMeds } = require('./controllers/Medication/getMeds');

const { newUser } =  require('./controllers/User/newUser');

const { getSmoking, updateSmoking, newSmoking } = require('./controllers/Smoking/Smoking');

const app = express();

const PORT = process.env.PORT || 3000;

connectToDatabase()

app.use(bodyParser.urlencoded({ extended: true }))

// User API's
app.post('/user/post', newUser);

// Medication API's
app.post('/api/medication/post', newMeds);
app.get("/api/medication/get/:userId", getMeds);

// Hydration API's
app.post('/api/hydration/post', newHydration);
app.put('/api/panipi/:id', updateHydration);

// Smoking API's
app.post('',)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
