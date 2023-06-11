const App = require('./app');
const SellerInterface = require('./interface/sellerInterf');
const ProductInterface = require('./interface/productInterf');
const CustomerInterface = require('./interface/customerInterf');
const SellerController = require('./controller/SellerController');
const CustomerController = require('./controller/CustomerController');
const { user } = require('./configs/DBconfigs');
const Customer = require('./model/customer');
const Cart = require('./model/cart');
const Product = require('./model/product');
const PriceHandler = require('./model/priceHandler');

async function loginAsAdmin()
{
    let controller = new SellerController();
    const email = await App.promptUserInput('Enter Seller Email: ');
    const password = await App.promptUserInput('Enter Seller Password: ');
    return await controller.loginSeller(email, password);
}

async function loginAsUser()
{
    let controller = new CustomerController();
    const email = await App.promptUserInput('Enter Customer Email: ');
    const password = await App.promptUserInput('Enter Customer Password: ');
    return await controller.loginCustomer(email, password);
}

async function runAdminMenu()
{
    let sellerData = await loginAsAdmin();

    if(!isLogged(sellerData))
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

function isLogged(data)
{
    return data.getId() != -1;
}

async function printUnloggedUserMenu()
{
    console.clear();
    console.log('[USER MENU (login to more features)]');
    console.log('1. Login');
    console.log('2. Add to cart');
    console.log('3. See cart');
    console.log('4. Cancel and Back to main menu');
}

async function showCart(userData, cart)
{
    console.clear();
    let items = cart.getProducts();

    if(items.length <= 0)
    {
        console.log('Cart is Empty...');
        return;
    }
    
    for(let i = 0; i < items.length; i++)
    {
        console.log(items[i]);
    }

    let totalPrice = cart.getTotalPrice(userData);
    let finalPrice = totalPrice[0];
    let discount = totalPrice[1];
    console.log('Total price: ' + finalPrice.toFixed(2));
    console.log('Discount: ' + discount.toFixed(2));
}

async function runUserUnloggedMenu(userData, cart)
{
    printUnloggedUserMenu(userData);
    let command = await App.promptUserInput('Enter a command number: ');

    switch (command) 
    {
        case '1':
            userData = await loginAsUser();

            if(!isLogged(userData))
            {
                console.clear();
                console.log('Password or email is not valid...');
                await App.waitKey();
            }
            return [false, userData, cart];
        case '2':
            console.log('A FAZER CARRINHO...');
            await App.waitKey();
            return [false, userData, cart];
        case '3':
            await showCart(userData, cart);
            await App.waitKey();
            return [false, userData, cart];
        case '4':
            return [true, userData, cart];
        default:
            await App.invalidCommand();
            return [false, userData, cart];
    }
}

async function printLoggedUserMenu(userData)
{
    console.clear();
    console.log('Welcome back, ' + userData.getNome() + '(' + userData.getEmail() + ')');
    console.log('[USER MENU]');
    console.log('1. See profile data');
    console.log('2. See lasts purchases');
    console.log('3. Add to cart');
    console.log('4. See cart');
    console.log('5. Cancel and Back to main menu');
}

async function runUserLoggedMenu(userData, cart)
{
    printLoggedUserMenu(userData);
    let command = await App.promptUserInput('Enter a command number: ');

    switch (command) 
    {
        case '1':
            console.clear();
            console.log('Nome: ' + userData.getNome())
            console.log('Email: ' + userData.getEmail())
            console.log('Address: ' + userData.getAddress())
            console.log('Watch One Piece: ' + userData.getWatchOnePiece())
            console.log('Is Flamengo: ' + userData.getIsFlamengo())
            await App.waitKey();
            return [false, userData, cart];
        case '3':
            console.log('A FAZER CARRINHO...');
            await App.waitKey();
            return [false, userData, cart];
        case '4':
            await showCart(userData, cart);
            await App.waitKey();
            return [false, userData, cart];
        case '5':
            return [true, userData, cart];
        default:
            await App.invalidCommand();
            return [false, userData, cart];
    }
}

async function runUserMenu()
{
    let userData = new Customer();
    let cart = new Cart();

    for (let index = 0; index < 10; index++) {
        cart.addProduct(new Product(index%3, index+'ia', index+1, 1));   
    }

    userData.setId(-1);
    userData.setAddress('undefined');

    while (true) 
    {
        let _;
        let shouldEndLoop;
        if(isLogged(userData))
        {
            _ = await runUserLoggedMenu(userData, cart);
            shouldEndLoop = _[0];
            userData = _[1];
            cart = _[2];
        }
        else
        {
            _ = await runUserUnloggedMenu(userData, cart);
            shouldEndLoop = _[0];
            userData = _[1];
            cart = _[2];
        }

        if(shouldEndLoop == true)
            return;
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