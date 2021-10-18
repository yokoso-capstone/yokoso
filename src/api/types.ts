import firebase from "firebase/app";
import { CollectionName } from "./collections";

export type timestamp =
  | number
  | firebase.firestore.FieldValue
  | firebase.firestore.Timestamp;

export type FirestoreFieldValue = firebase.firestore.FieldValue;

export type FirestoreTimestamp = firebase.firestore.Timestamp;

export type Visibility = "public" | "draft";

export type PropertyType = "Apartment" | "House" | "Townhouse";

export type Frequency =
  | "Monthly"
  | "Semester (4 Months)"
  | "Two Semesters (8 Months)"
  | "Yearly";

export type LeaseType = "Sublet" | "Lease";

export type RentalSpace =
  | "Entire Building"
  | "Partial Building"
  | "Single Room";

export type FurnishedStatus = "Unfurnished" | "Furnished" | "Semi-Furnished";

export type TenantEntry = UserPublic & {
  rentals: {
    [listingId: string]: {
      start: timestamp;
      end: timestamp;
    };
  };
};

export type UserPublic = {
  firstName: string;
  lastName: string;
  profilePicture: string;
  verified?: boolean;
  createdAt: timestamp;
};

export type UserPrivate = {
  address?: string;
  dob: timestamp;
  documents?: {
    [title: string]: string;
  };
  tenants?: {
    [userId: string]: TenantEntry;
  };
  createdAt: timestamp;
};

export type Listing = {
  id?: string;
  owner: UserPublic & { uid: string };
  visibility: Visibility;
  location: {
    address: string;
    unitNumber?: string;
    hideUnitNumber: boolean;
    postalCode: string;
    cityKey: string;
    cityName: string;
    province: string;
    country: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
  details: {
    title: string;
    description: string;
    propertyType: PropertyType;
    rentalSpace: RentalSpace;
    rentalSize: number;
    furnished: FurnishedStatus;
    smokingAllowed: boolean;
    petsAllowed: boolean;
    numBedrooms: number;
    numBaths: number;
  };
  lease: {
    price: number;
    paymentFrequency: Frequency;
    type: LeaseType;
    availability: timestamp;
    minDuration: Frequency;
    depositPrice: number;
  };
  features: string[];
  utilities: string[];
  images: string[];
  applicants: number;
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
