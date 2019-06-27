const { mysql } = require('@mysql/xdevapi')

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
    err ? console.log('erro encontrado', err) :
      console.log('executed query', { query: text, elapsedTime: String(duration) + ' ms', result: res.rowCount })
    callback(err, res)
  })
}

createDatabase = (callback) => {
  return query(`
    CREATE TABLE IF NOT EXISTS clientes (
      id SERIAL NOT NULL PRIMARY KEY,
      nome VARCHAR(50) NOT NULL
    )`, [], callback
  )
}

dropDatabase = (callback) => {
  query(`
    DROP TABLE IF EXISTS clientes;
  `, [], callback)
}

module.exports = {
  query, createDatabase, dropDatabase
}