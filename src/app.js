const app = require('express')()
var session = require('express-session')
const bodyParser = require('body-parser')
const db = require('./db/index')


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())



db.createDatabase((err, res) => {
  console.log('schema criado')
})

db.query(`select * from clientes`, [], (err, result) => { })

app.use('/', require('./routes/index'))
app.use('/clientes', require('./routes/clientRoutes/index'))
app.use('/autentificacao', require('./routes/autentificacao/index'))

module.exports = app