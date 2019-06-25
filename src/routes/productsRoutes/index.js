const produtos = require('express').Router()
const status = require('http-status')

produtos.get('/', (req, res, next) => {
  res.status(status.OK)
    .send('pegando todos os produtos')
})

produtos.get('/:prodID', (req, res, next) => {
  const prodID = req.params.prodID
  res.status(status.OK)
    .send(`vendo infrmações do produto ${prodID}`)
})

module.exports = produtos