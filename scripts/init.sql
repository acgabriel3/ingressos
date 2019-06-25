create database if not exists `lojas_cerradinho`;
use `lojas_cerradinho`;

create table if not exists `clientes` (
  `id` serial not null primary key,
  `nome` varchar(50) not null
)