require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//function that receives request to expect amount value to pass into stripe to make payment
exports.handler = async (event) => {
  try {
    //make payment intent using stripe
    const { amount } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      payment_method_types: ['card'],
    });
    //when done succesfully
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent })
    };

  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error })
    };
  }
};