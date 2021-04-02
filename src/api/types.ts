import firebase from "firebase/app";
import { CollectionName } from "./collections";

export type timestamp = typeof firebase.database.ServerValue.TIMESTAMP | number;

export type UserPublic = {
  firstName: string;
  lastName: string;
  profilePicture?: string;
  verified?: boolean;
  createdAt: timestamp;
};

export type UserPrivate = {
  address: string;
  documents: {
    [title: string]: string;
  };
  createdAt: timestamp;
};

export type Listing = {
  owner: UserPublic & { uid: string };
  visibility: "public" | "private";
  photos: string[];
  location: {
    address: string;
    unit?: string;
    postalCode: string;
    city: string;
    province: string;
    country: string;
  };
  createdAt: timestamp;
};

export type ChatRoom = {
  id?: string;
  members: string[];
  messages?: {
    [msgId: string]: Message;
  };
  createdAt: timestamp;
};

export type Message = {
  id?: string;
  uid: string;
  text: string;
  file?: {
    name: string;
    link: string;
  };
  createdAt: timestamp;
};

export type Schema = {
  [CollectionName.ChatRooms]: {
    [chatId: string]: ChatRoom;
  };
  [CollectionName.Listings]: {
    [listingId: string]: Listing;
  };
  [CollectionName.UsersPrivate]: {
    [userId: string]: UserPrivate;
  };
  [CollectionName.UsersPublic]: {
    [userId: string]: UserPublic;
  };
};

export type SnapshotHandler = (
  snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => void;

export type SnapshotErrorHandler = (
  error: firebase.firestore.FirestoreError
) => void;
