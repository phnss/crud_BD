const DBconfigs = require('../configs/DBconfigs');
const { Client } = require('pg');
const fs = require('fs');
const App = require('../app');
const Product = require('../model/product');

class ProdutoController 
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

    async insertProduto(cod, nome, preco, qtd, categoria, origem)
    {
        let cliente = new Client(DBconfigs);

        try
        {    
            await this.connect(cliente);

            const query = {
                text: 'INSERT INTO produtos(cod, nome, preço, quantidade, categoria, origem) VALUES($1, $2, $3, $4, $5, $6)',
                values: [cod, nome, preco, qtd, categoria, origem]
            };
            await cliente.query(query);

            console.log("Valor inserido na tabela!");
            const resultado = await cliente.query("SELECT * FROM produtos ORDER BY cod ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no insertProduto. "+ex)    
        }   
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async updateProduto(cod, nome, preco, qtd, categoria, origem)
    {
        let cliente = new Client(DBconfigs);

        try
        {    
            await this.connect(cliente);

            const query = {
                text: 'UPDATE produtos SET "nome" = $1, "preço" = $2, "quantidade" = $3, "categoria" = $5, "origem" = $6  WHERE "cod" = $4',
                values: [nome, preco, qtd, cod, categoria, origem]
            };
            await cliente.query(query);

            console.log("Valor atualizado na tabela!");
            const resultado = await cliente.query("SELECT * FROM produtos ORDER BY cod ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no updateProduto. "+ex)    
        }   
        finally
        {
            await this.disconnect(cliente);
        }
    }
    
    async updateProdutoNome(cod, nome){

        let cliente = new Client(DBconfigs);

        try
        {    
            await this.connect(cliente);

            const query = {
                text: 'UPDATE produtos SET "nome" = $2 WHERE "cod" = $1',
                values: [cod, nome]
            };
            await cliente.query(query);

            console.log("Valor atualizado na tabela!");
            const resultado = await cliente.query("SELECT * FROM produtos ORDER BY cod ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no updateProduto. "+ex)    
        }   
        finally
        {
            await this.disconnect(cliente);
        }
    } 

    async updateProdutoPreco(cod, preco){

        let cliente = new Client(DBconfigs);

        try
        {    
            await this.connect(cliente);

            const query = {
                text: 'UPDATE produtos SET "preço" = $2 WHERE "cod" = $1',
                values: [cod, preco]
            };
            await cliente.query(query);

            console.log("Valor atualizado na tabela!");
            const resultado = await cliente.query("SELECT * FROM produtos ORDER BY cod ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no updateProduto. "+ex)    
        }   
        finally
        {
            await this.disconnect(cliente);
        }
    } 
    
    async updateProdutoQuantidade(cod, qtd){

        let cliente = new Client(DBconfigs);

        try
        {    
            await this.connect(cliente);

            const query = {
                text: 'UPDATE produtos SET "quantidade" = $2 WHERE "cod" = $1',
                values: [cod, qtd]
            };
            await cliente.query(query);

            console.log("Valor atualizado na tabela!");
            const resultado = await cliente.query("SELECT * FROM produtos ORDER BY cod ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no updateProduto. "+ex)    
        }   
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async updateProdutoCategoria(cod, categoria){

        let cliente = new Client(DBconfigs);

        try
        {    
            await this.connect(cliente);

            const query = {
                text: 'UPDATE produtos SET "categoria" = $2 WHERE "cod" = $1',
                values: [cod, categoria]
            };
            await cliente.query(query);

            console.log("Valor atualizado na tabela!");
            const resultado = await cliente.query("SELECT * FROM produtos ORDER BY cod ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no updateProduto. "+ex)    
        }   
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async updateProdutoOrigem(cod, origem){

        let cliente = new Client(DBconfigs);

        try
        {    
            await this.connect(cliente);

            const query = {
                text: 'UPDATE produtos SET "origem" = $2 WHERE "cod" = $1',
                values: [cod, origem]
            };
            await cliente.query(query);

            console.log("Valor atualizado na tabela!");
            const resultado = await cliente.query("SELECT * FROM produtos ORDER BY cod ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no updateProduto. "+ex)    
        }   
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async deleteProduto(cod)
    {
        let cliente = new Client(DBconfigs);

        try
        {
            await this.connect(cliente);

            const query = {
                text: 'DELETE FROM produtos WHERE cod = $1',
                values: [cod]
            };
            await cliente.query(query);

            console.log("Produto removido da tabela na tabela!");

            const resultado = await cliente.query("SELECT * FROM produtos ORDER BY cod ASC");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no deleteProduto. "+ex)    
        } 
        finally
        {
            await this.disconnect(cliente);
        }
    }

    // Realiza compra e valida
    async buyProduct(code, quantity, cart)
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);             
            
            const query = {
                text: 'SELECT DISTINCT * FROM produtos WHERE cod=$1 AND quantidade >= $2',
                values: [code, quantity]
            };

            const resp = await cliente.query(query);
            if(resp.rowCount > 0 && resp.rows != [])
            {
                let product = new Product();
                let _cod = resp.rows[0].cod;
                let _nome = resp.rows[0].nome.trim();
                let _preco = resp.rows[0].preço;
                let _quantidade = resp.rows[0].quantidade;
                let _categoria = resp.rows[0].categoria.trim();
                let _origem = resp.rows[0].origem.trim();

                product.setCod(_cod);
                product.setNome(_nome);
                product.setPreco(_preco);
                product.setQuantidade(quantity);
                product.setCategoria(_categoria);
                product.setOrigem(_origem);

                await this.updateProduto(_cod, _nome, _preco, _quantidade-quantity, _categoria, _origem);

                cart.addProduct(product);
            }
            else
            {
                console.clear();
                console.log('There is no available product with the inserted code');
                await App.waitKey();
            }

            //const resultado = await cliente.query(query);
            //console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getProdutos. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
            return cart;
        }
    }

    async getProdutos()
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);             
            
            const query = 'SELECT * FROM produtos ORDER BY cod ASC';
            const resultado = await cliente.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getProdutos. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async getProdutosWithLessThen5()
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);             
            
            const query = 'SELECT * FROM produtos WHERE quantidade < 5 ORDER BY cod ASC';
            const resultado = await cliente.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getProdutos. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async getProductsWithinThePriceRange(upValue, lowValue)
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);    
            
            const query = {
                text: 'SELECT * FROM produtos WHERE preço <= $1 AND preço >= $2 ORDER BY cod ASC',
                values: [upValue, lowValue]
            };

            const resultado = await cliente.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getProdutos. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async getProdutoByName(name)
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);                  
            
            const query = {
                text: 'SELECT * FROM produtos WHERE nome LIKE $1',
                values: ['%'+name+'%']
            };

            const resultado = await cliente.query(query);

            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getProdutos. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async getProdutoByCode(cod)
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);    
            
            const query = {
                text: 'SELECT * FROM produtos WHERE cod = $1',
                values: [cod]
            };

            const resultado = await cliente.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getProdutos. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async IsProductExistByCode(cod){
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);    
            
            const query = 'SELECT COUNT(*) FROM produtos WHERE cod = $1';
            const values = [cod];
        
            const result = await cliente.query(query, values);
            const count = parseInt(result.rows[0].count);

            if (count > 0){
                await this.disconnect(cliente);
                return 1; //Exist Product
            }else{
                await this.disconnect(cliente);
                return 0; //Non-exist Product
            }
        }
        catch(ex){
            console.log("Ocorreu erro ao verificar a existência do produto. "+ex)    
        }

    }

    async getProdutoByCategory(category)
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);                  
            
            const query = {
                text: 'SELECT * FROM produtos WHERE categoria LIKE $1 ORDER BY cod ASC',
                values: ['%'+category+'%']
            };

            const resultado = await cliente.query(query);

            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getProdutos. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async getProdutoByOrigin(origin)
    {
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);    
            
            const query = {
                text: 'SELECT * FROM produtos WHERE origem = $1 ORDER BY cod ASC',
                values: [origin]
            };

            const resultado = await cliente.query(query);
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu erro no getProdutos. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async realocarItens(item_cod, item_quantidade){
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);    
            
            const query = 'CALL RecolocarItensDoCarrinho($1, $2)';
            const values = [item_cod, item_quantidade];
            
            await cliente.query(query, values);
            console.log("Itens realocados?");
        }
        catch(ex){
            console.log("Ocorreu erro na função. "+ex)    
        }
        finally
        {
            await this.disconnect(cliente);
        }
    }

    async reportProductInformation(){
        let cliente = new Client(DBconfigs);

        try
        {   
            await this.connect(cliente);             
            
            const query = 'SELECT COUNT(*) AS Total_de_itens, SUM(preço * quantidade) AS Preço_total FROM Produtos';
            const resultado = await cliente.query(query);
            console.table(resultado.rows);
            
            const csvString = resultado.rows.map(row => Object.values(row).join(',')).join('\n');
                       
            fs.writeFile('./report/report_produto.csv', csvString, (err) => {
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

module.exports = ProdutoController;