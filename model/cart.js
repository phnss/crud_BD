class Cart 
{
    constructor() 
    {
        this.items = []
    }
  
    addProduct(product) 
    {
        this.items.push(product)
    }

    getProducts()
    {
        return this.items;
    }
}

module.exports = Cart;