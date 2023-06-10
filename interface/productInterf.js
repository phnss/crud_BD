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
    
    async listAllProductsWithLessThen5()
    {
        await this.produtoController.getProdutosWithLessThen5();
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

    async printAdminMenuOptions()
    {
        console.log('[PRODUCT ADMIN MENU]');
        console.log('1. Insert a new product');
        console.log('2. Update a product');
        console.log('3. Delete a product');
        console.log('4. List all products');
        console.log('5. List all products with less than 5 quantity');
        console.log('6. Get product by name');
        console.log('7. Get product by code');
        console.log('8. Report about products')
        console.log('9. Back');
    }

    async runAdminMenu() 
    {
        while (true) 
        {
            console.clear();
            await this.printAdminMenuOptions();

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
                    break;
                case '5':
                    await this.listAllProductsWithLessThen5();
                    break;
                case '6':
                    await this.getProductByName();
                    break;
                case '7':
                    await this.getProductByCode();
                    break;
                case '8':
                    await this.getProductReport();
                    break;
                case '9':
                    //await closeApplication();  
                    return;  
                default:
                    await App.invalidCommand();
            }

            await App.waitKey();
        }
    }
};

module.exports = ProductInterface;