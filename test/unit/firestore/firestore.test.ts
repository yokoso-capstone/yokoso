import * as firebase from "@firebase/testing";

const PROJECT_ID = "yokoso-staging";
const myId = "user-abc";
const theirId = "user-xyz";
const myAuth = { uid: myId };

function getFirestore(auth?: { uid: string }) {
  return firebase
    .initializeTestApp({ projectId: PROJECT_ID, auth })
    .firestore();
}

function getAdminFirestore() {
  return firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore();
}

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
});

describe("Firestore security rules", () => {
  describe("Public user collection", () => {
    it("Allows unauthenticated users to read public user data", async () => {
      const db = getFirestore();
      const testDoc = db.collection("users-public").doc("testDoc");

      await firebase.assertSucceeds(testDoc.get());
    });

    it("Allows authenticated users to create their public user data", async () => {
      const db = getFirestore(myAuth);
      const testDoc = db.collection("users-public").doc("user-abc");

      await firebase.assertFails(testDoc.set({}));
    });

    it("Disallows authenticated users to write to public user data belonging to a different user", async () => {
      const db = getFirestore(myAuth);
      const testCollection = db.collection("users-public");
      const testDoc = testCollection.doc(theirId);

      await firebase.assertFails(testCollection.add({}));
      await firebase.assertFails(testDoc.set({}));
      await firebase.assertFails(testDoc.update({}));
      await firebase.assertFails(testDoc.delete());
    });

    it("Disallows unauthenticated users from writing to public user data", async () => {
      const db = getFirestore();
      const testCollection = db.collection("users-public");
      const testDoc = testCollection.doc("user-abc");

      await firebase.assertFails(testCollection.add({}));
      await firebase.assertFails(testDoc.set({}));
      await firebase.assertFails(testDoc.update({}));
      await firebase.assertFails(testDoc.delete());
    });
  });

  describe("Listings collection", () => {
    it("Allows unauthenticated users to read listings marked public", async () => {
      const db = getFirestore();
      const testQuery = db
        .collection("listings")
        .where("visibility", "==", "public");

      await firebase.assertSucceeds(testQuery.get());
    });

    it("Disallows unauthenticated users to read listings marked private", async () => {
      const db = getFirestore();
      const testQuery = db
        .collection("listings")
        .where("visibility", "==", "private");

      await firebase.assertFails(testQuery.get());
    });

    it("Allows users to read their own listings", async () => {
      const db = getFirestore(myAuth);
      const testQuery = db
        .collection("listings")
        .where("owner.uid", "==", myId);

      await firebase.assertSucceeds(testQuery.get());
    });

    it("Disallows reading private listings belonging to another user", async () => {
      const admin = getAdminFirestore();
      const listingId = "private-listing";
      const setupDoc = admin.collection("listings").doc(listingId);
      await setupDoc.set({ owner: { uid: theirId }, visibility: "private" });

      const db = getFirestore(myAuth);
      const testRead = db.collection("listings").doc(listingId);

      await firebase.assertFails(testRead.get());
    });
  });

  describe("Chat room collection", () => {
    it("Allows creation of a new chat room", async () => {
      const db = getFirestore(myAuth);
      const data = { members: [myId, theirId] };
      const testCollection = db.collection("chat-rooms");

      await firebase.assertSucceeds(testCollection.add(data));
    });

    it("Disallows creation of a new chat room with one member", async () => {
      const db = getFirestore(myAuth);
      const data = { members: [myId] };
      const testCollection = db.collection("chat-rooms");

      await firebase.assertFails(testCollection.add(data));
    });

    it("Disallows creation of a new chat room without the user being a member", async () => {
      const db = getFirestore(myAuth);
      const data = { members: [theirId, theirId] };
      const testCollection = db.collection("chat-rooms");

      await firebase.assertFails(testCollection.add(data));
    });

    describe("Messages sub-collection", () => {
      it("Allows creation of messages", async () => {
        const db = getFirestore(myAuth);
        const chatRoomData = { members: [myId, theirId] };
        const chatRef = await db.collection("chat-rooms").add(chatRoomData);

        const messageData = {
          uid: myId,
          text: "hello",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };

        await firebase.assertSucceeds(
          chatRef.collection("messages").add(messageData)
        );
      });
    });
  });
});

afterAll(async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
  Promise.all(firebase.apps().map((app) => app.delete()));
});
