const express = require('express');
const UserRouter = express.Router()
//Controllers
const { newUser } = require('../controllers/User/newUser');

//Api for creating new user
UserRouter.post('/user/post', newUser);

module.exports = { UserRouter }