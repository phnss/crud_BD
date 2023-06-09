const readline = require('readline');
const SellerInterface = require('./interface/sellerInterf');
const ProductInterface = require('./interface/productInterf');
const CustomerInterface = require('./interface/customerInterf');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', data => {
      const byteArray = [...data]
      if (byteArray.length > 0 && byteArray[0] === 3) {
        console.log('^C')
        process.exit(1)
      }
      process.stdin.setRawMode(false)
      resolve()
    }))
};

class App
{   
    // Console Operations --------
    static async closeApplication()
    {
        console.log('Exiting...');
        rl.close();
    }
    
    static async invalidCommand()
    {
        console.log('Invalid command. Please enter a valid command number.');
    }

    static async waitKey() 
    {
        console.log('Press any key to continue..')
        await keypress();
    }

    static async promptUserInput(question) 
    {
        return new Promise((resolve) => {
            rl.question(question, (answer) => {
            resolve(answer);
            });
        });
    }
    
    // Menus ------------
    async #runAdminMenu()
    {
        while (true) 
        {
            console.clear();
            console.log('[ADMIN MENU]');
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

    async #runUserMenu()
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

    async #runMainMenu()
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
                    await this.#runAdminMenu();
                    break;
                case '2':
                    await this.#runUserMenu();;
                    break;
                case '3':
                    await App.closeApplication();  
                    return;  
                default:
                    await App.invalidCommand();
            }
        }
    }

    async run()
    {
        await this.#runMainMenu();
    }
};

module.exports = App;