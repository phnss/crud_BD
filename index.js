const readline = require('readline');
const ClienteController = require('./controller/CustomerController');
const ProdutoController = require('./controller/ProdutoController');
const SellerController = require('./controller/SellerController');
const Cart = require('./model/cart');
const Produto = require('./model/produto');

function main()
{
    cart = new Cart();

    for(i = 0; i < 10; i++)
    {
        let product = new Produto(i, i+'', 10, i);
        cart.addProduct(product);
    }

    console.table(cart.getProducts())
}

main();

// var t = []
// t.push({name: 'abc', age: '44', location: 'india', phone: 56654345})
// t.push({name: 'abc', age: '44', location: 'india', phone: 56654345})
// console.table(t);