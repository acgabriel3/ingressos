const home = require('express').Router()
const controller = require('../../controllers/home')

home.use('/', controller.displayHome)

module.exports = home