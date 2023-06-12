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
        const categoria = await App.promptUserInput('Enter product category: ');
        const origem = await App.promptUserInput('Enter product origin: ');
        await this.produtoController.insertProduto(cod, nome, preco, qtd, categoria, origem);
    }
    // Função para comprar itens
    async buyProduct(cart)
    {
        await this.listAllProducts();

        console.log('You can go back inserting (back)');
        const productCod = await App.promptUserInput('Enter the code of the product to buy: ');
        
        if(productCod == 'back'){
            return;
        }
        
        const productQuant = await App.promptUserInput('Enter the quantity to buy: ');

        if(productQuant <= 0)
        {
            console.clear();
            console.log('Quantity must be greater or equals 1');
            await App.waitKey();
            return;
        }

        await this.produtoController.buyProduct(productCod, productQuant, cart);
    }

    async updateProduct()
    {
        await this.listAllProducts();
        const updateCod = await App.promptUserInput('Enter the code of the product to update: ');

        await this.runAdminMenuUpdate(updateCod);
        //const updateNome = await App.promptUserInput('Enter the new name for the product: ');
        //const updatePreco = await App.promptUserInput('Enter the new price for the product: ');
        //const updateQtd = await App.promptUserInput('Enter the new quantity for the product: ');
        //const updateCategory = await App.promptUserInput('Enter the new category for the product: ');
        //const updateOrigin = await App.promptUserInput('Enter the new origin for the product: ');
        //await this.produtoController.updateProduto(updateCod, updateNome, updatePreco, updateQtd, updateCategory, updateOrigin);
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

    async listAllProductsWithinThePriceRange()
    {
        const upValue = await App.promptUserInput('Enter the upper limiting value of the product to search for: ');
        const lowValue = await App.promptUserInput('Enter the lower limiting value of the product to search for: ');
        await this.produtoController.getProductsWithinThePriceRange(upValue, lowValue);
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

    async getProductByCategory()
    {
        const searchCategory = await App.promptUserInput('Enter the category of the product to search for: ');
        await this.produtoController.getProdutoByCategory(searchCategory);
    }

    async getProductByOrigin()
    {
        const searchOrigin = await App.promptUserInput('Enter the origin of the product to search for: ');
        await this.produtoController.getProdutoByOrigin(searchOrigin);
    }

    async getProductById()
    {
        const id = await App.promptUserInput('Enter the id of the product: ');
        await this.produtoController.getProdutoById(id);
    }

    async updateProductName(cod){
        const updateName = await App.promptUserInput('Enter the new name of the product: ');
        await this.produtoController.updateProdutoNome(cod, updateName);
    }

    async updateProductPrice(cod){
        const updatePrice = await App.promptUserInput('Enter the new price of the product: ');
        await this.produtoController.updateProdutoPreco(cod, updatePrice);
    }

    async updateProductQuantity(cod){
        const updateQuantity = await App.promptUserInput('Enter the new quantity of the product: ');
        await this.produtoController.updateProdutoQuantidade(cod, updateQuantity);
    }

    async updateProductCategory(cod){
        const updateCategory = await App.promptUserInput('Enter the new category of the product: ');
        await this.produtoController.updateProdutoCategoria(cod, updateCategory);
    }

    async updateProductOrigin(cod){
        const updateOrigin = await App.promptUserInput('Enter the new origin of the product: ');
        await this.produtoController.updateProdutoOrigem(cod, updateOrigin);
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
        console.log('6. List all products within the price range');
        console.log('7. Get product by name');
        console.log('8. Get product by code');
        console.log('9. Get product by category');
        console.log('10. Get product by origin');
        console.log('11. Report about products')
        console.log('12. Back');
    }

    async printAdminMenuOptionsUpdate()
    {
        console.log('[PRODUCT ADMIN MENU]');
        console.log('1. Update name');
        console.log('2. Update price');
        console.log('3. Update quantity');
        console.log('4. Update category');
        console.log('5. Update origin');
        console.log('6. Back');
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
                    await this.listAllProductsWithinThePriceRange();
                    break;
                case '7':
                    await this.getProductByName();
                    break;
                case '8':
                    await this.getProductByCode();
                    break;
                case '9':
                    await this.getProductByCategory();
                    break;
                case '10':
                    await this.getProductByOrigin();
                    break;
                case '11':
                    await this.getProductReport();
                    break;
                case '12':
                    //await closeApplication();  
                    return;  
                default:
                    await App.invalidCommand();
            }

            await App.waitKey();
        }
    }

    async runAdminMenuUpdate(cod){
        while (true) 
        {
            console.clear();

            await this.produtoController.getProdutoByCode(cod);

            await this.printAdminMenuOptionsUpdate();

            const command = await App.promptUserInput('Enter a command number: ');

            switch (command) 
            {
                case '1':
                    await this.updateProductName(cod);
                    break;
                case '2':
                    await this.updateProductPrice(cod);
                    break;
                case '3':
                    await this.updateProductQuantity(cod);
                    break;
                case '4':
                    await this.updateProductCategory(cod);
                    break;
                case '5':
                    await this.updateProductOrigin(cod);
                    break;
                case '6':
                    return;
                default:
                    await App.invalidCommand();
            }

            await App.waitKey();
        }
    }
};

module.exports = ProductInterface;