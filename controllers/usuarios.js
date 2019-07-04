const queries = require('../db/queries')

exports.getUsers = (req, res, next) => {
  queries.getClients(req, res)
}

exports.getUserInfo = (req, res, next) => {
  queries.getPersonByCPF(req, res)
}

exports.createUser = (req, res, next) => {
  queries.createPerson(req, res)
  res.redirect('../../')
}

exports.renderProfile = (req, res, next) => {
	queries.getClients(req, res)
}