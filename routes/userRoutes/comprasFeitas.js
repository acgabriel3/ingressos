const comprasFeitas = require('express').Router()
const controller = require('../../controllers/usuarios')

comprasFeitas.get('/', controller.renderComprasFeitas)

module.exports = comprasFeitas