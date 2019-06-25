const clientes = require('express').Router()
const status = require('http-status')

clientes.get('/', (req, res, next) => {
  res.status(status.OK).
    send('pegando todos os clientes')
})

clientes.get('/:userID', (req, res, next) => {
  const userID = req.params.userID
  res.status(status.OK)
    .send(`pegando informações do usuario ${userID}`)
})

clientes.use('/:userID/favProds', require('./produtosFavoritos'))

module.exports = clientes