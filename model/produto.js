class Produto {
    constructor(cod, nome, preco, quantidade) {
      this.cod = cod;
      this.nome = nome;
      this.preco = preco;
      this.quantidade = quantidade;
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
    }
    // Getter for quantidade
    getQuantidade() {
      return this.quantidade;
    }
    // Setter for quantidade
    setQuantidade(quantidade) {
      this.quantidade = quantidade;
    }
  }

  module.exports = Produto;