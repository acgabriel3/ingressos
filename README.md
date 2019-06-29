# Lojas Cerradinho

Assegure-se de antes de rodar o programa ter instalado em sua máquina os seguintes programas:
- [NodeJS](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)
## Rodando o Programa

Execute os comando partindo da pasta raíz do projeto.

### Criando o estado inicial do Banco de Dados
```
sudo service postgresql start
sudo -u postgres psql
\password
root
root
create database lojas_cerradinho;
\c lojas_cerradinho
\i db/scripts/init.sql
\q
```

### Inicializando o programa
```
npm install
npm start
```

Com isso basta abrir algum navegador na url: http://localhost:3000/