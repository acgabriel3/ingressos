const home = require('express').Router()
const controller = require('../../controllers/home')

home.get('/', controller.displayHome)

module.exports = home