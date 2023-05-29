const readline = require('readline');
const SellerController = require('../controller/SellerController');

const sellerController = new SellerController();

const rli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUserInput(question) 
{
    return new Promise((resolve) => {
        rli.question(question, (answer) => {
        resolve(answer);
        });
    });
}

async function insertSeller()
{
    const name = await promptUserInput('Enter Seller name: ');
    const email = await promptUserInput('Enter Seller email: ');
    const password = await promptUserInput('Enter Seller password: ');
    await sellerController.insertSeller(name, email, password);
}

async function updateSeller()
{
    const updateID = await promptUserInput('Enter the ID of the Seller to update: ');
    const updateName = await promptUserInput('Enter the new name for the seller: ');
    const updateEmail = await promptUserInput('Enter the new email for the seller: ');
    const updatePassword = await promptUserInput('Enter the new senha for the seller: ');
    await sellerController.updateSeller(updateName, updateEmail, updatePassword, updateID);
}

async function deleteSeller()
{
    const id = await promptUserInput('Enter the ID of the Seller to delete: ');
    await sellerController.deleteSeller(id);
}

async function listAllSellers()
{
    await sellerController.getSellers();
}

async function getSellerByName()
{
    const searchName = await promptUserInput('Enter the name of the Seller to search for: ');
    await sellerController.getSellerByName(searchName);
}

async function getSellerByEmail()
{
    const email = await promptUserInput('Enter the Email of the Seller: ');
    await sellerController.getSellerByEmail(email);
}

async function getSellerByID()
{
    const id = await promptUserInput('Enter the id of the Seller: ');
    await sellerController.getSellerByID(id);
}

async function closeApplication()
{
    console.log('Exiting...');
    rli.close();
}

async function invalidCommand()
{
    console.log('Invalid command. Please enter a valid command number.');
}

async function printMenuOptions()
{
    console.log('1. Insert a new Seller');
    console.log('2. Update a Seller');
    console.log('3. Delete a Seller');
    console.log('4. List all Seller');
    console.log('5. Get Seller by name');
    console.log('6. Get Seller by email');
    console.log('7. Get Seller by ID');
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
                await insertSeller();
                break;
            case '2':
                await updateSeller();
                break;
            case '3':
                await deleteSeller();
                break;
            case '4':
                await listAllSellers();
                break;
            case '5':
                await getSellerByName();
                break;
            case '6':
                await getSellerByEmail();
                break;
            case '7':
                await getSellerByID();
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