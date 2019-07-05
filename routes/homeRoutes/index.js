const home = require('express').Router()
const controller = require('../../controllers/home')

home.get('/', controller.displayHome)
home.get('/historia', controller.renderHistoria)

module.exports = home