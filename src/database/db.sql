--
-- Base de datos: `inventory1`
DROP DATABASE IF EXISTS inventory1;
CREATE DATABASE IF NOT EXISTS inventory1;
USE inventory1;
--
-- --------------------------------------------------------

-- TABLE USER
-- all pasword wil be encrypted using SHA1
DROP TABLE IF EXISTS users;
CREATE TABLE  users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  type INT(10) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

INSERT INTO users (id, username, password, fullname) 
VALUES (1, 'deyco', '$2a$10$GSc1pW6IMhfiavnEIxfhMeworMKk7F8BNpEgBKaP6fAwveQtuWo3.', 'Adrian Restrepo'),
       (2, 'Laura', '$2a$10$GSc1pW6IMhfiavnEIxfhMeworMKk7F8BNpEgBKaP6fAwveQtuWo3.', 'Laura Pantaleón'),
       (3, 'Ericita', '$2a$10$GSc1pW6IMhfiavnEIxfhMeworMKk7F8BNpEgBKaP6fAwveQtuWo3.', 'Erinny Pérez');


-- PRODUCTS TABLE / TABLA PRINCIPAL
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id INT(11) NOT NULL,
  code INT(11) NOT NULL,
  name VARCHAR(150) NOT NULL,
  price INT(11) NOT NULL,
  amount INT(250) NOT NULL, -- CANTIDAD
  description TEXT,
  img VARCHAR(250),
  created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE products
  ADD PRIMARY KEY (id);

ALTER TABLE products
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

-- COMPONENTS TABLE / TABLA SECUNDARIA
DROP TABLE IF EXISTS components;
CREATE TABLE components(
  id INT(11) NOT NULL,
  name VARCHAR(150) NOT NULL,
  type VARCHAR(150) NOT NULL,
  price INT(11) NOT NULL,
  amount INT(250) NOT NULL, -- CANTIDAD
  description TEXT,
  products_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_products FOREIGN KEY(products_id) REFERENCES products(id)
);

ALTER TABLE components
  ADD PRIMARY KEY (id);

ALTER TABLE components
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;