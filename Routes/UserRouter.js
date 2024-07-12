const express = require('express');
const UserRouter = express.Router()
//Controllers
const { newUser } = require('../controllers/User/newUser');
const Users = require('../models/Users');

//Api for creating new user
UserRouter.post('/user/post', newUser);

//Api for getting all users
UserRouter.get('/users', async function (req, res) {
    const foundUsers = await Users.find({})
    res.status(200).json({ foundUsers })
})

module.exports = { UserRouter }