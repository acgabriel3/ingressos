var mysql = require('@mysql/xdevapi');
var db = require('../db/index')

exports.loga = (request, response, next) => {
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
        // response.json(result.rows[0]) // como bindar isso pra home usar?
        request.session.loggedin = true;
        request.session.username = email; 
        response.redirect('/home')
      }
    }
  )
}

exports.paginaRegistro = (request, response, next) => {
    response.sendFile(__dirname + '/../../views/registro.html')
}

exports.cadastra = (request, response, next) => {
    const { nome, cpf, email, password } = request.body
    db.query('INSERT INTO usuarios (nome, cpf, email, senha) VALUES($1, $2, $3, $4)',
      [nome, cpf, email, password])
    response.redirect('../../')
}
