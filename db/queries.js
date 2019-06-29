const db = require('./index')

module.exports = {
  getPersons: (request, response) => {
    db.query(`SELECT * FROM pessoa`, (error, results) => {
      if (error) {
        throw error
      }
      response.json(results.rows)
    })
  },
  getPersonByCPF: (request, response) => {
    const cpf = parseInt(request.params.cpf)
    db.query(`SELECT * from Pessoa where cpf = $1`, [cpf], (error, results) => {
      if (error) {
        throw error
      }
      response.json(results.rows)
    })
  },
  createPerson: (request, response) => {
    const { cpf, nome, telefone, dt_nascimento, cep, num_casa } = request.body
    db.query(`INSERT INTO Pessoa (cpf, nome, telefone, dt_nascimento, cep, numero_casa)
      values ($1, $2, $3, $4, $5, $6)`, [cpf, nome, telefone, dt_nascimento, cep, num_casa],
      (error, results) => {
        if (error) {
          throw error
        }
      })
  }
}