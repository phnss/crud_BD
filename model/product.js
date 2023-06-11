class Product {
    constructor(cod, nome, preco, quantidade) {
      this.cod = cod;
      this.nome = nome;
      this.preco = preco;
      this.quantidade = quantidade;
      this.updateTotal();
    }
  
    // Getter for cod
    getCod() {
      return this.cod;
    }
    // Setter for cod
    setCod(cod) {
      this.cod = cod;
    }
    // Getter for nome
    getNome() {
      return this.nome;
    }
    // Setter for nome
    setNome(nome) {
      this.nome = nome;
    }
    // Getter for preco
    getPreco() {
      return this.preco;
    }
    // Setter for preco
    setPreco(preco) {
      this.preco = preco;
      this.updateTotal();
    }
    // Getter for quantidade
    getQuantidade() {
      return this.quantidade;
    }

    increaseQuantity()
    {
      this.setQuantidade(this.getQuantidade()+1);
    }

    decreaseQuantity()
    {
      if(this.getQuantidade() > 0)
        this.setQuantidade(this.getQuantidade()-1);
    }

    // Setter for quantidade
    setQuantidade(quantidade) {
      this.quantidade = quantidade;
      this.updateTotal();
    }
    updateTotal()
    {
      this.total = this.preco*this.quantidade;
    }
  }

  module.exports = Product;