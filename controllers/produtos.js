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
		db.query(`SELECT cnpj, nome from Loja`, [], (err, result2) => {
			if (err) {
				throw err
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
		loja = loja[0]
	}
	db.query('INSERT INTO Produto (nome, preco, foto, c_codigo) values ($1, $2, $3, $4) RETURNING codigo',
		[nome, preco, foto, categoria], (err, result) => {
			if (err) {
				throw err
			}
			db.query(`INSERT INTO Estoque (codigo, nome, quantidade) values ($1, $2, $3)`,
				[result.rows[0].codigo, loja, quantidade], (err, result) => {
					if (err) {
						throw err
					}
					res.redirect('/produtos')
				})
		})
}

exports.viewProduct = (req, res, next) => {
	let { prodCod } = req.params
	prodCod = parseInt(prodCod)

	db.query(`SELECT e.codigo AS codigo, e.nome AS loja_fornecedora, e.quantidade AS estoque,
    p.nome AS produto, p.preco AS preco, c.nome AS categoria, p.foto
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
	const { usuarioAtivo } = req.session
	let { prodCod } = req.params
	prodCod = parseInt(prodCod)

	db.query(`SELECT e.codigo AS codigo, e.nome AS loja_fornecedora, e.quantidade AS estoque,
		p.nome AS produto, p.preco AS preco, c.nome AS categoria, p.foto
			FROM (Estoque AS e INNER JOIN
				(SELECT * from Produto where codigo = $1) AS p ON e.codigo = p.codigo) INNER JOIN
					Categoria AS c ON p.c_codigo = c.c_codigo`, [prodCod], (err, prod) => {
			if (err) {
				throw err
			}
			db.query(`SELECT * FROM CartaoCredito where titular = $1`, [usuarioAtivo.cpf], (err, cartoes) => {
				if (err) {
					throw err
				}

				db.query(`SELECT * from Cupom where prod_desconto = $1`, [prodCod], (err, cupons) => {
					res.render('compra', {
						produto: prod.rows[0],
						cartoes: cartoes.rows,
						cupons: cupons.rows
					})
				})
			})
		})
}

exports.realizaCompra = (req, res, next) => {
	let { prodCod } = req.params
	const { cupom, cartao } = req.body
	prodCod = parseInt(prodCod)

	// verifica se hah estoque o suficiente para o produto
	// tá bugado pq nessa view só tem os produtos que possuem algum cupom
	db.query(`SELECT * FROM infoProduto WHERE codigo = $1`, [prodCod], (err, result) => {
		if (err) {
			throw err
		}

		if (result.rows.length === 0) {
			realizaCompraSemDesconto(req, res, next)
			return
		}

		const infoProduto = result.rows[0]

		// se não há estoque não há nada pra fazer
		if (infoProduto.estoque < 1) {
			res.send(`Não há mais estoque do produto ${infoProduto.produto}`)
			return
		}

		const desconto = (infoProduto.desconto * infoProduto.preco) / 100.0
		const valorCompra = infoProduto.preco - desconto

		// diminui o estoque do item comprado, tem que ter uma opcao de escolher mais de um item pra comprar
		db.query(`UPDATE Estoque SET quantidade = quantidade-1 WHERE codigo = $1`, [prodCod], (err, result) => {
			if (err) {
				throw err
			}
			// verificar se tem que excluir mesmo o cupom... --> Nao precisa pois se nao tiver cupom ele vai pra fucao de compra sem cupom
			db.query(`DELETE FROM Cupom where codigo = $1`, [cupom.codigo], (err, result) => {
				if (err) {
					throw err
				}
			})
			const { usuarioAtivo } = req.session
			// insere na compra -> verificar se a dt_compra é gerada automaticamente, se não é bom fazer isso
			// ou entao usar to_timestamp(${Date.now()} / 1000.0)
			db.query(`INSERT INTO Compra (cpf, codigo, valor) values($1, $2, $3) RETURNING id_compra`,
				[usuarioAtivo.cpf, prodCod, valorCompra], (err, resultIdCompra) => {
					if (err) {
						throw err
					}
					db.query(`SELECT cnpj from Loja where nome = $1`, [infoProduto.loja_fornecedora], (err, result) => {
						// a query de cima retorna o id da compra que é usado na nota fiscal
						// aqui é criado a nota fiscal da compra feita
						const cnpj = result.rows[0].cnpj
						db.query(`INSERT INTO NotaFiscal (id_compra, cpf, cnpj, codigo, valor_total) values($1, $2, $3, $4, $5)`,
							[resultIdCompra.rows[0].id_compra, usuarioAtivo.cpf, cnpj, cupom.codigo, valorCompra],
							(err, result) => {
								if (err) {
									throw err
								}
								res.redirect('/usuarios/perfil') // faz mais sentido voltar pra produto
							})
					})
				})
		})
	})
}

function realizaCompraSemDesconto(req, res, enxt) {
	res.send('sem cupom de desconto')
}