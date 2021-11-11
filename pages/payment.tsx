import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { functions } from "@/src/firebase";

const STRIPE_PUBLISHABLE_KEY = process.env.stripePublishableKey ?? "";

// Ensures environment variable is set at build time
if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Stripe publishable key must be defined.");
}

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const createStripeCheckout = functions.httpsCallable("createStripeCheckout");

export default function PreviewPage() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("cancelled")) {
      console.log(
        "Order cancelled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const createCheckout = async () => {
    let sessionResponse;

    try {
      // TODO: pass in listing ID
      sessionResponse = await createStripeCheckout();
    } catch (err) {
      // TODO: indicate error (auth)
      console.log(err);
      return;
    }

    const { session_id: sessionId } = sessionResponse.data;

    if (!sessionId) {
      // TODO: indicate error (API)
      console.log("API error");
      return;
    }

    const stripe = await stripePromise;
    const stripeError = await stripe?.redirectToCheckout({ sessionId });

    if (stripeError) {
      // TODO: indicate error (stripe)
      console.log(stripeError.error);
    }
  };

  return (
    <>
      <div>
        <button type="submit" onClick={createCheckout}>
          Checkout
        </button>
      </div>

      <style jsx>
        {`
          div {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </>
  );
}
