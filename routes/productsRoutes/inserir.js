const inserirProduto = require('express').Router()
const controller = require('../../controllers/produtos')
const multer = require('multer')
const upload = multer()

inserirProduto.get('/', controller.createProductPage)
inserirProduto.post('/', upload.single('foto'), controller.createProduct)

module.exports = inserirProduto