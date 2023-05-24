const readline = require('readline');
const ProdutoController = require('./controller');

const produtoController = new ProdutoController();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUserInput(question) 
{
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
        resolve(answer);
        });
    });
}

async function insertProduct()
{
    const cod = await promptUserInput('Enter product code: ');
    const nome = await promptUserInput('Enter product name: ');
    const preco = await promptUserInput('Enter product price: ');
    const qtd = await promptUserInput('Enter product quantity: ');
    await produtoController.insertProduto(cod, nome, preco, qtd);
}

async function updateProduct()
{
    const updateCod = await promptUserInput('Enter the code of the product to update: ');
    const updateNome = await promptUserInput('Enter the new name for the product: ');
    const updatePreco = await promptUserInput('Enter the new price for the product: ');
    const updateQtd = await promptUserInput('Enter the new quantity for the product: ');
    await produtoController.updateProduto(updateCod, updateNome, updatePreco, updateQtd);
}

async function deleteProduct()
{
    const deleteCod = await promptUserInput('Enter the code of the product to delete: ');
    await produtoController.deleteProduto(deleteCod);
}

async function listAllProducts()
{
    await produtoController.getProdutos();
}

async function getProductByName()
{
    const searchName = await promptUserInput('Enter the name of the product to search for: ');
    await produtoController.getProdutoByName(searchName);
}

async function getProductByCode()
{
    const code = await promptUserInput('Enter the code of the product: ');
    await produtoController.getProdutoByCode(code);
}

async function getProductById()
{
    const id = await promptUserInput('Enter the id of the product: ');
    await produtoController.getProdutoById(id);
}

async function getProductReport()
{
    produtoController.reportProductInformation();
}

async function closeApplication()
{
    console.log('Exiting...');
    rl.close();
}

async function invalidCommand()
{
    console.log('Invalid command. Please enter a valid command number.');
}

async function printMenuOptions()
{
    console.log('1. Insert a new product');
    console.log('2. Update a product');
    console.log('3. Delete a product');
    console.log('4. List all products');
    console.log('5. Get product by name');
    console.log('6. Get product by code');
    console.log('7. Report about products')
    console.log('8. Exit');
}

async function main() 
{
    console.log('*** Juice Store ***');
    console.log('[By Diego Reis and Pedro Nogueira]\n');

    while (true) 
    {
        await printMenuOptions();

        const command = await promptUserInput('Enter a command number: ');

        switch (command) 
        {
            case '1':
                await insertProduct();
                break;
            case '2':
                await updateProduct();
                break;
            case '3':
                await deleteProduct();
                break;
            case '4':
                await listAllProducts();
                break;
            case '5':
                await getProductByName();
                break;
            case '6':
                await getProductByCode();
                break;
            case '7':
                await getProductReport();
                break;
            case '8':
                await closeApplication();  
                return;  
            default:
                await invalidCommand();
        }
    }
}

main();