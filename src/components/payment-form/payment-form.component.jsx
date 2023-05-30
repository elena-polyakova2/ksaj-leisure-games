import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { PaymentFormContainer, FormContainer } from './payment-form.styles';


const PaymentForm = () => {

  const stripe = useStripe();
  const elements = useElements();

  const paymentHangler = async (e) => {
  e.preventDefault();

  if(!stripe || !elements) {
    return;
  }
  
  //request for payment
  const response = await fetch('/.netlify/functions/create-payment-intent', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount: 10000 }),
  }).then((res) => res.json());

  const clientSecret = response.paymentIntent.client_secret;
  console.log(clientSecret);

  //create the actual payment
  const paymentResult = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
      billing_details: {
        name: 'Elena Polyakova'
      }
    }
  });

  if (paymentResult.error) {
    alert(paymentResult.error);
  } else {
    if(paymentResult.paymentIntent.status === 'succeeded') {
      alert('Payment was successful.');
    }
  }
}

  return(
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHangler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
      </FormContainer>
    </PaymentFormContainer>
  )
};

export default PaymentForm;