const DBconfigs = require('./configs/DBconfigs');
const Client = require('pg').Client
const cliente = new Client(DBconfigs);

//----- FUNÇÕES ASSÍNCRONAS ------
getProdutos();
//insertProduto(3, 'maçã', 1.00, 1);
//deleteProduto(3);


async function getProdutos(){
    try{
        console.log("iniciando a conexão.");
        await cliente.connect();                                        //inicia a conexão
        console.log("Conexão bem sucedida!");                           
        const resultado = await cliente.query("SELECT * FROM produtos"); //executa a querry SQL
        console.table(resultado.rows);                                 //Lista as tabela no terminal
    }
    catch(ex){
        console.log("Ocorreu erro no getProdutos. "+ex)    
    }
    finally{
        await cliente.end();
        console.log("Cliente desconectado!");
    }
}

async function insertProduto(cod, nome, preco, qtd){
    try{
        console.log("iniciando a conexão.");
        await cliente.connect();
        console.log("Conexão bem sucedida!");
        await cliente.query('INSERT INTO produtos("cod", "nome", "preço", "quantidade") values('+"'"+cod+"','"+nome+"','"+preco+"','"+qtd+"');");
        console.log("Valor inserido na tabela!");

        const resultado = await cliente.query("SELECT * FROM produtos");
        console.table(resultado.rows);
    }
    catch(ex){
        console.log("Ocorreu erro no insertProduto. "+ex)    
    }
    finally{
        await cliente.end();
        console.log("Cliente desconectado!");
    }    
}

async function deleteProduto(cod){
    try{
        console.log("iniciando a conexão.");
        await cliente.connect();
        console.log("Conexão bem sucedida!");
        await cliente.query("DELETE FROM produtos WHERE cod = '"+cod+"';");
        console.log("Produto removido da tabela na tabela!");

        const resultado = await cliente.query("SELECT * FROM produtos");
        console.table(resultado.rows);
    }
    catch(ex){
        console.log("Ocorreu erro no insertProduto. "+ex)    
    }
    finally{
        await cliente.end();
        console.log("Cliente desconectado!");
    }    
}