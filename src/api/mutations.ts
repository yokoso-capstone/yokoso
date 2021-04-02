import firebase from "firebase/app";
import { ChatRoom, Listing, Message, UserPrivate, UserPublic } from "./types";
import {
  chatRooms,
  listings,
  usersPrivate,
  usersPublic,
  CollectionName,
} from "./collections";

export const createChatRoom = async (data: ChatRoom) => {
  if (
    data.members.length < 2 ||
    data.members.some((member) => member === null || member === undefined)
  ) {
    throw new Error("`members` must be a list of at least 2 user ids");
  }

  const payload: ChatRoom = {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  return chatRooms.add(payload);
};

export const createListing = async (data: Listing) => {
  const payload: Listing = {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  return listings.add(payload);
};

export const createPrivateUser = async (data: UserPrivate) => {
  const payload: UserPrivate = {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  return usersPrivate.add(payload);
};

export const createPublicUser = async (data: UserPublic) => {
  const payload: UserPublic = {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  return usersPublic.add(payload);
};

export const createMessage = async (chatRoomId: string, data: Message) => {
  const payload: Message = {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  return chatRooms
    .doc(chatRoomId)
    .collection(CollectionName.Messages)
    .add(payload);
};
