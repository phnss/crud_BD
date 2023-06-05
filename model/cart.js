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

    getProductsTable()
    {
        var t = []

        this.items.forEach((i) => {
            t.push({cod: i.cod, nome: i.nome, preco: i.preco, quantidade: i.quantidade, total: i.preco*i.quantidade})
        });

        return t;
    }
}

module.exports = Cart;