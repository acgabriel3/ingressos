CREATE TABLE IF NOT EXIST Endereco (
	cep 		VARCHAR(20),
	numero_lote INTEGER,
	complemento VARCHAR(45),
	PRIMARY KEY (cep, numero_lote)
)

CREATE TABLE IF NOT EXISTS Pessoa (
  	cpf 		  VARCHAR(15) UNIQUE PRIMARY KEY NOT NULL,
  	nome 		  VARCHAR(50) NOT NULL,
  	telefone 	  VARCHAR(20),
  	dt_nascimento DATE,
  	cep   		  VARCHAR(20),
  	numero_casa   INTEGER,
  	FOREIGN KEY (cep, numero_casa) REFERENCES Endereco(cep, numero_lote)
);

CREATE TABLE IF NOT EXISTS Cliente (
	cpf 	VARCHAR(15) PRIMARY KEY NOT NULL,
  	email   VARCHAR(50) UNIQUE
  	senha   VARCHAR(100) NOT NULL,
  	FOREIGN KEY (cpf) REFERENCES Pessoa(cpf)
);

CREATE TABLE IF NOT EXISTS Empregado (
	cpf 		 VARCHAR(15) UNIQUE PRIMARY KEY NOT NULL,
  	matricula 	 VARCHAR(10) UNIQUE ,
  	salario 	 REAL NOT NULL,
  	dt_contrato  DATE NOT NULL,
  	departamento INTEGER NOT NULL,
  	FOREIGN KEY (departamento) REFERENCES Departamento(codigo)
);

CREATE TABLE IF NOT EXISTS Departamento (
  	codigo SERIAL PRIMARY KEY NOT NULL,
  	nome   VARCHAR(50) NOT NULL
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
  	dt_vencimento DATE NOT NULL,
  	cvc 		  DECIMAL(3) NOT NULL,
  	titular 	  VARCHAR(15) NOT NULL,
  	FOREIGN KEY (titular) REFERENCES Pessoa(cpf)
);

CREATE TABLE IF NOT EXISTS Loja (
	cnpj 		VARCHAR(15) UNIQUE PRIMARY KEY NOT NULL,
	nome 		VARCHAR(50) UNIQUE NOT NULL,
	cep 		VARCHAR(20),
 	numero_lote INTEGER,
  	FOREIGN KEY (cep, numero_lote) REFERENCES Endereco(cep, numero_lote)
);

CREATE TABLE IF NOT EXISTS Categoria (
	codigo SERIAL PRIMARY KEY NOT NULL,
	nome   VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS Produto (
	codigo 			 SERIAL PRIMARY KEY NOT NULL,
	nome 			 VARCHAR(45),
	preco 			 REAL,
	codigo_categoria INTEGER REFERENCES Categoria(codigo)
);

CREATE TABLE IF NOT EXISTS Estoque (
	codigo 		   SERIAL REFERENCES Produto(codigo),
	nome 		   VARCHAR(45) REFERENCES Loja(nome),
	quantidade 	   INTEGER,
	PRIMARY KEY (codigo_produto, nome_loja)
);

CREATE TABLE IF NOT EXISTS Favoritos (
	cpf		VARCHAR(15) REFERENCES Cliente(cpf),
	codigo 	INTEGER REFERENCES Produto(codigo),
	PRIMARY KEY (cpf, codigo)
);	

CREATE TABLE IF NOT EXISTS Compra (
	id_compra SERIAL PRIMARY KEY NOT NULL,
	cpf 	  VARCHAR(15) REFERENCES Cliente(cpf),
	dt_compra TIMESTAMPTZ NOT NULL DEFAULT NOW(),,
	codigo 	  INTEGER REFERENCES Produto(codigo),
	valor 	  REAL
);	


CREATE TABLE IF NOT EXISTS Cupom (
	codigo 		SERIAL PRIMARY KEY NOT NULL,
	valor 		REAL,
	dt_validade DATE
);

CREATE TABLE IF NOT EXISTS NF_Produtos (
	codigo   INTEGER REFERENCES Produto(codigo),
	id_nota  INTEGER REFERENCES NotaFiscal(id_nota),
);

CREATE TABLE IF NOT EXISTS NotaFiscal (
	id_nota 	 SERIAL PRIMARY KEY NOT NULL,
	id_compra	 INTEGER REFERENCES Compra(id_compra),
	cpf 		 INTEGER REFERENCES Cliente(cpf),
	cnpj 		 INTEGER REFERENCES Loja(cnpj),
	codigo       INTEGER REFERENCES Cupom(codigo),
	valor_total  REAL,
	dt_emissao   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);	


