const PaymentMethods = {
    Cartao: 1,
    Boleto: 2,
    Pix: 3,
    Berries: 4,
    Undefined: 404
}

class Payment
{
    constructor(totalPrice, customerID, sellerId, paymentID)
    {
        this.totalPrice = totalPrice
        this.customerID = customerID,
        this.sellerId = sellerId
        this.paymentID = paymentID
    }
}