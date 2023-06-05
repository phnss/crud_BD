const ProdutoController = require('../controller/ProdutoController');
const App = require('../app')

class ProductInterface
{
    constructor()
    {
        this.produtoController = new ProdutoController();
    }
    
    async insertProduct()
    {
        const cod = await App.promptUserInput('Enter product code: ');
        const nome = await App.promptUserInput('Enter product name: ');
        const preco = await App.promptUserInput('Enter product price: ');
        const qtd = await App.promptUserInput('Enter product quantity: ');
        await this.produtoController.insertProduto(cod, nome, preco, qtd);
    }

    async updateProduct()
    {
        const updateCod = await App.promptUserInput('Enter the code of the product to update: ');
        const updateNome = await App.promptUserInput('Enter the new name for the product: ');
        const updatePreco = await App.promptUserInput('Enter the new price for the product: ');
        const updateQtd = await App.promptUserInput('Enter the new quantity for the product: ');
        await this.produtoController.updateProduto(updateCod, updateNome, updatePreco, updateQtd);
    }

    async deleteProduct()
    {
        const deleteCod = await App.promptUserInput('Enter the code of the product to delete: ');
        await this.produtoController.deleteProduto(deleteCod);
    }

    async listAllProducts()
    {
        await this.produtoController.getProdutos();
    }

    async getProductByName()
    {
        const searchName = await App.promptUserInput('Enter the name of the product to search for: ');
        await this.produtoController.getProdutoByName(searchName);
    }

    async getProductByCode()
    {
        const code = await App.promptUserInput('Enter the code of the product: ');
        await this.produtoController.getProdutoByCode(code);
    }

    async getProductById()
    {
        const id = await App.promptUserInput('Enter the id of the product: ');
        await this.produtoController.getProdutoById(id);
    }

    async getProductReport()
    {
        this.produtoController.reportProductInformation();
    }

    async printMenuOptions()
    {
        console.log('1. Insert a new product');
        console.log('2. Update a product');
        console.log('3. Delete a product');
        console.log('4. List all products');
        console.log('5. Get product by name');
        console.log('6. Get product by code');
        console.log('7. Report about products')
        console.log('8. Back');
    }

    async run() 
    {
        while (true) 
        {
            console.clear();
            console.log('[PRODUCT MENU]');
            await this.printMenuOptions();

            const command = await App.promptUserInput('Enter a command number: ');

            switch (command) 
            {
                case '1':
                    await this.insertProduct();
                    break;
                case '2':
                    await this.updateProduct();
                    break;
                case '3':
                    await this.deleteProduct();
                    break;
                case '4':
                    await this.listAllProducts();
                    await App.waitKey();
                    break;
                case '5':
                    await this.getProductByName();
                    await App.waitKey();
                    break;
                case '6':
                    await this.getProductByCode();
                    await App.waitKey();
                    break;
                case '7':
                    await this.getProductReport();
                    await App.waitKey();
                    break;
                case '8':
                    //await closeApplication();  
                    return;  
                default:
                    await App.invalidCommand();
            }
        }
    }
};

module.exports = ProductInterface;