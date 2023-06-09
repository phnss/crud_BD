const App = require('./app');
const SellerInterface = require('./interface/sellerInterf');
const ProductInterface = require('./interface/productInterf');
const CustomerInterface = require('./interface/customerInterf');
const SellerController = require('./controller/SellerController');

async function loginAsAdmin()
{
    let controller = new SellerController();
    const email = await App.promptUserInput('Enter Seller Email: ');
    const password = await App.promptUserInput('Enter Seller Password: ');
    const sellerData = await controller.loginSeller(email, password);
    return sellerData;
}

async function runAdminMenu()
{
    let sellerData = await loginAsAdmin();

    if(sellerData.getId() == -1)
    {
        console.clear();
        console.log('Password or email is not valid...');
        await App.waitKey();
        return;
    }

    while (true) 
    {
        console.clear();
        console.log('Logged as ' + sellerData.name + '(' + sellerData.email + ')');
        console.log('[ADMIN MENU]');
        console.log('1. Manage Sellers');
        console.log('2. Manage Products');
        console.log('3. Manage Customers');
        console.log('4. Back to main menu');

        const command = await App.promptUserInput('Enter a command number: ');
        let cli;

        switch (command) 
        {
            case '1':
                cli = new SellerInterface();
                await cli.runAdminMenu();
                break;
            case '2':
                cli = new ProductInterface();
                await cli.runAdminMenu();
                break;
            case '3':
                cli = new CustomerInterface();
                await cli.runAdminMenu();  
            case '4':
                return;  
            default:
                await App.invalidCommand();
        }
    }
}

async function runUserMenu()
{
    while (true) 
    {
        console.clear();
        console.log('[USER MENU]');
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

async function runMainMenu()
{
    while (true) 
    {
        console.clear();
        console.log('** Juice Store | By Diego Reis and Pedro Nogueira ** \n');
        console.log('[MAIN MENU]');
        console.log('1. Admin Menu');
        console.log('2. Customer Menu');
        console.log('3. Exit');

        const command = await App.promptUserInput('Enter a command number: ');

        switch (command) 
        {
            case '1':
                await runAdminMenu();
                break;
            case '2':
                await runUserMenu();
                break;
            case '3':
                await App.closeApplication();  
                return;  
            default:
                await App.invalidCommand();
        }
    }
}

async function main()
{
    await runMainMenu();
}

main();