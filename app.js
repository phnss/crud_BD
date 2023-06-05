const readline = require('readline');

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
};

module.exports = App;