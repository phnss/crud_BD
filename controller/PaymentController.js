const DBconfigs = require('../configs/DBconfigs');
const { Client } = require('pg');
const fs = require('fs');

class PaymentController 
{
    constructor() 
    {
        this.client = new Client(DBconfigs);
    }

    async connect(client)
    {
        try
        {
            await client.connect();
            console.log("Conectado com sucesso.");
        }
        catch(ex)
        {
            console.log("Ocorreu erro ao conectar cliente. "+ex)    
        }
    }

    async disconnect(cliente)
    {
        try
        {
            await cliente.end();
            console.log("Desconectado com sucesso.");
        }
        catch(ex)
        {
            console.log("Ocorreu erro ao desconectar cliente. "+ex)    
        }
    }

    async insertPayment(totalPrice, customerID, sellerId, paymentID)
    {
        let client = new Client(DBconfigs);

        try
        {    
            await this.connect(client);

            const query = {
                text: 'INSERT INTO selling(totalPrice, customerID, sellerId, paymentID) VALUES($1, $2, $3, $4)',
                values: [totalPrice, customerID, sellerId, paymentID]
            };
            await client.query(query);

            console.log("Valor inserido na tabela!");
            const resultado = await client.query("SELECT * FROM selling ORDER BY id ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no insertSelling. "+ex)    
        }   
        finally
        {
            await this.disconnect(client);
        }
    }

    async updateSelling(totalPrice, customerID, sellerId, paymentID, id)
    {
        let client = new Client(DBconfigs);

        try
        {    
            await this.connect(client);

            const query = {
                text: 'UPDATE selling SET "totalPrice" = $1, "customerID" = $2,'+
                      '"sellerId" = $3, "paymentID" = $4 WHERE "id" = $5',
                values: [nome, email, senha, id]
            };
            await client.query(query);

            console.log("Valor atualizado na tabela!");
            const resultado = await client.query("SELECT * FROM selling ORDER BY id ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no updateSelling. "+ex)    
        }   
        finally
        {
            await this.disconnect(client);
        }
    }

    async deleteSelling(id)
    {
        let client = new Client(DBconfigs);

        try
        {
            await this.connect(client);

            const query = {
                text: 'DELETE FROM selling WHERE id = $1',
                values: [id]
            };
            await client.query(query);

            console.log("Venda removida da tabela na tabela!");

            const resultado = await client.query("SELECT * FROM selling ORDER BY id ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no deleteSelling. "+ex)    
        } 
        finally
        {
            await this.disconnect(client);
        }
    }
}

module.exports = PaymentController;