import firebase from "firebase/app";
import { CollectionName } from "./collections";

export type timestamp =
  | number
  | firebase.firestore.FieldValue
  | firebase.firestore.Timestamp;

export type FirestoreFieldValue = firebase.firestore.FieldValue;

export type FirestoreTimestamp = firebase.firestore.Timestamp;

export type Visibility = "public" | "hidden";

export type PropertyType = "Apartment" | "House" | "Townhouse";

export type Frequency =
  | "Monthly"
  | "Semester (4 Months)"
  | "Two Semesters (8 Months)"
  | "Yearly";

export type LeaseType = "Sublet" | "Lease";

export type RequestStatus = "sent" |"pending" | "rejected" | "accepted";

export type RentalSpace =
  | "Entire Building"
  | "Partial Building"
  | "Single Room";

export type FurnishedStatus = "Unfurnished" | "Furnished" | "Semi-Furnished";

export type ListingStatus = "available" | "pending" | "rented";


export type TenantEntry = UserPublic & {
  rentals: {
    [listingId: string]: {
      start: timestamp;
      end: timestamp;
    };
  };
};

export type TenantRequestEntry = UserPublic & TenantRequest;

export type UserPublic = {
  uid?: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  verified?: boolean;
  createdAt: timestamp;
};

export type UserPrivate = {
  uid?: string;
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
  featureDescription: string;
  utilities: string[];
  utilitiesDescription: string;
  images: string[];
  applicants: number;
  createdAt: timestamp;
  status: ListingStatus;
};

export type ChatRoom = {
  id?: string;
  members: string[];
  initiatedBy: string;
  messages?: {
    [msgId: string]: Message;
  };
  listings: {
    [listingId: string]: {
      initiatedAt: timestamp;
      data: Listing;
    };
  };
  createdAt: timestamp;
};

export type Message = {
  id?: string;
  uid: string;
  members: string[];
  text: string;
  file?: {
    name: string;
    link: string;
  };
  createdAt: timestamp;
};

export type TenantRequest = {
  id?: string;
  landlordUid: string;
  tenantUid: string;
  createdAt: timestamp;
  status: RequestStatus;
  listing: {
    initiatedAt: any;
    data: Listing;
    id: string;
  };
}

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
