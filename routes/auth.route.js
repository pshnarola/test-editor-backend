const express = require('express')
const route = express.Router()
const authMiddleware = require('../middleware/authentication')
const auth = require('../controller/auth.controller')

route.post('/login', auth.login)
route.get('/me',authMiddleware,auth.me)

module.exports = route