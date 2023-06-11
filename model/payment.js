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

module.exports = Payment;