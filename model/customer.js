class Customer {
    constructor(id, nome, email, senha) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.senha = senha;
    }
  
    // Getter for id
    getId() {
      return this.id;
    }
    // Setter for id
    setId(id) {
      this.id = id;
    }
    // Getter for nome
    getNome() {
      return this.nome;
    }
    // Setter for nome
    setNome(nome) {
      this.nome = nome;
    }
    // Getter for email
    getEmail() {
      return this.email;
    }
    // Setter for email
    setEmail(email) {
      this.email = email;
    }
    // Getter for senha
    getSenha() {
      return this.senha;
    }
    // Setter for senha
    setSenha(senha) {
      this.senha = senha;
    }
  }

  module.exports = Customer;