module.exports = {
  createTables: `

    CREATE TABLE  loja (
      CNPJ      INTEGER UNSIGNED PRIMARY KEY,
      nomeLoja  VARCHAR(65) NOT NULL,
      origem    VARCHAR(65) NOT NULL
    );


    CREATE TABLE departamento (
      codDep     INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      nomeDep    VARCHAR(65),
      localDep   VARCHAR(65)
    );


    CREATE TABLE  empregado (
      cpfEmp        INTEGER UNSIGNED PRIMARY KEY,
      nomeEmp       VARCHAR(65) NOT NULL,
      sexo          VARCHAR(15),
      email         VARCHAR(65) NOT NULL,
      dataContrato  DATE
    );


    ALTER TABLE departamento
    ADD FOREIGN KEY (cpfGerente) REFERENCES empregado(cpfEmp);


    CREATE TABLE categoria (
      codCat  INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      tipo          VARCHAR(65) NOT NULL
    );


    CREATE TABLE produto (
      codProd       INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      nomeProd      VARCHAR(65),
      preço         DOUBLE,
      cotCat        INTEGER UNSIGNED REFERENCES categoria(codCat),
      copDep        INTEGER UNSIGNED REFERENCES departamento(codDep),
      CNPJ          INTEGER UNSIGNED REFERENCES loja(CNPJ)
    );


    CREATE TABLE estoque (
      codProd      INTEGER UNSIGNED REFERENCES produto(codProd),
      CNPJ         INTEGER UNSIGNED REFERENCES loja(CNPJ),
      quantidade   INTEGER UNSIGNED,
      PRIMARY KEY (codProd, CNPJ)
    );


    CREATE TABLE endereco (
      CEP          INTEGER UNSIGNED PRIMARY KEY,
      nomeEnd      VARCHAR(65) NOT NULL,
      complemento  VARCHAR(65)
    );


    CREATE TABLE cartao_credito (
      numeroCartao  INTEGER UNSIGNED PRIMARY KEY,
      nomeCartao    VARCHAR(65) NOT NULL,
      validade      DATE NOT NULL,
      CVC           INTEGER UNSIGNED NOT NULL
    );

    
    CREATE TABLE usuarios (
      cpfUsr          INTEGER UNSIGNED REFERENCES usuario(cpfUsr),
      nomeUsr         INTEGER UNSIGNED NOT NULL,
      senha           VARCHAR(18) NOT NULL,
      email           VARCHAR(65) NOT NULL,
      sexo            VARCHAR(15),
      dataNascimento  DATE NOT NULL,
      telefone        VARCHAR(45) NOT NULL,
      numeroCartao    INTEGER UNSIGNED REFERENCES cartao_credito(numeroCartao),
      CEP             INTEGER UNSIGNED REFERENCES endereco(CEP),
      dataCadastro    TIMESTAMP WITHOU TIMEZONE DEFAULT (NOW() AT TIMEZONE 'UTC+3') NOT NULL
    );


    CREATE TABLE pedidos  (
      cpfUsr       INTEGER UNSIGNED REFERENCES usuario(cpfUsr),
      codProd      INTEGER UNSIGNED REFERENCES produto(codProd),
      qtdPedida    INTEGER UNSIGNED,
      PRIMARY KEY (cpfUsr, codProd)
    );


    CREATE TABLE favoritos (
      cpfUsr       INTEGER UNSIGNED REFERENCES usuario(cpfUsr),
      codProd      INTEGER UNSIGNED REFERENCES produto(codProd),
      codCat       INTEGER UNSIGNED REFERENCES categoria(codCat),
      PRIMARY KEY (cpfUsr, codProd, codCategoria)
    );
         
    
    CREATE TABLE avaliacao  (
      cpfUsr    INTEGER UNSIGNED REFERENCES usuario(cpfUsr),
      codProd   INTEGER UNSIGNED REFERENCES produto(codProd),
      nota      INTEGER UNSIGNED,
      PRIMARY KEY (cpfUsr, codProd)
    );     


    CREATE TABLE cupom (
      codCupom  INTEGER UNSIGNED PRIMARY KEY,
      validade  DATE,
      valor     INTEGER UNSIGNED NOT NULL
    );
         

    CREATE TABLE nota_fiscal  (
      idNota       INTEGER UNSIGNED PRIMARY KEY,
      codProd      INTEGER UNSIGNED REFERENCES produto(codProd),
      CNPJ         INTEGER UNSIGNED REFERENCES loja(CNPJ),
      cpfEmp       INTEGER UNSIGNED REFERENCES empregado(cpfEmp),
      cpfUsr       INTEGER UNSIGNED REFERENCES usuario(cpfUsr),
      numeroCartao INTEGER UNSIGNED REFERENCES cartao_credito(numeroCartao),
      codCupom     INTEGER UNSIGNED REFERENCES cupom(codCupom)
    );

  `,
  dropTables: `
    DROP TABLE IF EXISTS loja;
    DROP TABLE IF EXISTS departamento;
    DROP TABLE IF EXISTS empregado;
    DROP TABLE IF EXISTS categoria;
    DROP TABLE IF EXISTS produto;
    DROP TABLE IF EXISTS estoque;
    DROP TABLE IF EXISTS endereco;
    DROP TABLE IF EXISTS cartao_credito;
    DROP TABLE IF EXISTS usuario;
    DROP TABLE IF EXISTS pedidos;
    DROP TABLE IF EXISTS favoritos;
    DROP TABLE IF EXISTS avaliacao;
    DROP TABLE IF EXISTS cupom;
    DROP TABLE IF EXISTS nota_fiscal;
  `,
}
