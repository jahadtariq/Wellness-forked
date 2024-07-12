const express = require('express');
const Activity = require('../models/Activity');
const ActivityRouter = express.Router();

ActivityRouter.get('/api/activities/:id', async (req, res) => {
    try {
        const userActivity = await Activity.findOne({ userId: req.params.id })
        if (userActivity == {}) {
            res.json({ userActivity })
        } else {
            res.status(404).json({ message: 'No Activity Record Found For The User' })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

module.exports = { ActivityRouter }