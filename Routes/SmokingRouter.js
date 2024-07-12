const express = require('express')
const SmokingRouter = express.Router()

// Controllers
const { smokingApi } = require('../controllers/Smoking/smokingapi')

// Smoking Routes
SmokingRouter.put('/api/smoking/:id', smokingApi)

module.exports = { SmokingRouter }