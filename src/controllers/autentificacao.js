var mysql = require('@mysql/xdevapi');
var db = require('../db/index')

exports.loga = (request, response, next) => {
    response.send("oi, to no loga")
}

exports.paginaRegistro = (request, response, next) => {
    response.sendFile(__dirname + '/../../views/registro.html')
}

exports.cadastra = (request, response, next) => {
    response.send("oi, to no cadastro")
}
