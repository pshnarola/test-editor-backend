const express = require('express')
const route = express.Router()

route.use('/auth', require('./auth.route'))
route.use('/user', require('./user.route'))
route.use('/page', require('./pageData.route'))

module.exports = route