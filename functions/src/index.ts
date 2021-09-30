import * as functions from "firebase-functions";
const stripe = require('stripe')(STRIPE_SECRET_KEY);

export const handler = functions.https.onRequest(async(req, res) => {
    if (req.method === 'POST') {
        try {
          // Create Checkout Sessions from body params.
          const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                // TODO: replace this with the `price` of the product you want to sell
                price: 'price_1JfFnlJf0fJIUSvGNnqqYVf8',
                quantity: 1,
                },
            ],
            payment_method_types: [
              'card',
            //   'acss_debit',
            //   'wechat_pay',
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
          });
          res.redirect(303, session.url);
        } catch (err) {
          // @ts-ignore
          res.status(err.statusCode || 500).json(err.message);
        }
      } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
      }});
