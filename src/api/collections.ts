import firebaseConfig from "../firebaseConfig";
import { firestore } from "../firebase";

export enum CollectionName {
  ChatRooms = "chat-rooms",
  Listings = "listings",
  Messages = "messages",
  Tenants = "tenants",
  TenantRequest = "tenant-requests",
  UsersPrivate = "users-private",
  UsersPublic = "users-public",
}

export const chatRooms = firestore.collection(CollectionName.ChatRooms);

export const tenantRequests = firestore.collection(
  CollectionName.TenantRequest
);

export const listings = firestore.collection(CollectionName.Listings);

export const tenants = firestore.collection(CollectionName.Tenants);

export const usersPrivate = firestore.collection(CollectionName.UsersPrivate);

export const usersPublic = firestore.collection(CollectionName.UsersPublic);

const getRestUrl = (collectionName: CollectionName) =>
  `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/${collectionName}`;

export const chatRoomsRest = getRestUrl(CollectionName.ChatRooms);

export const listingsRest = getRestUrl(CollectionName.Listings);

export const tenantsRest = getRestUrl(CollectionName.Tenants);

export const tenantRequestsRest = getRestUrl(CollectionName.TenantRequest);

export const usersPrivateRest = getRestUrl(CollectionName.UsersPrivate);

export const usersPublicRest = getRestUrl(CollectionName.UsersPublic);
