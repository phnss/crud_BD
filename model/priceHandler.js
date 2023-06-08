const Customer = require('./customer.js');
const Produto = require('./produto.js');
const Cart = require('./cart.js');

class PriceHandler
{
    constructor(){}

    static get DiscountPercent() { return 0.1; }

    calculatePrice(customer, cart)
    {
        let produtos = cart.getProdutos();
        let price = 0;
        for (let i = 0; i < produtos.length; i++) 
        {
            price += produtos[i].preco * produtos[i].quantidade;
        }

        price -= this.calculateDiscount(customer, price);
        return price;
    }

    // Has 10 percent off case:
    // isFlamengo is true
    // watchOnePiece is true
    // is from 'Sousa'
    calculateDiscount(customer, totalPrice)
    {
        let hasDiscount = customer.getIsFlamengo() 
                          || customer.getWatchOnePiece()
                          || customer.getAddress().toUpperCase() == 'SOUSA';

        return (hasDiscount == true ? totalPrice*PriceHandler.DiscountPercent : 0);
    }
};

module.exports = PriceHandler;