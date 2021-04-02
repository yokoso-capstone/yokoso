import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore();

export enum CollectionName {
  ChatRooms = "chat-rooms",
  Listings = "listings",
  Messages = "messages",
  UsersPrivate = "users-private",
  UsersPublic = "users-public",
}

export const chatRooms = db.collection(CollectionName.ChatRooms);

export const listings = db.collection(CollectionName.Listings);

export const usersPrivate = db.collection(CollectionName.UsersPrivate);

export const usersPublic = db.collection(CollectionName.UsersPublic);
