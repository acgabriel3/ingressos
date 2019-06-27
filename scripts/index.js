module.exports = {
  createTables: `
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL NOT NULL PRIMARY KEY,
      nome VARCHAR(50) NOT NULL,
      cpf VARCHAR(14) UNIQUE,
      email VARCHAR(50) NOT NULL,
      senha VARCHAR(100) NOT NULL
    )
  `,
  dropTables: `
    DROP TABLE IF EXISTS usuarios
  `,
}
