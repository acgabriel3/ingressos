const db = require('../db/index')

exports.displayHome = (req, res, next) => {
	db.query(`SELECT p.nome, c.nome AS nome_categoria FROM Produto AS p INNER JOIN Categoria AS c ON p.c_codigo = c.c_codigo`
		, [], (err, result) => {
		if (err) {
			throw err
		}
		console.log(result.rows)
		res.render('home', {
			produtos: result.rows
		})
	})
}