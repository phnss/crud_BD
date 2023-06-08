const readline = require('readline');
const SellerController = require('../controller/SellerController');
const App = require('../app')

class SellerInterface
{
    constructor()
    {
        this.sellerController = new SellerController();
    }

    async insertSeller()
    {
        const name = await App.promptUserInput('Enter Seller name: ');
        const email = await App.promptUserInput('Enter Seller email: ');
        const password = await App.promptUserInput('Enter Seller password: ');
        await this.sellerController.insertSeller(name, email, password);
    }
    
    async updateSeller()
    {
        const updateID = await App.promptUserInput('Enter the ID of the Seller to update: ');
        const updateName = await App.promptUserInput('Enter the new name for the seller: ');
        const updateEmail = await App.promptUserInput('Enter the new email for the seller: ');
        const updatePassword = await App.promptUserInput('Enter the new senha for the seller: ');
        await this.sellerController.updateSeller(updateName, updateEmail, updatePassword, updateID);
    }
    
    async deleteSeller()
    {
        const id = await App.promptUserInput('Enter the ID of the Seller to delete: ');
        await this.sellerController.deleteSeller(id);
    }
    
    async listAllSellers()
    {
        await this.sellerController.getSellers();
    }
    
    async getSellerByName()
    {
        const searchName = await App.promptUserInput('Enter the name of the Seller to search for: ');
        await this.sellerController.getSellerByName(searchName);
    }
    
    async getSellerByEmail()
    {
        const email = await App.promptUserInput('Enter the Email of the Seller: ');
        await this.sellerController.getSellerByEmail(email);
    }
    
    async getSellerByID()
    {
        const id = await App.promptUserInput('Enter the id of the Seller: ');
        await this.sellerController.getSellerByID(id);
    }

    async printMenuOptions()
    {
        console.log('1. Insert a new Seller');
        console.log('2. Update a Seller');
        console.log('3. Delete a Seller');
        console.log('4. List all Seller');
        console.log('5. Get Seller by name');
        console.log('6. Get Seller by email');
        console.log('7. Get Seller by ID');
        console.log('8. Back');
    }
    
    async run() 
    {
        while (true) 
        {
            console.clear();
            console.log('[SELLER MENU]');
            await this.printMenuOptions();
    
            const command = await App.promptUserInput('Enter a command number: ');
    
            switch (command) 
            {
                case '1':
                    await this.insertSeller();
                    break;
                case '2':
                    await this.updateSeller();
                    break;
                case '3':
                    await this.deleteSeller();
                    break;
                case '4':
                    await this.listAllSellers();
                    break;
                case '5':
                    await this.getSellerByName();
                    break;
                case '6':
                    await this.getSellerByEmail();
                    break;
                case '7':
                    await this.getSellerByID();
                    break;
                case '8':
                    //await this.closeApplication();  
                    return;  
                default:
                    await App.invalidCommand();
            }

            await App.waitKey();
        }
    }
};

module.exports = SellerInterface;