const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

app = express()

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

app.use(express.static('views'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', require('./routes/index'))
app.use('/autentificacao', require('./routes/autentificacao/index'))
app.use('/home', require('./routes/loggedRoutes/index'))

module.exports = app