const favProds = require('express').Router({
  mergeParams: 'true' // preserva os parametros, que deveriam ser excluídos
})

// Any changes made to the req.params object in a middleware or route handler will be reset.
favProds.get('/', (req, res, next) => {
  const userID = req.params.userID
  res.send(`pegando todos os favProds do cliente ${userID}`)
})

favProds.get('/:prodID', (req, res, next) => {
  next()
}, require('../productsRoutes/index'))

module.exports = favProds