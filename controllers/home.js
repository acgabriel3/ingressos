const db = require('../db/index')

exports.displayHome = (req, res, next) => {
	db.query(`SELECT e.codigo AS codigo, e.nome AS loja_fornecedora, e.quantidade AS estoque,
			p.nome AS produto, p.preco AS preco, c.nome AS categoria
			FROM (Estoque AS e INNER JOIN (SELECT * FROM Produto WHERE promocao) AS p ON e.codigo = p.codigo) 
			INNER JOIN Categoria AS c ON p.c_codigo = c.c_codigo`,
		[], (err, result) => {
			if (err) {
				throw err
			}
			res.render('home', {
				produtos: result.rows
			})
		})
}

exports.renderHistoria = (req, res, next) => {
	res.render('historia')
}