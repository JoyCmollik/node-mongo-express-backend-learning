const stripe = require('stripe')(process.env.STRIPE_SECRET);

const stripeController = async ( req, res ) => {
    const { purchase, total_amount, shipping_fee } = req.body;

    const totalOrderAmount = () => {
        // verify amount from database
        return total_amount + shipping_fee;
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalOrderAmount(),
        currency: 'usd'
    })

    console.log(paymentIntent);

    res.json({ clientSecret: paymentIntent.client_secret });
}

module.exports = stripeController;