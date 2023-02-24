const express = require('express')
const route = express.Router()
const user = require('../controller/user.controller')
// const authMiddleware = require('../middleware/authentication')

route.post('/', user.addUser)

module.exports = route