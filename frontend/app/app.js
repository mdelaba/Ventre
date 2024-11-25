import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./app.css";
import DeliveryForm from "./deliveryForm";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(stripePublishableKey);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Payment Method:", paymentMethod);

      const amountPayable = 100; // in cents

      const response = await fetch(
        "https://createpaymentintent-oqo3llm6oq-uc.a.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            paymentMethodId: paymentMethod.id,
            amount: amountPayable,
          }).toString(), // Convert to URL-encoded string
        }
      );

      const responseData = await response.json();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={cardStyle} />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const Login = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("https://adduser-oqo3llm6oq-uc.a.run.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        name,
        address,
      }).toString(), // Convert to URL-encoded string
    });

    const responseData = await response.json();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <Login />
      <PaymentForm />
      <DeliveryForm />
    </Elements>
  );
};

export default App;
