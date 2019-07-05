const usuarios = require('express').Router()
const controller = require('../../controllers/usuarios')

usuarios.get('/', controller.getUsers)
usuarios.get('/perfil', controller.getUserInfo)
usuarios.get('/editPerfil', controller.renderEditPerfil)
usuarios.get('/:cpf', controller.getUserInfo)
usuarios.post('/', controller.createUser)

module.exports = usuarios