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
const { ActivityRouter } = require('./Routes/ActivityRoutes');
const { SleepRouter } =  require("./Routes/SleepRouter");

//Establishing connection with the database
const { connectToDatabase } = require('./controllers/connections');
connectToDatabase()

//Express App Configurations
const app = express();
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))


// Routes
app.use(ExcersiceRouter)
app.use(HydrationRouter)
app.use(MedicationRouter)
app.use(SmokingRouter)
app.use(UserRouter)
app.use(WorkoutRouter)
app.use(ActivityRouter)
app.use(SleepRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
