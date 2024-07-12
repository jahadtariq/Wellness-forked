const express = require('express')
const HydrationRouter = express.Router()

// Hydration Controllers
const { updateHydration } = require('../controllers/Hydration/updateHydration')
const { getHydration } = require('../controllers/Hydration/getHydration')
const { updatePreferences } = require('../controllers/Hydration/updatePreferences')

// Hydration Routes
HydrationRouter.post('/api/hydration/:id', updateHydration);
HydrationRouter.get('/api/hydration/:id', getHydration);
HydrationRouter.post('/api/preferences/:id', updatePreferences);

module.exports = { HydrationRouter }