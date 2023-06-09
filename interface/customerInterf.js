const App = require('../app')
const CustomerController = require('../controller/CustomerController');

class CustomerInterface
{
    constructor()
    {
        this.customerController = new CustomerController();
    }

    async insertCliente()
    {
        const nome = await App.promptUserInput('Enter client name: ');
        const email = await App.promptUserInput('Enter client email: ');
        const password = await App.promptUserInput('Enter client password: ');
        const address = await App.promptUserInput('Enter client address: ');
        const isFlamengo = await App.promptUserInput('Is client flamengo? (0: false, 1: true)');
        const watchOnePiece = await App.promptUserInput('Client watch one piece? (0: false, 1: true)');
        
        if(isFlamengo != '0')
            isFlamengo = '1'

        if(watchOnePiece != '0')
            watchOnePiece = '1'

        await this.customerController.insertCliente(nome, email, password, address, isFlamengo, watchOnePiece);
    }

    async updateCliente()
    {
        const updateID = await App.promptUserInput('Enter the ID of the Client to update: ');
        const updateNome = await App.promptUserInput('Enter the new name for the client: ');
        const updateEmail = await App.promptUserInput('Enter the new email for the client: ');
        const updatePassword = await App.promptUserInput('Enter the new password for the client: ');
        const updateAddress = await App.promptUserInput('Enter client address: ');
        let updateIsFlamengo = await App.promptUserInput('Is client flamengo? (0: false, 1: true): ');
        let updateWatchOnePiece = await App.promptUserInput('Client watch one piece? (0: false, 1: true): ');
        
        if(updateIsFlamengo != '0')
            updateIsFlamengo = '1'

        if(updateWatchOnePiece != '0')
            updateWatchOnePiece = '1'

        await this.customerController.updateCliente(updateNome, updateEmail, updatePassword, updateAddress, updateIsFlamengo, updateWatchOnePiece, updateID);
    }

    async deleteCliente()
    {
        const id = await App.promptUserInput('Enter the ID of the Client to delete: ');
        await this.customerController.deleteCliente(id);
    }

    async listAllClient()
    {
        await this.customerController.getCliente();
    }

    async getClienteByName()
    {
        const searchName = await App.promptUserInput('Enter the name of the Client to search for: ');
        await this.customerController.getClienteByName(searchName);
    }

    async getClienteByEmail()
    {
        const email = await App.promptUserInput('Enter the Email of the Client: ');
        await this.customerController.getClienteByEmail(email);
    }

    async getClienteByID()
    {
        const id = await App.promptUserInput('Enter the id of the Client: ');
        await this.customerController.getClienteByID(id);
    }

    async getClientReport()
    {
        this.customerController.reportClienteInformation();
    }

    async getFlamenguistas()
    {
        await this.customerController.getFlamenguistas();
    }

    async getOnePieceFans()
    {
        await this.customerController.getOnePieceFans();
    }

    async printMenuOptions()
    {
        console.log('1. Insert a new Client');
        console.log('2. Update a Client');
        console.log('3. Delete a Client');
        console.log('4. List all Client');
        console.log('5. Get Client by name');
        console.log('6. Get Client by email');
        console.log('7. Get Client by ID');
        console.log('8. Report about Client');
        console.log('9. Get Flamenguistas');
        console.log('10. Get One Piece Fans');
        console.log('11. Back');
    }

    async run() 
    {
        while (true) 
        {
            console.clear();
            console.log('[CUSTOMER MENU]');
            await this.printMenuOptions();

            const command = await App.promptUserInput('Enter a command number: ');

            switch (command) 
            {
                case '1':
                    await this.insertCliente();
                    break;
                case '2':
                    await this.updateCliente();
                    break;
                case '3':
                    await this.deleteCliente();
                    break;
                case '4':
                    await this.listAllClient();
                    break;
                case '5':
                    await this.getClienteByName();
                    break;
                case '6':
                    await this.getClienteByEmail();
                    break;
                case '7':
                    await this.getClienteByID();
                    break;
                case '8':
                    await this.getClientReport();
                    break;
                case '9':
                    await this.getFlamenguistas();
                    break;
                case '10':
                    await this.getOnePieceFans();
                    break;
                case '11':
                    //await closeApplication();  
                    return;  
                default:
                    await App.invalidCommand();
            }

            await App.waitKey();
        }
    }
};

module.exports = CustomerInterface;