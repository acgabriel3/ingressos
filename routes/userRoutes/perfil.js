const perfil = require('express').Router()
const controller = require('../../controllers/usuarios')
const multer = require('multer')
const upload = multer()

perfil.get('/', controller.getUserInfo)

perfil.get('/editar', controller.renderEditPerfil)
perfil.post('/editar', upload.single('foto'), controller.updateUser)

perfil.post('/excluir', controller.deleteUser)

module.exports = perfil