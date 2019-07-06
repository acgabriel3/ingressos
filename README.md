# Lojas Cerradinho

Assegure-se de antes de rodar o programa ter instalado em sua máquina os seguintes programas:
- [NodeJS](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)
## Rodando o Programa

Execute os comando partindo da pasta raíz do projeto.

### Criando o estado inicial do Banco de Dados

#### Linux e afins
```
sudo service postgresql start
sudo -u postgres psql
\password
root
root
create database lojas_cerradinho;
\c lojas_cerradinho
\i db/scripts/end.sql
\i db/scripts/init.sql
\i db/scripts/produto.sql
\i db/scripts/estoque.sql
\i ./db/scripts/procedures.sql
\q
```

#### Windows
obs.: É necessário ter o psql setado no PATH, geralmente está neste caminho C:\Program Files\PostgreSQL\11\bin
```
psql.exe -U postgres -d lojas_cerradinho
root
\i db/scripts/end.sql
\i db/scripts/init.sql
\i db/scripts/produto.sql
\i db/scripts/estoque.sql
\i ./db/scripts/procedures.sql
\q
```

### Inicializando o programa
```
npm install
npm start
```

Com isso basta abrir algum navegador na url: http://localhost:3000/