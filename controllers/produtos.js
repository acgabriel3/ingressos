const db = require('../db/index')

exports.getProducts = (req, res, next) => {
	db.query(`SELECT e.codigo AS codigo, e.nome AS loja_fornecedora, e.quantidade AS estoque,
    p.nome AS produto, p.preco AS preco, c.nome AS categoria, p.foto as foto
    FROM (Estoque AS e INNER JOIN Produto AS p ON e.codigo = p.codigo) INNER JOIN Categoria AS c
      ON p.c_codigo = c.c_codigo` , [], (err, result) => {
			if (err) {
				throw err
			}
			res.render('produtos', {
				produtos: result.rows
			})
		})
}

exports.createProductPage = (req, res, next) => {
	db.query(`SELECT c_codigo as codigo, nome FROM Categoria`, [], (err, result) => {
		if (err) {
			throw err
		}
		db.query(`SELECT cnpj, nome from Loja`, [], (err2, result2) => {
			if (err2) {
				throw err2
			}
			res.render('inserirProduto', {
				categorias: result.rows,
				lojas: result2.rows
			})
		})
	})
}

exports.createProduct = (req, res, next) => {
	const { nome, preco, categoria, loja, quantidade } = req.body
	const foto = req.file.buffer.toString('base64')
	if (categoria.constructor === Array) {
		categoria = categoria[0]
	}
	if (loja.constructor === Array) {
		loja[0] = loja
	}
	db.query('INSERT INTO Produto (nome, preco, foto, c_codigo) values ($1, $2, $3, $4) RETURNING codigo',
		[nome, preco, foto, categoria], (err, result) => {
			if (err) {
				throw err
			}
			db.query(`INSERT INTO Estoque (codigo, nome, quantidade) values ($1, $2, $3)`,
				[result.rows[0].codigo, loja, quantidade], (err2, result2) => {
					if (err2) {
						throw err2
					}
					res.redirect('/produtos')
			})
		})
}

exports.viewProduct = (req, res, next) => {
	const prodCod = req.params.prodCod
	db.query(`SELECT e.codigo AS codigo, e.nome AS loja_fornecedora, e.quantidade AS estoque,
    p.nome AS produto, p.preco AS preco, c.nome AS categoria
    FROM (Estoque AS e INNER JOIN (SELECT * from Produto where codigo = $1) AS p ON e.codigo = p.codigo) INNER JOIN Categoria AS c
      ON p.c_codigo = c.c_codigo`, [prodCod], (err, result) => {
			if (err) {
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

exports.realizaCompra = (req, res, next) => {
	const { cupom } = req.body
	const prodCod = req.params.prodCod

	// verifica se hah estoque o suficiente para o produto
	db.query(`SELECT * FROM infoProduto WHERE codigo = $1`, [prodCod], (err, result) => {
		if (err) {
			throw err
		}


		infoProduto = null

		for (let i = 0; i < result.rows.length; i++) {
			if (i.codCupom = cupom)
				infoProduto = result.rows[i]
		}

		if (infoProduto.estoque < 1) {
			res.send('não há mais estoque')
			wait(5)
			res.redirect('../')
		}

		const valorCompra = infoProduto.preco - (infoProduto.Preco * infoProduto.valor) / 100
		const usuarioAtivos = req.session.usuarioAtivo
		//Reduz o estoque do produto
		db.query(`UPDATE estoque SET quantidade = quantidade - 1 WHERE codigo = $1`, [prodCod], (err2, result2) => {

			if (err2) {
				throw err2
			}

		})

		idCompra = null

		db.query('INSERT INTO Compra(cpf, codigo, valor) VALUES($1, $2, $3) RETURNING codigo', [usuarioAtivos.cpf, codProd, valorCompra], (err2, result2) => {

			if (err2) {
				throw err2
			}

			idCompra = result2.rows[0].codigo

		})

		db.query('INSERT INTO NotaFiscal(id_compra, cpf, codigo, valor_total) VALUES($1, $2, $3, $4)',
			[idCompra, usuariosAtivos.cpf, codProd, valorCompra], (err2, result2) => {
				
				if(err2) {
					throw err2
				}

			})

	})
}
