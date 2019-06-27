const clientes = require('express').Router()
const db = require('../../db/index')

clientes.get('/', (req, res, next) => {
  db.query('select * from usuarios', [], (err, result) => {
    if (err) {
      res.send(err)
    } else {
      if (result.rows.length == 0) {
        res.send('Não há usuários cadastrados')
      } else {
        res.json(result.rows)
      }
    }
  })
})

clientes.post('/', (req, res, next) => {
  const { nome, cpf, email, password } = req.body
  db.query('insert into usuarios (nome, cpf, email, senha) values($1, $2, $3, $4)',
    [nome, cpf, email, password])
  res.redirect('../../')
})

clientes.get('/:userID', (req, res, next) => {
  const userID = req.params.userID
  res.header()
  db.query('select * from usuarios where id = $1', [userID], (err, result) => {
    if (err) {
      res.send(err)
    } else {
      if (result.rows.length == 0) {
        res.send('Usuário não encontrado')
      } else {
        res.json(result.rows)
      }
    }
  })
})

clientes.use('/:userID/favProds', require('./produtosFavoritos'))

module.exports = clientes