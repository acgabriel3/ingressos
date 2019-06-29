const db = require('../db/index')

exports.cadastroHandler = (request, response, next) => {
  const { nome, cpf, email, password } = request.body
  db.query('INSERT INTO usuarios (nome, cpf, email, senha) VALUES($1, $2, $3, $4)',
    [nome, cpf, email, password])
  response.redirect('../../')
}

exports.loginHandler = (request, response, next) => {
  const { email, password } = request.body
  db.query('SELECT * FROM usuarios WHERE email = $1',
    [email], (err, result) => {
      if (err) {
        response.send(err)
      } else if (result.rows.length == 0) {
        response.send('Usuário não cadastrado')
      } else if (result.rows[0].senha != password) {
        response.send('Senha incorreta')
      } else {
        // request.session.loggedin = true
        // request.session.username = email 
        response.redirect('/home')
      }
    }
  )
}

exports.displayRegisterPage = (req, res, next) => {
  res.render('cadastro', { title: 'Preencha os campos abaixo' })
}