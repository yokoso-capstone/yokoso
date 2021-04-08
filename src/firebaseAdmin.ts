import admin from "firebase-admin";

const serviceAccount = process.env.FIREBASE_ADMINSDK_SA_KEY
  ? JSON.parse(process.env.FIREBASE_ADMINSDK_SA_KEY)
  : {};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestoreAdmin = admin.firestore();
