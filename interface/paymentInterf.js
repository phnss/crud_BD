const App = require('../app')
const PaymentController = require('../controller/PaymentController');
const PaymentMethods = require('../model/paymentMethods')

class PaymentInterface
{
    constructor(userdata, cart, seller)
    {
        this.paymentController = new PaymentController();
        this.userdata = userdata;
        this.cart = cart;
        this.seller = seller;
    }

    async printPaymentMethods()
    {
        console.log('[CHOOSE PAYMENT METHOD]');
        console.log('1. Cartao');
        console.log('2. Boleto');
        console.log('3. Pix');
        console.log('4. Berries');
        console.log('5. Cancel');
    }

    async chosePaymentMethod()
    {
        console.clear();
        await this.printPaymentMethods();

        const command = await App.promptUserInput('Enter a command number: ');
        let cancelOperations = false;

        switch (command) 
        {
            case '1':
                return [cancelOperations, PaymentMethods.Cartao];
            case '2':
                return [cancelOperations, PaymentMethods.Boleto];
            case '3':
                return [cancelOperations, PaymentMethods.Pix];
            case '4':
                return [cancelOperations, PaymentMethods.Berries];
            case '5':
                cancelOperations = true;
                return [cancelOperations, PaymentMethods.Undefined];
            default:
                return [cancelOperations, PaymentMethods.Undefined];
        }
    }

    async makePayment(paymentMethod)
    {
        await this.paymentController.insertPayment(
                                                    this.cart.getTotalPrice(this.userdata)[0],
                                                    this.userdata.getId(),
                                                    this.seller.getId(),
                                                    JSON.stringify(this.cart.getProducts())
                                                );
    }

    async run()
    {
        while (true) 
        {
            console.clear();

            let paymentResult = await this.chosePaymentMethod();
            let shouldCancelOperation = paymentResult[0];
            let paymentMethod = paymentResult[1];

            if(shouldCancelOperation == true)
                return;

            if(paymentMethod != PaymentMethods.Undefined)
            {
                await this.makePayment(paymentMethod);
                console.log('Payment Operation Finished for Method: ' + paymentMethod);
                await App.waitKey();
            }
        }
    }

};

module.exports = PaymentInterface;