const ProdutoInterf = require('./interface/produtoInterf');
const ClienteInterf = require('./interface/clienteInterf');

const readline = require('readline');

const produtoInterf = new ProdutoInterf();
const clienteInterf = new ClienteInterf();

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

  async function printMenuOptions()
{
    console.log('1. Produtos');
    console.log('2. Clientes');
    console.log('3. Exit');
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
                await produtoInterf.main();
                break;
            case '2':
                await clienteInterf.main();
                break;
            case '3':
                await closeApplication();  
                return;  
            default:
                await invalidCommand();
        }
    }
}

main();