CREATE TABLE IF NOT EXISTS Cliente (
	cpf 		  VARCHAR(15) UNIQUE PRIMARY KEY NOT NULL,
  	nome 		  VARCHAR(50) NOT NULL,
  	email   	  VARCHAR(50) UNIQUE,
  	senha   	  VARCHAR(100) NOT NULL,
  	telefone 	  VARCHAR(20),
  	dt_nascimento VARCHAR(15),
  	cep   		  VARCHAR(20),
  	numero_casa   INTEGER,
  	foto 		  BYTEA
);

CREATE TABLE IF NOT EXISTS Departamento (
  	codigo SERIAL PRIMARY KEY NOT NULL,
  	nome   VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Empregado (
	cpf 		  VARCHAR(15) UNIQUE PRIMARY KEY NOT NULL,
  	matricula 	  VARCHAR(10) UNIQUE ,
  	nome 		  VARCHAR(50) NOT NULL,
  	telefone 	  VARCHAR(20),
  	dt_nascimento DATE,
  	salario 	  REAL NOT NULL,
  	dt_contrato   DATE NOT NULL,
  	departamento  INTEGER NOT NULL,
	foto 		  BYTEA,
  	FOREIGN KEY (departamento) REFERENCES Departamento(codigo)
);

CREATE TABLE IF NOT EXISTS Gerencia (
	cpf 		 VARCHAR(15) REFERENCES Empregado(cpf),
	matricula 	 VARCHAR(10) REFERENCES Empregado(matricula),
	departamento INTEGER REFERENCES Departamento(codigo),
	dt_inicio 	 DATE,
	PRIMARY KEY (cpf, matricula, departamento)
);

CREATE TABLE IF NOT EXISTS CartaoCredito (
  	numero 		  VARCHAR(15) PRIMARY KEY NOT NULL,
  	dt_vencimento VARCHAR(5) NOT NULL,
  	cvc 		  DECIMAL(3) NOT NULL,
  	titular 	  VARCHAR(15) NOT NULL,
  	FOREIGN KEY (titular) REFERENCES Cliente(cpf)
);

CREATE TABLE IF NOT EXISTS Loja (
	cnpj 			SERIAL UNIQUE PRIMARY KEY NOT NULL,
	nome 			VARCHAR(50) UNIQUE NOT NULL,
	cep 			VARCHAR(20),
 	numero_lote		INTEGER,
	logo 		  	BYTEA
);

CREATE TABLE IF NOT EXISTS Categoria (
	c_codigo 	SERIAL PRIMARY KEY NOT NULL,
	nome   		VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS Produto (
	codigo 		SERIAL PRIMARY KEY NOT NULL,
	nome 		VARCHAR(45),
	preco 		REAL,
	promocao    BOOLEAN,
	foto 		BYTEA,
	c_codigo 	INTEGER REFERENCES Categoria(c_codigo)
);

CREATE TABLE IF NOT EXISTS Estoque (
	codigo 		   INTEGER REFERENCES Produto(codigo),
	nome 		   VARCHAR(45) REFERENCES Loja(nome),
	quantidade 	   INTEGER,
	PRIMARY KEY (codigo, nome)
);

CREATE TABLE IF NOT EXISTS Favoritos (
	cpf		VARCHAR(15) REFERENCES Cliente(cpf),
	codigo 	INTEGER REFERENCES Produto(codigo),  
	PRIMARY KEY (cpf, codigo)
);	

CREATE TABLE IF NOT EXISTS Compra (
	id_compra SERIAL PRIMARY KEY NOT NULL,
	cpf 	  VARCHAR(15) REFERENCES Cliente(cpf),
	dt_compra TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	codigo 	  INTEGER REFERENCES Produto(codigo),
	valor 	  REAL
);	

CREATE TABLE IF NOT EXISTS Cupom (
	codigo 			SERIAL PRIMARY KEY NOT NULL,
	valor 			INTEGER CHECK (valor > 0 AND valor < 30),
	dt_validade 	DATE,
	prod_desconto 	INTEGER REFERENCES Produto(codigo)
);

CREATE TABLE IF NOT EXISTS NotaFiscal (
	id_nota 	 SERIAL PRIMARY KEY NOT NULL,
	id_compra	 INTEGER REFERENCES Compra(id_compra),
	cpf 		 VARCHAR(15) REFERENCES Cliente(cpf),
	cnpj 		 INTEGER REFERENCES Loja(cnpj),
	codigo       INTEGER REFERENCES Cupom(codigo),
	valor_total  REAL,
	dt_emissao   TIMESTAMPTZ NOT NULL DEFAULT NOW()	
);	

CREATE TABLE IF NOT EXISTS NF_Produtos (
	codigo   INTEGER REFERENCES Produto(codigo),
	id_nota  INTEGER REFERENCES NotaFiscal(id_nota)
);

CREATE VIEW infoProduto AS

	SELECT e.codigo AS codigo, e.nome AS loja_fornecedora, e.quantidade AS estoque,
    p.nome AS produto, p.preco AS preco, c.valor AS desconto, c.codigo As codCupom
    FROM (Estoque AS e INNER JOIN Produto AS p ON e.codigo = p.codigo) INNER JOIN Cupom AS c
	on c.prod_desconto = p.codigo;
