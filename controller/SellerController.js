const DBconfigs = require('../configs/DBconfigs');
const { Client } = require('pg');
const Seller = require('../model/seller');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const App = require('../app');

class SellerController 
{
    constructor() 
    {
        this.client = new Client(DBconfigs);
    }

    async connect(cliente)
    {
        try{
            console.log("iniciando a conexão.");
            await cliente.connect(); //inicia a conexão
            console.log("Conexão bem sucedida!");
        }
        catch(ex){
            console.log("Ocorreu erro ao conectar vendedor. "+ex)    
        }
    }

    async disconnect(cliente)
    {
        try{
            console.log("iniciando a desconexão.");
            await cliente.end();
            console.log("Desconectado com sucesso.");
        }
        catch(ex){
            console.log("Ocorreu erro ao desconectar vendedor. "+ex)    
        }
    }

    async logAllSellers(client)
    {
        const resultado = await client.query("SELECT * FROM sellers ORDER BY sellerId ASC");
        console.table(resultado.rows);
    }

    async insertSeller(name, email, password)
    {
        let client = new Client(DBconfigs);

        try
        {    
            await this.connect(client);

            const query = {
                text: 'INSERT INTO sellers(name, email, password) VALUES($1, $2, $3)',
                values: [name, email, password]
            };
            await client.query(query);

            console.log("Valor inserido na tabela!");
            
            await this.logAllSellers(client);
        }
        catch(ex){
            console.log("Ocorreu erro no insertCliente. "+ex)    
        }   
        finally
        {
            await this.disconnect(client);
        }
    }

    async updateSeller(name, email, password, sellerId)
    {
        let client = new Client(DBconfigs);

        try
        {    
            await this.connect(client);

            const query = {
                text: 'UPDATE sellers SET "name" = $1, "email" = $2, "password" = $3 WHERE "sellerid" = $4',
                values: [name, email, password, sellerId]
            };
            await client.query(query);

            console.log("Valor atualizado na tabela!");
            await this.logAllSellers(client);
        }
        catch(ex){
            console.log("Ocorreu erro no updateSeller. "+ex)    
        }   
        finally
        {
            await this.disconnect(client);
        }
    }

    async deleteSeller(sellerId)
    {
        let client = new Client(DBconfigs);

        try
        {
            await this.connect(client);

            const query = {
                text: 'DELETE FROM sellers WHERE sellerId = $1',
                values: [sellerId]
            };
            await client.query(query);

            console.log("Vendedor removido da tabela na tabela!");

            await this.logAllSellers(client);
        }
        catch(ex){
            console.log("Ocorreu erro no deleteSeller. "+ex)    
        } 
        finally
        {
            await this.disconnect(client);
        }
    }

    async getSellers()
    {
        let client = new Client(DBconfigs);

        try
        {   
            await this.connect(client);             
            
            const query = 'SELECT * FROM sellers ORDER BY sellerId ASC';
            const resultado = await client.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getSellers. "+ex)    
        }
        finally
        {
            await this.disconnect(client);
        }
    }

    async getSellerByName(name)
    {
        let client = new Client(DBconfigs);

        try
        {   
            await this.connect(client);                  
            
            const query = {
                text: 'SELECT * FROM sellers WHERE name LIKE $1',
                values: ['%'+name+'%']
            };

            const resultado = await client.query(query);

            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getSellerByName. "+ex)    
        }
        finally
        {
            await this.disconnect(client);
        }
    }

    async getSellerByEmail(email)
    {
        let client = new Client(DBconfigs);

        try
        {   
            await this.connect(client);    
            
            const query = {
                text: 'SELECT * FROM sellers WHERE email = $1',
                values: [email]
            };

            const resultado = await client.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getSellerByEmail. "+ex)    
        }
        finally
        {
            await this.disconnect(client);
        }
    }

    async getSellerByID(sellerId)
    {
        let client = new Client(DBconfigs);

        try
        {   
            await this.connect(client);    
            
            const query = {
                text: 'SELECT * FROM sellers WHERE sellerId = $1',
                values: [sellerId]
            };

            const resultado = await client.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getSellerById. "+ex)    
        }
        finally
        {
            await this.disconnect(client);
        }
    }

    async loginSeller(email, password)
    {
        let client = new Client(DBconfigs);
        let seller = new Seller();
        seller.setId(-1);

        try
        {   
            await this.connect(client);    
            
            const query = {
                text: 'SELECT DISTINCT * FROM sellers WHERE email = $1 AND password = $2',
                values: [email, password]
            };

            const resp = await client.query(query);
            if(resp.rowCount > 0 && resp.rows != [])
            {
                seller.setId(resp.rows[0].sellerid);
                seller.setEmail(resp.rows[0].email.trim());
                seller.setName(resp.rows[0].name.trim());
            }
        }
        catch(ex){
            console.log("Ocorreu erro ao logar. "+ex)    
        }
        finally
        {
            await this.disconnect(client);
            return seller;
        }
    }

    async sellersReport(){
        let cliente = new Client(DBconfigs);
    
        try {
            await this.connect(cliente);             
            // Consulta para obter as informações dos pagamentos
            const query = `SELECT * FROM view_pagamentos`;
            const result = await cliente.query(query);
            const payments = result.rows;
        
            // Criação do arquivo CSV
            const csvWriter = createCsvWriter({
              path: './report/relatorio_vendas.csv',
              header: [
                { id: 'id', title: 'ID do Pedido' },
                { id: 'totalprice', title: 'Valor Total' },
                { id: 'customerid', title: 'ID do Cliente' },
                { id: 'sellerid', title: 'ID do Funcionário' },
                { id: 'sellername', title: 'Nome do Funcionário' },
                { id: 'products', title: 'Itens do Pedido' },
              ],
            });
        
            await csvWriter.writeRecords(payments);
            console.log('Arquivo CSV gerado com sucesso: relatorio_vendas.csv');
        } catch (error) {
            console.error('Erro ao gerar o relatório de vendas:', error);
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }
}

module.exports = SellerController;