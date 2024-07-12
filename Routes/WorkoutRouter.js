const express = require('express')
const WorkoutRouter = express.Router()
// Controllers
const { scheduleWorkout } = require('../controllers/Workout/scheduleWorkout')
const { workoutCompletion } = require('../controllers/Workout/workoutCompletion')
const { getWorkouts } = require('../controllers/Workout/getWorkouts')

//Workout
WorkoutRouter.post('/api/schedule/workout/:userId', scheduleWorkout)
WorkoutRouter.put('/api/schedule/workout/:id/completion', workoutCompletion)
//Get all workouts marked as scheduled
WorkoutRouter.get('/api/schedule/workout/:userId', getWorkouts)

module.exports = { WorkoutRouter }