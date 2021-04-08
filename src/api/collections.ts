import { firestore } from "@/src/firebase";

export enum CollectionName {
  ChatRooms = "chat-rooms",
  Listings = "listings",
  Messages = "messages",
  UsersPrivate = "users-private",
  UsersPublic = "users-public",
}

export const chatRooms = firestore.collection(CollectionName.ChatRooms);

export const listings = firestore.collection(CollectionName.Listings);

export const usersPrivate = firestore.collection(CollectionName.UsersPrivate);

export const usersPublic = firestore.collection(CollectionName.UsersPublic);
