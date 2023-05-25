const DBconfigs = require('../configs/DBconfigs');
const { Client } = require('pg');
const fs = require('fs');

class ClienteController 
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

    async insertCliente(nome, email, senha)
    {
        let cliente = new Client(DBconfigs);

        try
        {    
            await this.connect(cliente);

            const query = {
                text: 'INSERT INTO clientes(nome, email, senha) VALUES($1, $2, $3)',
                values: [nome, email, senha]
            };
            await cliente.query(query);

            console.log("Valor inserido na tabela!");
            const resultado = await cliente.query("SELECT * FROM clientes ORDER BY id ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no insertCliente. "+ex)    
        }   
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async updateCliente(nome, email, senha, id)
    {
        let cliente = new Client(DBconfigs);

        try
        {    
            await this.connect(cliente);

            const query = {
                text: 'UPDATE clientes SET "nome" = $1, "email" = $2, "senha" = $3 WHERE "id" = $4',
                values: [nome, email, senha, id]
            };
            await cliente.query(query);

            console.log("Valor atualizado na tabela!");
            const resultado = await cliente.query("SELECT * FROM clientes ORDER BY id ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no updateCliente. "+ex)    
        }   
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async deleteCliente(id)
    {
        let cliente = new Client(DBconfigs);

        try
        {
            await this.connect(cliente);

            const query = {
                text: 'DELETE FROM clientes WHERE id = $1',
                values: [id]
            };
            await cliente.query(query);

            console.log("Cliente removido da tabela na tabela!");

            const resultado = await cliente.query("SELECT * FROM clientes ORDER BY id ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no deleteCliente. "+ex)    
        } 
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async getCliente()
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);             
            
            const query = 'SELECT * FROM clientes ORDER BY id ASC';
            const resultado = await cliente.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getCliente. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async getClienteByName(name)
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);                  
            
            const query = {
                text: 'SELECT * FROM clientes WHERE nome = $1',
                values: [name]
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

module.exports = ClienteController;