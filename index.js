const ProdutoController = require('./controller');
const db = new ProdutoController();

start();

async function start()
{
    try 
    {
        // await db.deleteProduto(1);
        // await db.insertProduto(20, 'maçã', 1.00, 1);
        // await db.insertProduto(5, 'kiwi', 1.00, 1);
        // await db.getProdutos();
         await db.getProdutoByName('maçã');
        // await db.updateProduto(20, 'melão', 2, 20);
        // await db.getProduto(1);
    }
    catch(e) 
    {
        console.log("Ocorreu erro. "+ex)   
    } 
}