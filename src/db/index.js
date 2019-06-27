<<<<<<< HEAD
const { mysql } = require('@mysql/xdevapi')
=======
const { Pool } = require('pg')
const queries = require('../../scripts/index')
>>>>>>> 929a034a304cc3bb17704453a9730b8dc0592c75

const configuracoes = {
  password: '12345678',
  user: 'root',
  host: 'localhost',
  port: 33060,
  schema: 'lojas_cerradinho'
};

mysql
    .getSession(configuracoes)
    .then(session => {
      console.log(session.inspect());
    })

const query = (text, params = [], callback = (err, result) => { }) => {
  const start = Date.now()
  return pool.query(text, params, (err, res) => {
    const duration = Date.now() - start
    err ? console.log(err) :
      console.log('executed query', { query: text, elapsedTime: String(duration) + ' ms', result: res.rowCount })
    callback(err, res)
  })
}

query(queries.createTables)

module.exports = {
  query
}