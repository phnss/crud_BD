--Criando a database caso não exista uma 
--DROP DATABASE IF EXISTS Crud;
--CREATE DATABASE Crud; 

--Apagando TABLES e VIEWS que ja estão pre criadas
DROP TABLE IF EXISTS produtos CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS sellers CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP VIEW IF EXISTS view_vendas CASCADE;
DROP FUNCTION IF EXISTS RecolocarItensDoCarrinho(item_cod INTEGER, item_quantidade INTEGER);
DROP PROCEDURE IF EXISTS RecolocarItenDoCarrinho(item_cod INTEGER, item_quantidade INTEGER);

--Criando as tables usadas
CREATE TABLE IF NOT EXISTS produtos(
    cod INTEGER,
    nome CHARACTER(20) NOT NULL,
    preço NUMERIC(10,2) NOT NULL,
    quantidade INTEGER NOT NULL,
    categoria CHARACTER(20) NOT NULL,
    origem CHARACTER(20) NOT NULL,

    CONSTRAINT pk_prod PRIMARY KEY (cod)
);
--Index para a table produtos
CREATE INDEX index_cod_prod ON produtos (cod);
CREATE INDEX index_nome_prod ON produtos (nome);
CREATE INDEX index_preco_prod ON produtos (preço);

CREATE TABLE IF NOT EXISTS clientes(
    id SERIAL,
    nome CHARACTER(30) NOT NULL,
    email CHARACTER(40) NOT NULL,
    senha CHARACTER(20) NOT NULL,
    address CHARACTER(30) NOT NULL,
    isFlamengo BIT NOT NULL,
    watchOnePiece BIT NOT NULL,

    CONSTRAINT pk_customers PRIMARY KEY(id) 
);
CREATE INDEX index_id_cli ON clientes (id);
CREATE INDEX index_nome_cli ON clientes (nome);
CREATE INDEX index_email_cli ON clientes (email);


CREATE TABLE IF NOT EXISTS sellers(
    sellerId SERIAL,
    name CHARACTER(30) NOT NULL,
    email CHARACTER(40) NOT NULL,
    password CHARACTER(20) NOT NULL,

    CONSTRAINT pk_sellers PRIMARY KEY(sellerId) 
);

CREATE TABLE IF NOT EXISTS payments(
    id SERIAL,
    totalPrice NUMERIC(10,2) NOT NULL,
    customerID INTEGER NOT NULL,
    sellerID INTEGER NOT NULL,
    products VARCHAR NOT NULL,

    CONSTRAINT pk_payments PRIMARY KEY(id) 
);


INSERT INTO produtos(cod, nome, preço, quantidade, categoria, origem) 
VALUES
    (1, 'maçã', 2.00, 10, 'fruta', 'São Paulo'),
    (2, 'pêra', 4.00, 5, 'fruta', 'Rio de Janeiro'),
    (3, 'abacaxi', 5.00, 12, 'fruta', 'Mari'),
    (4, 'maracujá', 4.00, 7, 'fruta', 'Mari'),
    (5, 'kiwi', 8.00, 5, 'fruta', 'João Pessoa'),
    (6, 'alho', 2.50, 10, 'fruta', 'Mari'),
    (7, 'banana', 1.50, 10, 'fruta', 'São Paulo'),
    (8, 'mixirica', 3.50, 8, 'fruta', 'São Paulo'),
    (9, 'cebola', 10.00, 5, 'fruta', 'Mari'),
    (10, 'abacate', 8.50, 10, 'fruta', 'São Paulo');

INSERT INTO clientes(nome, email, senha, address, isFlamengo, watchOnePiece)
VALUES
    ('Pedro Nogueira', 'pn@yahoo.com.br', 'pn123321', 'Sousa', '0', '0'),
    ('Diego', 'diego@yahoo.com.br', 'diego123321', 'Sousa', '0', '1'),
    ('Marcos', 'marco@yahoo.com.br', 'marcos123321', 'Jampa','1', '0'),
    ('Marcelo', 'marcelo@yahoo.com.br', '123321', 'Mangabeira', '1', '1'),
    ('Arthur', 'arthur@yahoo.com.br', '1234321', 'Sousa', '0', '1'),
    ('Daniel', 'daniel@yahoo.com.br', 'daniel4321', 'Bayuex', '1', '0'),
    ('Cliente Preguiçoso', 'admin', 'admin', 'Sousa', '1', '1'),
    ('Patricia', 'patricia@yahoo.com.br', '5432112', 'Suzano', '1', '1');
    
INSERT INTO sellers(name, email, password) 
VALUES
    ('Nogueira', 'pn@yahoo.com.br', '00001'),
    ('Reis', 'diego@yahoo.com.br', '00002'),
    ('Silva', 'daniel@yahoo.com.br', '00003'),
    ('Davi', 'davi@davi', 'davisenha'),
    ('Preguiçoso', 'admin@admin', 'admin'),
    ('Preguiçoso', 'admin', 'admin'),
    ('Santos', 'patricia@yahoo.com.br', '00005');

INSERT INTO payments(totalPrice, customerID, sellerID, products) 
VALUES
    (50.00, 1, 1, 'muitos produtos'),
    (150.00, 1, 1, 'muitos produtos'),
    (30.00, 3, 2, 'muitos produtos'),
    (20.00, 2, 3, 'muitos produtos'),
    (400.00, 5, 4, 'muitos produtos'),
    (10.00, 3, 5, 'muitos produtos'),
    (70.00, 2, 6, 'muitos produtos');

CREATE OR REPLACE PROCEDURE RecolocarItensDoCarrinho(item_cod INTEGER, item_quantidade INTEGER) 
AS $$
BEGIN
    UPDATE produtos
    SET quantidade = quantidade + item_quantidade
    WHERE cod = item_cod;
END;
$$ 
LANGUAGE PLPGSQL;


CREATE VIEW view_sellers_report AS
SELECT sellers.sellerid AS sellerid, sellers.name AS sellername, sellers.email as selleremail , SUM(COALESCE(payments.totalprice, 0)) AS totalprice, json_agg(payments.products) AS products
FROM sellers
LEFT JOIN payments ON sellers.sellerid = payments.sellerid
GROUP BY sellers.sellerid, sellers.name
ORDER by sellers.sellerid ASC;
