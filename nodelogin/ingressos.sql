CREATE DATABASE IF NOT EXISTS `ingressos` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ingressos`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');

ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

INSERT INTO accounts VALUES('11', "teste", "1234", "a");

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';