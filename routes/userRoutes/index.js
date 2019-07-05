const usuarios = require('express').Router()
const controller = require('../../controllers/usuarios')
const multer = require('multer')
const upload = multer()

usuarios.get('/', controller.getUsers)
usuarios.get('/perfil', controller.getUserInfo)
usuarios.get('/editPerfil', controller.renderEditPerfil)
usuarios.get('/:cpf', controller.getUserInfo)
usuarios.post('/', upload.single('foto'), controller.createUser)
usuarios.post('/editPerfil', upload.single('foto'), controller.updateUser)

module.exports = usuarios