--Criando a database caso não exista uma 
DROP DATABASE IF EXISTS Crud;
CREATE DATABASE Crud; 

--Conectando ao database criado
\c Crud;

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

CREATE TABLE IF NOT EXISTS customers(
    id SERIAL,
    nome CHARACTER(30) NOT NULL,
    email CHARACTER(40) NOT NULL,
    senha CHARACTER(10) NOT NULL,

    CONSTRAINT pk_customers PRIMARY KEY(id) 
);