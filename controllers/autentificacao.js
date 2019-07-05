const db = require('../db/index')

exports.loginHandler = (req, res, next) => {
  const { email, password } = req.body
  db.query(`SELECT * from Cliente where email = $1`, [email], (error, result) => {
    if (error) {
      throw error
    } else if (result.rows.length == 0) {
      res.send('Usuário não cadastrado')
    } else if (result.rows[0].senha != password) {
      res.send('Senha incorreta')
    } else {
      req.session.usuarioAtivo = result.rows[0]
      res.redirect('/home')
    }
  })
}

exports.displayRegisterPage = (req, res, next) => {
  res.render('cadastro', { title: 'Preencha os campos abaixo' })
}