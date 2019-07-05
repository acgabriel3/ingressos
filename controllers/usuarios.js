const db = require('../db/index')

exports.getUsers = (req, res, next) => {
  db.query('SELECT * from Cliente', [], (err, result) => {
    if (err) {
      throw err
    }
    res.json(result.rows)
  })
}

exports.getUserInfo = (req, res, next) => {
  db.query(`SELECT * from Cliente where cpf = $1`, [req.session.usuarioAtivo.cpf], (error, result) => {
    if (error) {
      throw error
    }
    res.render('perfil', {
      usuarioAtivo: result.rows[0]
    })
  })
}


exports.createUser = (req, res, next) => {
  const { cpf, nome, email, senha, telefone, dt_nascimento, cep, num_casa, foto } = req.body
  db.query(`INSERT INTO Cliente (cpf, nome, email, senha, telefone, dt_nascimento, cep, numero_casa, foto)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [cpf, nome, email, senha, telefone, dt_nascimento, cep, num_casa, foto], (error, results) => {
      if (error) {
        throw error
      }
    })
  res.redirect('../../')
}

exports.renderEditPerfil = (req, res, next) => {
  res.render('editarPerfil')
}

exports.updateUser = (req, res, next) => {
  const { nome, email, senha, telefone, dt_nascimento, cep, num_casa, foto } = req.body
  db.query(`UPDATE Cliente SET nome = $1, email = $2, senha = $3, telefone = $4,
    dt_nascimento = $5, cep = $6, numero_casa = $7, foto = $8 WHERE cpf = $9`,
    [nome, email, senha, telefone, dt_nascimento, cep, num_casa, foto, req.session.usuarioAtivo.cpf],
    (error, results) => {
      if (error) {
        throw error
      }
    })
  res.redirect('../')
}
