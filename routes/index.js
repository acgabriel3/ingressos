const index = require('express').Router()
const controller = require('../controllers/index')

index.get('/', controller.getIndexPage)

module.exports = index
