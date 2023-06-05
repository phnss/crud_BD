const readline = require('readline');
const ClienteController = require('./controller/CustomerController');
const ProdutoController = require('./controller/ProdutoController');
const SellerController = require('./controller/SellerController');
const Cart = require('./model/cart');
const Produto = require('./model/produto');

function testCart()
{
    cart = new Cart();

    for(i = 0; i < 10; i++)
    {
        let product = new Produto(i, i+'', 10, i);
        cart.addProduct(product);
    }

    console.table(cart.getProducts())
}