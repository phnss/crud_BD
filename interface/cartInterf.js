const readline = require('readline');
const ProdutoController = require('../controller/P_Controller');
const Cart = require('../model/cart');

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

function isCustomerLoginValid()
{
    return true;
}

function isSellerLoginValid()
{
    return true;
}

async function displayCartItems(cart)
{
    console.table(cart.getProdutos());
}

async function displayCartItems(cart)
{
    console.table(cart.getProdutos());
}

async function finishPayment(cart)
{
    console.log("Payment method not implemented yet.");
}

async function goToPayment(cart)
{
    if(!isCustomerLoginValid())
        console.log("Customer login is invalid.");
    else if(!isSellerLoginValid())
        console.log("Seller login is invalid.");
    else
        finishPayment(cart);
}

async function printMenuOptions()
{
    console.log('1. Add product to cart');
    console.log('2. Remove product from cart');
    console.log('3. See cart items');
    console.log('4. Go to payment');
        console.log(`5. ${isCustomerLoginValid() ? 'Log out' : 'Log in'}(customer)`);
        console.log(`6. ${isSellerLoginValid() ? 'Log out' : 'Log in'}(seller)`);
        console.log(`7. Create user (customer)`);
        console.log(`8. Create user (seller)`);
    console.log(`9. See all products available`);
    console.log('10. Exit');
}

async function printHeader()
{
    console.log('*** Juice Store ***');
    console.log('[By Diego Reis and Pedro Nogueira]\n');
}

async function main() 
{
    await printHeader();

    cart = new Cart();
    productController = new ProdutoController();

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
            case '10':
                await closeApplication();  
                return;  
            default:
                await invalidCommand();
        }
    }
}

main();