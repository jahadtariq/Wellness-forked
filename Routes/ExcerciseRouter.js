const express = require('express');
const { Mixed } = require('../models/Mixed')
const ExcersiceRouter = express.Router();


// GET random excercise length of limit.
ExcersiceRouter.get('/exercises/:limit', async (req, res) => {
    const limit = req.params.limit;
    const excersises = await Mixed.find({}).limit(limit)
    res.status(200).json({ data: excersises })

});

// GET searched results for specific body part
ExcersiceRouter.get('/exercises/bodyPart/:bodyPart/:limit', async (req, res) => {
    const bodyPart = req.params.bodyPart;
    const limit = req.params.limit;
    const excersises = await Mixed.find({ bodyPart: { $regex: "^" + bodyPart } }).limit(limit);
    res.status(200).json({ data: excersises })
});

// GET /exercises/equipment/:type
ExcersiceRouter.get('/exercises/equipment/:type/:limit', async (req, res) => {
    const equipmentType = req.params.type;
    const limit = req.params.limit;
    const excersises = await Mixed.find({ equipment: { $regex: "^" + equipmentType } }).limit(limit);
    res.status(200).json({ data: excersises })
});


// GET /exercises/name/:name
ExcersiceRouter.get('/exercises/name/:name/:limit', async (req, res) => {
    const exerciseName = req.params.name;
    const limit = req.params.limit;
    const excersises = await Mixed.find({ name: { $regex: "^" + exerciseName } }).limit(limit);
    res.status(200).json({ data: excersises })
});

// GET /exercises/target/:target
ExcersiceRouter.get('/exercises/target/:target/:limit', async (req, res) => {
    const target = req.params.target;
    const limit = req.params.limit;
    const excersises = await Mixed.find({ target: { $regex: "^" + target } }).limit(limit);
    res.status(200).json({ data: excersises })

});


module.exports = { ExcersiceRouter }


