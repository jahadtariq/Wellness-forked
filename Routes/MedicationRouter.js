const express = require('express')
const MedicationRouter = express.Router()

//Controllers
const { newMeds } = require('../controllers/Medication/newMeds')
const { getMeds } = require('../controllers/Medication/getMeds')

// Medication API's
MedicationRouter.post('/api/medication/post', newMeds);
MedicationRouter.get("/api/medication/get/:userId", getMeds);

module.exports = { MedicationRouter }