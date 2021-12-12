import {
  ChatRoom,
  Listing,
  Message,
  TenantRequest,
  UserPrivate,
  UserPublic,
} from "./types";
import {
  chatRooms,
  listings,
  usersPrivate,
  usersPublic,
  CollectionName,
  tenantRequests,
} from "./collections";

export const getChatRoomById = async (id: string) => {
  const ref = chatRooms.doc(id);
  const document = await ref.get();

  return document.data() as ChatRoom;
};

export const getListingById = async (id: string) => {
  const ref = listings.doc(id);
  const document = await ref.get();

  return document.data() as Listing;
};

export const getUserPrivateById = async (id: string) => {
  const ref = usersPrivate.doc(id);
  const document = await ref.get();

  return document.data() as UserPrivate;
};

export const getUserPublicById = async (id: string) => {
  const ref = usersPublic.doc(id);
  const document = await ref.get();

  return document.data() as UserPublic;
};

/**
 * Get chat rooms of which the user is a member of.
 * // TODO: set up proper limit and pagination
 * @param id ID of user
 */
export const getChatRoomsWithUser = async (id: string) => {
  const ref = chatRooms
    .orderBy("createdAt", "desc")
    .limit(10)
    .where("members", "array-contains", id);
  const querySnapshot = await ref.get();
  const documents = querySnapshot.docs;

  return documents.map((doc) => ({ id: doc.id, ...doc.data() })) as ChatRoom[];
};

export const getReceivedTenantRequest = async (id: string) => {
  const ref = tenantRequests
    .orderBy("createdAt")
    .where("landlordUid", "==", id);

  const querySnapshot = await ref.get();
  const documents = querySnapshot.docs;

  return documents.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TenantRequest[];
};

export const getSentTenantRequests = async (id: string) => {
  const ref = tenantRequests.orderBy("createdAt").where("tenantUid", "==", id);

  const querySnapshot = await ref.get();
  const documents = querySnapshot.docs;

  return documents.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TenantRequest[];
};

/**
 * Get the messages of a chat room.
 * TODO: complete with proper limit and pagination
 * @param id ID of chat room
 */
export const getMessagesFromChatRoom = async (id: string) => {
  const ref = chatRooms
    .doc(id)
    .collection(CollectionName.Messages)
    .orderBy("createdAt")
    .limitToLast(10);
  const querySnapshot = await ref.get();
  const documents = querySnapshot.docs;

  return documents.map((doc) => ({ id: doc.id, ...doc.data() })) as Message[];
};
