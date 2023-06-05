class Validator 
{
    constructor() {}
  
    validateEmail(email) 
    {
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return email.value.match(validRegex);
    }
}

module.exports = Validator;