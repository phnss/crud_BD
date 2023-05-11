const DBconfigs = require('./configs/DBconfigs');
const Client = require('pg').Client
//const cliente = new Client(DBconfigs);

//----- FUNÇÕES ASSÍNCRONAS ------
start();

async function start()
{
    try 
    {
        //await deleteProduto(0);
        await insertProduto(0, 'maçã', 1.00, 1);
        await insertProduto(1, 'laranja', 1.00, 1);
        //await getProdutos();
        //await getProdutoByName('maçã');
        //await updateProduto(0, 'mamão', 2, 20);
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
        await cliente.query('INSERT INTO produtos("cod", "nome", "preço", "quantidade") values('+"'"+cod+"','"+nome+"','"+preco+"','"+qtd+"');");
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

        const query = `UPDATE ??
                   SET ?? = ? 
                   WHERE ?? = ?`;

        const values = ['produtos', 'nome', nome, 'cod', cod];

        connection.query(query, values, (error, result) => {  // sends queries
            connection.end();                                 // closes connection
            if (error) throw error;
            console.log(connection.sql);  // UPDATE `users` 
        });

        //await cliente.query(query, values);
        //console.log("Valor atualizado na tabela!");
        //const resultado = await cliente.query("SELECT * FROM produtos");
        //console.table(resultado.rows);
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

        await cliente.query("DELETE FROM produtos WHERE cod = '"+cod+"';");
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
        const resultado = await cliente.query("SELECT * FROM produtos WHERE nome = '"+name+"';"); //executa a querry SQL
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
        const resultado = await cliente.query("SELECT * FROM produtos"); //executa a querry SQL
        console.table(resultado.rows);                                 //Lista as tabela no terminal
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
        const resultado = await cliente.query("SELECT * FROM produtos WHERE cod = '"+cod+"';"); //executa a querry SQL
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
