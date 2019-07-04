const usuarios = require('express').Router()
const controller = require('../../controllers/usuarios')

usuarios.get('/', controller.getUsers)
usuarios.get('/perfil', controller.renderProfile)
usuarios.get('/:cpf', controller.getUserInfo)
usuarios.post('/', controller.createUser)


module.exports = usuarios
