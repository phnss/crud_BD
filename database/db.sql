--Criando a database caso não exista uma 
--DROP DATABASE IF EXISTS Crud;
--CREATE DATABASE Crud; 

DROP TABLE IF EXISTS produtos CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

--Criando as tables usadas
CREATE TABLE IF NOT EXISTS produtos(
    cod INTEGER,
    nome CHARACTER(20) NOT NULL,
    preço NUMERIC(10,2) NOT NULL,
    quantidade INTEGER NOT NULL,

    CONSTRAINT pk_prod PRIMARY KEY (cod)
);

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

CREATE TABLE IF NOT EXISTS sellers(
    sellerId SERIAL,
    name CHARACTER(30) NOT NULL,
    email CHARACTER(40) NOT NULL,
    password CHARACTER(20) NOT NULL,

    CONSTRAINT pk_sellers PRIMARY KEY(sellerId) 
);

INSERT INTO produtos(cod, nome, preço, quantidade)
VALUES
    (1, 'maçã', 2.00, 10),
    (2, 'pêra', 4.00, 5),
    (3, 'abacaxi', 5.00, 12),
    (4, 'maracujá', 4.00, 7),
    (5, 'kiwi', 8.00, 5),
    (6, 'alho', 2.50, 10),
    (7, 'banana', 1.50, 10),
    (8, 'mixirica', 3.50, 8),
    (9, 'cebola', 10.00, 5),
    (10, 'abacate', 8.50, 10);

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