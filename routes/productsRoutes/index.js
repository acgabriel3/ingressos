const produtos = require('express').Router()
const controller = require('../../controllers/produtos')
const multer = require('multer')
const upload = multer()

produtos.get('/', controller.getProducts)
produtos.get('/inserir', controller.createProductPage)
produtos.post('/inserir', upload.single('foto'), controller.createProduct)
produtos.get('/compra', controller.renderCompra)
produtos.post('/compra', controller.realizaCompra)
produtos.get('/:prodCod', controller.viewProduct)

module.exports = produtos