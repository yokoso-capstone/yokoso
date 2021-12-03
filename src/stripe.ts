import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY = process.env.stripePublishableKey ?? "";

// Ensures environment variable is set at build time
if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Stripe publishable key must be defined.");
}

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
