const db = require('./index')
const fs = require('fs')

createSchema = () => {
  fs.readFile('./db/scripts/init.sql', (err, data) => {
    if (err) {
      throw err
    }

    db.query(data.toString(), [], (err, result) => {
      if (err) {
        throw err
      }
      console.log('Schema criado com sucesso')
    })
  })
}

dropSchema = () => {
  fs.readFile('./db/scripts/end.sql', (err, data) => {
    if (err) {
      throw err
    }

    db.query(data.toString(), [], (err, result) => {
      if (err) {
        throw err
      }
      console.log('Schema dropado com sucesso')
    })
  })
}

insertProducts = () => {
  fs.readFile('./db/scripts/produto.sql', (err, data) => {
    if (err) {
      throw err
    }

    db.query(data.toString(), [], (err, result) => {
      if (err) {
        throw err
      }
      console.log('produtos inseridos com sucesso')
    })
  })
}

createStock = () => {
  fs.readFile('./db/scripts/estoque.sql', (err, data) => {
    if (err) {
      throw err
    }

    db.query(data.toString(), [], (err, result) => {
      if (err) {
        throw err
      }
      console.log('estoque criado com sucesso')
    })
  })
}

module.exports = {
  dropSchema,
  createSchema,
  insertProducts,
  createStock
}