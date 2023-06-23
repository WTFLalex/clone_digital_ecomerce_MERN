const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()
const asyncHandler = require('express-async-handler');

router.post('/register', asyncHandler(UserController.register))

module.exports = router