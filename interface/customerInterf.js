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
        const senha = await App.promptUserInput('Enter client senha: ');
        await this.customerController.insertCliente(nome, email, senha);
    }

    async updateCliente()
    {
        const updateID = await App.promptUserInput('Enter the ID of the Client to update: ');
        const updateNome = await App.promptUserInput('Enter the new name for the client: ');
        const updateEmail = await App.promptUserInput('Enter the new email for the client: ');
        const updateSenha = await App.promptUserInput('Enter the new senha for the client: ');
        await this.customerController.updateCliente(updateNome, updateEmail, updateSenha, updateID);
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
                    await App.waitKey();
                    break;
                case '5':
                    await this.getClienteByName();
                    await App.waitKey();
                    break;
                case '6':
                    await this.getClienteByEmail();
                    await App.waitKey();
                    break;
                case '7':
                    await this.getClienteByID();
                    await App.waitKey();
                    break;
                case '8':
                    await this.getClientReport();
                    await App.waitKey();
                    break;
                case '9':
                    await this.getFlamenguistas();
                    await App.waitKey();
                    break;
                case '10':
                    await this.getOnePieceFans();
                    await App.waitKey();
                    break;
                case '11':
                    //await closeApplication();  
                    return;  
                default:
                    await App.invalidCommand();
            }
        }
    }
};

module.exports = CustomerInterface;