const DBconfigs = require('../configs/DBconfigs');
const { Client } = require('pg');
const fs = require('fs');

class SellingController 
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
            console.log("Ocorreu erro ao conectar cliente. "+ex)    
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
            console.log("Ocorreu erro ao desconectar cliente. "+ex)    
        }
    }

    async insertSelling(totalPrice, customerID, sellerId, paymentID)
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

    async getSelling()
    {
        let client = new Client(DBconfigs);

        try
        {   
            await this.connect(client);             
            
            const query = 'SELECT * FROM selling ORDER BY id ASC';
            const resultado = await client.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getSelling. "+ex)    
        }
        finally
        {
            await this.disconnect(client);
        }
    }

    async getClienteByName(name)
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);                  
            
            const query = {
                text: 'SELECT * FROM clientes WHERE nome LIKE $1',
                values: ['%'+name+'%']
            };

            const resultado = await cliente.query(query);

            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getClienteByName. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async getClienteByEmail(email)
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);    
            
            const query = {
                text: 'SELECT * FROM clientes WHERE email = $1',
                values: [email]
            };

            const resultado = await cliente.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getClienteByEmail. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async getClienteByID(id)
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);    
            
            const query = {
                text: 'SELECT * FROM clientes WHERE id = $1',
                values: [id]
            };

            const resultado = await cliente.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getClienteByEmail. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async reportClienteInformation()
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);             
            
            const query = 'SELECT COUNT(*) AS Total_de_clientes FROM Clientes';
            const resultado = await cliente.query(query);
            console.table(resultado.rows);
            
            const csvString = resultado.rows.map(row => Object.values(row).join(',')).join('\n');
            
            fs.writeFile('./report/report_cliente.csv', csvString, (err) => {
                if (err) {
                    console.error('An error occurred while writing the file:', err);
                } else {
                    console.log('Query result was successfully saved to the file.');
                }
            });
            fs.close();
        }
        catch(ex){
            console.log("Ocorreu erro no report. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }
}

module.exports = SellingController;