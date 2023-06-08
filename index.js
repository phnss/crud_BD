const CustomerController = require('./controller/CustomerController');
const ProdutoController = require('./controller/ProdutoController');
const SellerController = require('./controller/SellerController');
const SellerInterface = require('./interface/sellerInterf');
const Cart = require('./model/cart');
const Produto = require('./model/produto');
const App = require('./app');
const ProductInterface = require('./interface/productInterf');
const CustomerInterface = require('./interface/customerInterf');

async function printSellerMenu()
{
    while (true) 
    {
        console.clear();
        console.log('[SELLER MENU]');
        console.log('1. Manage Sellers');
        console.log('2. Manage Products');
        console.log('3. Manage Customers');
        console.log('4. Back to main menu');

        const command = await App.promptUserInput('Enter a command number: ');

        switch (command) 
        {
            case '1':
                cli = new SellerInterface();
                await cli.run();
                break;
            case '2':
                cli = new ProductInterface();
                await cli.run();
                break;
            case '3':
                cli = new CustomerInterface();
                await cli.run();  
            case '4':
                return;  
            default:
                await App.invalidCommand();
        }
    }
}

async function printCustomerMenu()
{
    while (true) 
    {
        console.clear();
        console.log('[CUSTOMER MENU]');
        console.log('1. Login');
        console.log('2. See profile data');
        console.log('3. Update data');
        console.log('5. Add to cart');
        console.log('4. Back to main menu');

        const command = await App.promptUserInput('Enter a command number: ');

        switch (command) 
        {
            case '1':
                cli = new SellerInterface();
                await cli.run();
                break;
            case '2':
                cli = new ProductInterface();
                await cli.run();
                break;
            case '3':
                cli = new CustomerInterface();
                await cli.run();  
            case '4':
                return;  
            default:
                await App.invalidCommand();
        }
    }
}

async function main()
{
    while (true) 
    {
        console.clear();
        console.log('** Juice Store | By Diego Reis and Pedro Nogueira ** \n');
        console.log('[MAIN MENU]');
        console.log('1. Seller Menu');
        console.log('2. Customer Menu');
        console.log('3. Exit');

        const command = await App.promptUserInput('Enter a command number: ');

        switch (command) 
        {
            case '1':
                await printSellerMenu();
                break;
            case '2':
                await printCustomerMenu();
                break;
            case '3':
                await App.closeApplication();  
                return;  
            default:
                await App.invalidCommand();
        }
    }
}

main();