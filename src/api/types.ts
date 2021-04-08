import firebase from "firebase/app";
import { CollectionName } from "./collections";

export type timestamp =
  | number
  | firebase.firestore.FieldValue
  | firebase.firestore.Timestamp;

export type FirestoreFieldValue = firebase.firestore.FieldValue;

export type FirestoreTimestamp = firebase.firestore.Timestamp;

export type UserPublic = {
  firstName: string;
  lastName: string;
  profilePicture: string;
  verified?: boolean;
  createdAt: timestamp;
};

export type UserPrivate = {
  address?: string;
  dob: string;
  documents: {
    [title: string]: string;
  };
  createdAt: timestamp;
};

export type Listing = {
  owner: UserPublic & { uid: string };
  visibility: "public" | "private";
  location: {
    address: string;
    unitNumber?: string;
    hideUnitNumber: boolean;
    postalCode: string;
    city: string;
    province: string;
    country: string;
  };
  details: {
    title: string;
    description: string;
    propertyType: "apartment" | "house" | "townhouse";
    rentalSpace: "entire-building" | "partial-building" | "single-room";
    rentalSize: number;
    privateBathrooms: string;
    sharedBathrooms: string;
    maxOccupancy: string;
    furnished: "unfurnished" | "furnished" | "semi-furnished";
    smokingAllowed: boolean;
    petsAllowed: boolean;
    numBedrooms: number;
    numBaths: number;
    numBeds: number;
  };
  lease: {
    price: number;
    paymentFrequency: "monthly" | "4-months" | "8-months" | "yearly";
    type: "sublet" | "lease";
    availability: timestamp;
    minDuration: "monthly" | "4-months" | "8-months" | "yearly";
  };
  features: {
    bathtub: boolean;
    bbq: boolean;
    carpets: boolean;
    laundry: boolean;
    dishwasher: boolean;
    fridge: boolean;
    jacuzzi: boolean;
    microwave: boolean;
    showRemoval: boolean;
    tv: boolean;
    wheelchairAccessible: boolean;
    additional: string;
  };
  utilities: {
    cable: boolean;
    electricity: boolean;
    heating: boolean;
    hydro: boolean;
    internet: boolean;
    naturalGas: boolean;
    additional: string;
  };
  images: string[];
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
