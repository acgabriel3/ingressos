const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes/index')
const homeRouter = require('./routes/homeRoutes/index')
const productsRouter = require('./routes/productsRoutes/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 6000 * 60 * 60 * 60 * 2 },
  usuarioAtivo: {},
  saveUninitialized: true,
  resave: true
}))

app.use('/', indexRouter)
app.use('/usuarios', usersRouter)
app.use('/produtos', productsRouter)
app.use('/autentificacao', authRouter)
app.use('/home', homeRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app