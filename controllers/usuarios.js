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
  const { cpf, nome, email, senha, telefone, dt_nascimento, cep, num_casa } = req.body
  const foto = req.file.buffer.toString('base64')
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
  const { nome, email, senha, telefone, dt_nascimento, cep, num_casa } = req.body
  const foto = req.file.buffer.toString('base64')
  db.query(`UPDATE Cliente SET nome = $1, email = $2, senha = $3, telefone = $4,
    dt_nascimento = $5, cep = $6, numero_casa = $7, foto = $8 WHERE cpf = $9`,
    [nome, email, senha, telefone, dt_nascimento, cep, num_casa, foto, req.session.usuarioAtivo.cpf],
    (error, results) => {
      if (error) {
        throw error
      }
    })
  res.redirect('../perfil')
}

exports.deleteUser = (req, res, next) => {
  const { usuarioAtivo } = req.session
  db.query(`DELETE FROM CLIENTE WHERE cpf = $1`, [usuarioAtivo.cpf], (err, result) => {
    if (err) {
      throw err
    }
    db.query(`DELETE FROM CartaoCredito where titular = $1`, [usuarioAtivo.cpf], (err, result) => {
      if (err) {
        throw err
      }
      res.redirect('/')
    })
  })
}

exports.getCreditCards = (req, res, next) => {
  const { usuarioAtivo } = req.session
  db.query('SELECT * FROM CartaoCredito where titular = $1', [usuarioAtivo.cpf], (err, result) => {
    if (err) {
      throw err
    }
    res.render('cartoes', {
      cartoes: result.rows
    })
  })
}

exports.renderCreateCartao = (req, res, next) => {
  res.render('inserirCartao')
}

exports.createCreditCard = (req, res, next) => {
  const { numero, cvc, vencimento } = req.body
  const { usuarioAtivo } = req.session
  db.query('INSERT INTO CartaoCredito (numero, dt_vencimento, cvc, titular) values($1, $2, $3, $4)',
    [numero, vencimento, cvc, usuarioAtivo.cpf], (err, result) => {
      if (err) {
        throw err
      }
      res.redirect('../perfil')
    })
}

exports.renderDeleteCartao = (req, res, next) => {
  const { usuarioAtivo } = req.session
  db.query('SELECT * FROM CartaoCredito where titular = $1', [usuarioAtivo.cpf], (err, result) => {
    if (err) {
      throw err
    }
    res.render('excluirCartao', {
      cartoes: result.rows 
    })
  })
}

exports.deleteCreditCard = (req, res, next) => {
  const { numero } = req.body
  if (numero.constructor === Array) {
		numero = numero[0]
	}
  db.query(`DELETE FROM CartaoCredito where numero = $1`, [numero], (err, result) => {
    if (err) {
      throw err
    }
    res.redirect('../perfil')
  })
}