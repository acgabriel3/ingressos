const usuarios = require('express').Router()
const controller = require('../../controllers/usuarios')
const multer = require('multer')
const upload = multer()

usuarios.get('/', controller.getUsers)
usuarios.post('/', upload.single('foto'), controller.createUser)

usuarios.use('/perfil', require('./perfil'))
usuarios.use('/cartoes', require('./cartoes'))
usuarios.use('/compras', require('./comprasFeitas'))

module.exports = usuarios