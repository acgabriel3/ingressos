const login = require('express').Router()
const db = require('../../db/index')

login.post('/', (req, res, next) => {
  const { email, password } = req.body
  db.query('select * from usuarios where email = $1',
    [email], (err, result) => {
      if (err) {
        res.send(err)
      } else if (result.rows.length == 0) {
        res.send('Usuário não cadastrado')
      } else if (result.rows[0].senha != password) {
        res.send('Senha incorreta')
      } else {
        // res.json(result.rows[0]) // como bindar isso pra home usar?
        res.redirect('/home')
      }
    }
  )
})

module.exports = login