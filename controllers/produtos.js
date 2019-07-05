const db = require('../db/index')

exports.getProducts = (req, res, next) => {
  db.query(`SELECT e.codigo AS codigo, e.nome AS loja_fornecedora, e.quantidade AS estoque,
    p.nome AS produto, p.preco AS preco, c.nome AS categoria
    FROM (Estoque AS e INNER JOIN Produto AS p ON e.codigo = p.codigo) INNER JOIN Categoria AS c
      ON p.c_codigo = c.c_codigo`
		, [], (err, result) => {
		if (err) {
			throw err
		}
		res.render('produtos', {
			produtos: result.rows
		})
	})
}


exports.viewProduct = (req, res, next) => {
	const prodCod = req.params.prodCod
	db.query(`SELECT e.codigo AS codigo, e.nome AS loja_fornecedora, e.quantidade AS estoque,
    p.nome AS produto, p.preco AS preco, c.nome AS categoria
    FROM (Estoque AS e INNER JOIN (SELECT * from Produto where codigo = $1) AS p ON e.codigo = p.codigo) INNER JOIN Categoria AS c
      ON p.c_codigo = c.c_codigo`, [prodCod], (err, result) => {
		if(err) {
			throw err
		}

		res.render('produto', {
			produto: result.rows[0]
		})

	})
}

exports.renderCompra = (req, res, next) => {
	res.render('compra')
}