const express = require('express')
const route = express.Router()
const page = require('../controller/pageData.controller')
const authMiddleware = require('../middleware/authentication')

route.post('/', authMiddleware, page.addPage)
route.get('/', authMiddleware, page.getPages)
route.get('/getById/:id', authMiddleware, page.getPageById)
route.put('/:id', authMiddleware, page.updatePage)
route.delete('/:id', authMiddleware, page.deletePage)

module.exports = route