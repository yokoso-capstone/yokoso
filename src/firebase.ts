import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "@/src/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const firestoreTimestamp = firebase.firestore.Timestamp;

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

export const initAnalytics = async () => {
  const isSupported = await firebase.analytics.isSupported();

  if (firebaseConfig.measurementId && isSupported) {
    firebase.analytics();
  }
};

export default firebase;
