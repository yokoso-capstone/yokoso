import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import {FunctionsErrorCode} from "firebase-functions/v1/https";

const STRIPE_SECRET_KEY = functions.config().stripe_test_mode.secret_key;
const stripe = new Stripe(STRIPE_SECRET_KEY, {apiVersion: "2020-08-27"});

admin.initializeApp();

exports.createStripeCheckout = functions.https.onCall(
    async (data, context) => {
      const uid = context.auth?.uid;
      const request = context.rawRequest;
      const origin = request.headers.origin;
      const {listingId} = data ?? {};

      // Guard condition to ensure user is authenticated
      if (!uid) {
        const errorType: FunctionsErrorCode = "unauthenticated";
        const errorMsg = "The function must be called while authenticated.";

        throw new functions.https.HttpsError(errorType, errorMsg);
      }

      // Guard condition to ensure there is an origin for stripe to redirect to
      if (!origin) {
        const errorType: FunctionsErrorCode = "invalid-argument";
        const errorMsg = "Request header must contain an origin.";

        throw new functions.https.HttpsError(errorType, errorMsg);
      }

      // Guard condition to ensure listing ID is provided
      if (!listingId) {
        const errorType: FunctionsErrorCode = "invalid-argument";
        const errorMsg = "Listing ID must be provided.";

        throw new functions.https.HttpsError(errorType, errorMsg);
      }

      const successParams = "success=true&session_id={CHECKOUT_SESSION_ID}";
      const successUrl = `${origin}/payment/?${successParams}`;
      const cancelUrl = `${origin}/payment/?cancelled=true`;

      try {
        // TODO: dynamically populate price, name, description, ...
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency: "CAD",
                unit_amount: 100,
                product_data: {
                  name: "name",
                  description: "description",
                },
              },
            },
          ],
          payment_method_types: ["card"],
          mode: "payment",
          success_url: successUrl,
          cancel_url: cancelUrl,
        });

        return {session_id: session.id};
      } catch (err) {
        console.error(err);

        const errorType: FunctionsErrorCode = "unknown";
        const errorMsg = "There was an issue processing your request.";

        throw new functions.https.HttpsError(errorType, errorMsg);
      }
    }
);
