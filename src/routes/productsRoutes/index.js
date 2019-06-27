const produtos = require('express').Router()

produtos.get('/', (req, res, next) => {
  res.send('pegando todos os produtos')
})

produtos.get('/:prodID', (req, res, next) => {
  const prodID = req.params.prodID
  res.send(`vendo infrmações do produto ${prodID}`)
})

module.exports = produtos