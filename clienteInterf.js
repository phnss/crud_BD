const readline = require('readline');
const ClienteController = require('./controller/C_Controller');

const clienteController = new ClienteController();

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

async function insertCliente()
{
    const nome = await promptUserInput('Enter client name: ');
    const email = await promptUserInput('Enter client email: ');
    const senha = await promptUserInput('Enter client senha: ');
    await clienteController.insertCliente(nome, email, senha);
}

async function updateCliente()
{
    const updateID = await promptUserInput('Enter the ID of the Client to update: ');
    const updateNome = await promptUserInput('Enter the new name for the client: ');
    const updateEmail = await promptUserInput('Enter the new email for the client: ');
    const updateSenha = await promptUserInput('Enter the new senha for the client: ');
    await clienteController.updateCliente(updateNome, updateEmail, updateSenha, updateID);
}

async function deleteCliente()
{
    const deleteID = await promptUserInput('Enter the ID of the Client to delete: ');
    await clienteController.deleteCliente(deleteId);
}

async function listAllClient()
{
    await clienteController.getCliente();
}

async function getClienteByName()
{
    const searchName = await promptUserInput('Enter the name of the Client to search for: ');
    await clienteController.getClienteByName(searchName);
}

async function getClienteByEmail()
{
    const email = await promptUserInput('Enter the Email of the Client: ');
    await clienteController.getClienteByEmail(email);
}

async function getClienteByID()
{
    const id = await promptUserInput('Enter the id of the Client: ');
    await clienteController.getClienteByID(id);
}

async function getClientReport()
{
    clienteController.reportClientInformation();
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
    console.log('1. Insert a new Client');
    console.log('2. Update a Client');
    console.log('3. Delete a Client');
    console.log('4. List all Client');
    console.log('5. Get Client by name');
    console.log('6. Get Client by email');
    console.log('7. Get Client by ID');
    console.log('8. Report about Client')
    console.log('9. Exit');
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
                await insertCliente();
                break;
            case '2':
                await updateCliente();
                break;
            case '3':
                await deleteCliente();
                break;
            case '4':
                await listAllClient();
                break;
            case '5':
                await getClienteByName();
                break;
            case '6':
                await getClienteByEmail();
                break;
            case '7':
                await getClienteByID();
                break;
            case '8':
                await getClientReport();
                break;
            case '9':
                await closeApplication();  
                return;  
            default:
                await invalidCommand();
        }
    }
}

main();