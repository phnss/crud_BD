class Cart 
{
    constructor() 
    {
        this.items = []
    }
  
    addProduct(product) 
    {
        // Case already exists
        for (let i = 0; i < this.items.length; i++) 
        {
            if(this.items[i].getCod() == product.getCod())
            {
                this.items[i].increaseQuantity();
                return;
            }
        }

        // Otherwise
        this.items.push(product)
    }

    getProducts()
    {
        return this.items;
    }
}

module.exports = Cart;