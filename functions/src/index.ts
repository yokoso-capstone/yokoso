import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import {FunctionsErrorCode} from "firebase-functions/v1/https";

const STRIPE_SECRET_KEY = functions.config().stripe_test_mode.secret_key;
const STRIPE_WH_SECRET = functions.config().stripe_test_mode.webhook_secret;
const stripe = new Stripe(STRIPE_SECRET_KEY, {apiVersion: "2020-08-27"});

admin.initializeApp();

const firestore = admin.firestore();
const LISTING_COLLECTION_NAME = "listings";
const TENANT_REQUEST_COLLECTION_NAME = "tenant-requests";

type ListingVisibility = "public" | "hidden";

type RequestStatus = "sent" | "pending" | "rejected" | "accepted";

interface TenantRequest {
  listing: {
    data: {
      details: { title: string };
      images?: string[];
      lease: { depositPrice: number };
      owner: { firstName: string; lastName: string };
    };
    id: string;
  };
  status: RequestStatus;
  tenantUid: string;
}

interface PaymentIntent {
  metadata: { tenantRequestId?: string };
}

exports.createStripeCheckoutDeposit = functions.https.onCall(
    async (data, context) => {
      const uid = context.auth?.uid;
      const request = context.rawRequest;
      const origin = request.headers.origin;
      const {tenantRequestId} = data ?? {};

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
      if (!tenantRequestId) {
        const errorType: FunctionsErrorCode = "invalid-argument";
        const errorMsg = "Tenant request ID must be provided.";

        throw new functions.https.HttpsError(errorType, errorMsg);
      }

      const successParams = "success=true&session_id={CHECKOUT_SESSION_ID}";
      const successUrl = `${origin}/dashboard/requests/?${successParams}`;
      const cancelUrl = `${origin}/dashboard/requests/?cancelled=true`;

      const tenantRequestRef = firestore
          .collection(TENANT_REQUEST_COLLECTION_NAME)
          .doc(tenantRequestId);

      try {
        const tenantRequestSnapshot = await tenantRequestRef.get();
        const tenantRequestData = tenantRequestSnapshot.data() as
        | TenantRequest
        | undefined;

        if (!tenantRequestData) {
          const errorType: FunctionsErrorCode = "not-found";
          const errorMsg = `Document (${tenantRequestId}) was not found.`;

          throw new functions.https.HttpsError(errorType, errorMsg);
        }

        const {tenantUid, status, listing} = tenantRequestData;

        if (tenantUid !== uid) {
          const errorType: FunctionsErrorCode = "permission-denied";
          const errorMsg = "Tenant request belongs to another user.";

          throw new functions.https.HttpsError(errorType, errorMsg);
        }

        if (status !== "pending") {
          const errorType: FunctionsErrorCode = "permission-denied";
          const errorMsg = "Cannot pay deposit for non-pending request.";

          throw new functions.https.HttpsError(errorType, errorMsg);
        }

        const {details, images, lease, owner} = listing.data;

        if (
          !details?.title ||
          !lease?.depositPrice ||
          !owner?.firstName ||
          !owner?.lastName
        ) {
          const errorType: FunctionsErrorCode = "not-found";
          const errorMsg = "Listing details not found.";

          throw new functions.https.HttpsError(errorType, errorMsg);
        }

        // Adjust price from dollars to cents
        const adjustedPrice = lease.depositPrice * 100;
        const name = `Deposit payment to ${owner.firstName} ${owner.lastName}`;
        const description = `For listing "${details.title}"`;

        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency: "CAD",
                unit_amount: adjustedPrice,
                product_data: {
                  name: name,
                  description: description,
                  images: images,
                },
              },
            },
          ],
          payment_intent_data: {metadata: {tenantRequestId}},
          payment_method_types: ["card"],
          mode: "payment",
          success_url: successUrl,
          cancel_url: cancelUrl,
        });

        return {session_id: session.id};
      } catch (err) {
        console.log(err);

        const errorType: FunctionsErrorCode = "unknown";
        const errorMsg = "There was an issue processing your request.";

        throw new functions.https.HttpsError(errorType, errorMsg);
      }
    }
);

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    res.status(400).send("stripe-signature was not provided.");
    return;
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WH_SECRET);
  } catch (err) {
    const error = err as { message: string };
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  if (event.type !== "payment_intent.succeeded") {
    console.log(`Unhandled event type ${event.type}`);
    res.send();
    return;
  }

  try {
    const paymentIntent = event.data.object as PaymentIntent;
    const {tenantRequestId} = paymentIntent.metadata;

    if (!tenantRequestId) {
      res.status(400).send("Tenant request ID must be provided.");
      return;
    }

    const batch = firestore.batch();

    const tenantRequestRef = firestore
        .collection(TENANT_REQUEST_COLLECTION_NAME)
        .doc(tenantRequestId);
    const requestStatusUpdate: { status: RequestStatus } = {
      status: "accepted",
    };

    batch.update(tenantRequestRef, requestStatusUpdate);

    const tenantRequestSnapshot = await tenantRequestRef.get();
    const tenantRequestData = tenantRequestSnapshot.data() as
      | TenantRequest
      | undefined;

    if (!tenantRequestData) {
      res.status(400).send(`Tenant request ${tenantRequestId} not found.`);
      return;
    }

    const listingId = tenantRequestData.listing.id;
    const listingRef = firestore
        .collection(LISTING_COLLECTION_NAME)
        .doc(listingId);
    const listingVisibilityUpdate: { visibility: ListingVisibility } = {
      visibility: "hidden",
    };

    batch.update(listingRef, listingVisibilityUpdate);

    const tenantRequestStatusToReject: RequestStatus[] = ["sent", "pending"];
    const requestsToRejectRef = firestore
        .collection(TENANT_REQUEST_COLLECTION_NAME)
        .where("listing.id", "==", listingId)
        .where("status", "in", tenantRequestStatusToReject);
    const requestsToRejectSnapshot = await requestsToRejectRef.get();
    const requestsToRejectIds = requestsToRejectSnapshot.docs
        .map((doc) => doc.id)
        .filter((id) => id !== tenantRequestId);

    requestsToRejectIds.forEach((id) => {
      const requestRef = firestore
          .collection(TENANT_REQUEST_COLLECTION_NAME)
          .doc(id);
      const requestStatusUpdate: { status: RequestStatus } = {
        status: "rejected",
      };

      batch.update(requestRef, requestStatusUpdate);
    });

    await batch.commit();
  } catch (err) {
    const error = err as { message: string };
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  res.send();
  return;
});
