const DBconfigs = require('../configs/DBconfigs');
const { Client } = require('pg');
const Customer = require('../model/customer');
const fs = require('fs');
const App = require('../app');

class CustomerController 
{
    constructor() 
    {
        this.client = new Client(DBconfigs);
    }

    //validarEmail(email) {
    //    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //    
    //    return emailRegex.test(email);
    //}
      
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

    async insertCliente(nome, email, senha, address, isFlamengo, watchOnePiece)
    {
        let cliente = new Client(DBconfigs);

        //if(!this.validarEmail(email)){
        //    return console.log('Email inválido!');
        //}
        
        try
        {    
            await this.connect(cliente);

            const query = {
                text: 'INSERT INTO clientes(nome, email, senha, address, isflamengo, watchonepiece) VALUES($1, $2, $3, $4, $5, $6)',
                values: [nome, email, senha, address, isFlamengo, watchOnePiece]
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

    async updateCliente(nome, email, senha, address, isFlamengo, watchOnePiece, id)
    {
        let cliente = new Client(DBconfigs);

        try
        {    
            await this.connect(cliente);

            const query = {
                text: 'UPDATE clientes SET "nome" = $1, "email" = $2, "senha" = $3, "address" = $4, "isflamengo" = $5, "watchonepiece" = $6 WHERE "id" = $7',
                values: [nome, email, senha, address, isFlamengo, watchOnePiece, id]
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

    async getFlamenguistas()
    {
        let client = new Client(DBconfigs);

        try
        {   
            await this.connect(client);    
            
            const query = {
                text: 'SELECT * FROM clientes WHERE isFlamengo = $1',
                values: [1]
            };

            const resultado = await client.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getFlamenguistas. "+ex)    
        }
        finally
        {
            await this.disconnect(client);
        }
    }

    async getOnePieceFans()
    {
        let client = new Client(DBconfigs);

        try
        {   
            await this.connect(client);    
            
            const query = {
                text: 'SELECT * FROM clientes WHERE watchOnePiece = $1',
                values: [1]
            };

            const resultado = await client.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getOnePieceFans. "+ex)    
        }
        finally
        {
            await this.disconnect(client);
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

    async loginCustomer(email, password)
    {
        let client = new Client(DBconfigs);
        let customer = new Customer();
        customer.setId(-1);

        try
        {   
            await this.connect(client);    
            
            const query = {
                text: 'SELECT DISTINCT * FROM Clientes WHERE email = $1 AND senha = $2',
                values: [email, password]
            };

            const resp = await client.query(query);
            if(resp.rowCount > 0 && resp.rows != [])
            {
                customer.setId(resp.rows[0].id);
                customer.setEmail(resp.rows[0].email.trim());
                customer.setNome(resp.rows[0].nome.trim());
                customer.setAddress(resp.rows[0].address.trim());
                customer.setIsFlamengo(resp.rows[0].isflamengo);
                customer.setWatchOnePiece(resp.rows[0].watchonepiece);
            }
        }
        catch(ex){
            console.log("Ocorreu erro ao logar. "+ex)    
        }
        finally
        {
            await this.disconnect(client);
            return customer;
        }
    }
}

module.exports = CustomerController;