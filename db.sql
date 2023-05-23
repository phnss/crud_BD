--Criando a database caso não exista uma 
CREATE DATABASE IF NOT EXISTS Crud_db 
WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

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

INSERT INTO produtos(nome, preço, quantidade)
VALUES
    ()