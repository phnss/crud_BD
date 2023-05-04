const DBconfigs = require('./configs/DBconfigs');
const Client = require('pg').Client
const cliente = new Client(DBconfigs);

//----- FUNÇÕES ASSÍNCRONAS ------
start();

async function start()
{
    try 
    {
        await connect();
        //await deleteProduto(0);
        await insertProduto(0, 'maçã', 1.00, 1);
        await insertProduto(1, 'laranja', 1.00, 1);
        await getProdutos();
        await disconnect();
    }
    catch(e) 
    {
        console.log("Ocorreu erro. "+ex)   
    } 
}

async function connect()
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

async function disconnect()
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

async function getProdutos()
{
    try{                         
        const resultado = await cliente.query("SELECT * FROM produtos"); //executa a querry SQL
        console.table(resultado.rows);                                 //Lista as tabela no terminal
    }
    catch(ex){
        console.log("Ocorreu erro no getProdutos. "+ex)    
    }
}

async function insertProduto(cod, nome, preco, qtd)
{
    try{
        await cliente.query('INSERT INTO produtos("cod", "nome", "preço", "quantidade") values('+"'"+cod+"','"+nome+"','"+preco+"','"+qtd+"');");
        console.log("Valor inserido na tabela!");
        const resultado = await cliente.query("SELECT * FROM produtos");
        console.table(resultado.rows);
    }
    catch(ex){
        console.log("Ocorreu erro no insertProduto. "+ex)    
    }   
}

async function deleteProduto(cod){
    try{
        await cliente.query("DELETE FROM produtos WHERE cod = '"+cod+"';");
        console.log("Produto removido da tabela na tabela!");

        const resultado = await cliente.query("SELECT * FROM produtos");
        console.table(resultado.rows);
    }
    catch(ex){
        console.log("Ocorreu erro no deleteProduto. "+ex)    
    } 
}
