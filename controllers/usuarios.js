const queries = require('../db/queries')

exports.getUsers = (req, res, next) => {
  queries.getPersons(req, res)
}

exports.getUserInfo = (req, res, next) => {
  queries.getPersonByCPF(req, res)
}

exports.createUser = (req, res, next) => {
  queries.createPerson(req, res)
  res.redirect('../../')
}