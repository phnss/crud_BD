const DBconfigs = require('./configs/DBconfigs');
const Client = require('pg').Client
//const cliente = new Client(DBconfigs);

//----- FUNÇÕES ASSÍNCRONAS ------
start();

async function start()
{
    try 
    {
        //await deleteProduto(1);
        //await insertProduto(20, 'maçã', 1.00, 1);
        //await insertProduto(5, 'kiwi', 1.00, 1);
        //await getProdutos();
        //await getProdutoByName('maçã');
        //await updateProduto(20, 'melão', 2, 20);
        //await getProduto(1);
        //await disconnect();
    }
    catch(e) 
    {
        console.log("Ocorreu erro. "+ex)   
    } 
}

async function connect(cliente)
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

async function disconnect(cliente)
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

// inserir
async function insertProduto(cod, nome, preco, qtd)
{
    let cliente = new Client(DBconfigs);

    try
    {    
        connect(cliente);

        const query = {
            text: 'INSERT INTO produtos(cod, nome, preço, quantidade) VALUES($1, $2, $3, $4)',
            values: [cod, nome, preco, qtd]
        };
        await cliente.query(query);

        console.log("Valor inserido na tabela!");
        const resultado = await cliente.query("SELECT * FROM produtos");
        console.table(resultado.rows);
    }
    catch(ex){
        console.log("Ocorreu erro no insertProduto. "+ex)    
    }   
    finally
    {
        disconnect(cliente);
    }
}

async function updateProduto(cod, nome, preco, qtd)
{
    let cliente = new Client(DBconfigs);

    try
    {    
        connect(cliente);

        const query = {
            text: 'UPDATE produtos SET "nome" = $1, "preço" = $2, "quantidade" = $3 WHERE "cod" = $4',
            values: [nome, preco, qtd, cod]
        };
        await cliente.query(query);

        console.log("Valor atualizado na tabela!");
        const resultado = await cliente.query("SELECT * FROM produtos");
        console.table(resultado.rows);
    }
    catch(ex){
        console.log("Ocorreu erro no updateProduto. "+ex)    
    }   
    finally
    {
        disconnect(cliente);
    }
}

// remover
async function deleteProduto(cod)
{
    let cliente = new Client(DBconfigs);

    try
    {
        connect(cliente);

        const query = {
            text: 'DELETE FROM produtos WHERE cod = $1',
            values: [cod]
        };
        await cliente.query(query);

        console.log("Produto removido da tabela na tabela!");

        const resultado = await cliente.query("SELECT * FROM produtos");
        console.table(resultado.rows);
    }
    catch(ex){
        console.log("Ocorreu erro no deleteProduto. "+ex)    
    } 
    finally
    {
        disconnect(cliente);
    }
}

// pesquisar por nome
async function getProdutoByName(name)
{
    let cliente = new Client(DBconfigs);

    try
    {   
        connect(cliente);                  
        
        const query = {
            text: 'SELECT * FROM produtos WHERE nome = $1',
            values: [name]
        };

        const resultado = await cliente.query(query);

        console.table(resultado.rows);
    }
    catch(ex){
        console.log("Ocorreu erro no getProdutos. "+ex)    
    }
    finally
    {
        disconnect(cliente);
    }
}

// listar todos
async function getProdutos()
{
    let cliente = new Client(DBconfigs);

    try
    {   
        connect(cliente);             
        
        const query = 'SELECT * FROM produtos';
        const resultado = await cliente.query(query);
        console.table(resultado.rows);
    }
    catch(ex){
        console.log("Ocorreu erro no getProdutos. "+ex)    
    }
    finally
    {
        disconnect(cliente);
    }
}

// exibir um
async function getProduto(cod)
{
    let cliente = new Client(DBconfigs);

    try
    {   
        connect(cliente);    
        
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
        disconnect(cliente);
    }
}
