const express = require('express')
const SleepRouter = express.Router()

const {updateSleep} = require("../controllers/Sleep/updateSleep");

SleepRouter.post('/api/sleep/:userId', updateSleep);

module.exports = { SleepRouter }