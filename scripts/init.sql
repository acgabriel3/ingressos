CREATE DATABASE IF NOT EXISTS `lojas_cerradinho`;
USE `lojas_cerradinho`;

CREATE TABLE IF NOT EXISTS `clientes` (
  `id` SERIAL NOT NULL PRIMARY KEY,
  `nome` VARCHAR(50) NOT NULL,
  `senha` VARCHAR(50) NOT NULL
)