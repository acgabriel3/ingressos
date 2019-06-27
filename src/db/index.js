const { Pool } = require('pg')
const queries = require('../../scripts/index')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lojas_cerradinho',
  password: 'root',
  port: 5432,
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