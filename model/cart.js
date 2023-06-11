const fs = require('fs');
const PriceHandler = require('./priceHandler');

class Cart 
{
    constructor() 
    {
        this.items = []
        this.priceHandler = new PriceHandler();
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

    getTotalPrice(customer)
    {
        return this.priceHandler.calculatePrice(customer, this);
    }
}

module.exports = Cart;