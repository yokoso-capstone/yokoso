import { tenantRequests } from "@/src/api/collections";
import { serverTimestamp } from "@/src/firebase";
import { Dispatch, SetStateAction } from "react";
import { Listing, TenantRequest } from "../api/types";

export const handleTenantRequest = async (
  listing: Listing,
  userUid: string,
  ownerUid: string,
  onSuccess?: () => void,
  onError?: () => void,
  setLoading?: Dispatch<SetStateAction<boolean>>,
) => {
  if (setLoading){
    setLoading(true);
  }

  try {
    if (!listing.id) {
      throw new Error("Couldn't find listing id");
    } else {
      const requestId = [userUid, ownerUid, listing.id].sort().join("-");
      const requestRef = tenantRequests.doc(requestId);

      const currentListingData = {
        initiatedAt: serverTimestamp,
        data: listing,
        id: listing.id,
      };

      const tenantRequestData: TenantRequest = {
        landlordUid: ownerUid,
        tenantUid: userUid,
        listing: currentListingData,
        createdAt: serverTimestamp,
      };
      await requestRef.set(tenantRequestData);

      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (err) {
    if (onError) {
      onError();
    }

  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};

export const checkRequestStatus = async (
  listing: Listing,
  userUid: string,
  ownerUid: string,
  setRequestStatus: Dispatch<SetStateAction<boolean>>,
  onError?: () => void,
) => {
  if (!listing){
    throw Error;
  }

  const requestId = [userUid, ownerUid, listing.id].sort().join("-");

  try {
    const requestRef = tenantRequests.doc(requestId);
    const requestDoc = await requestRef.get();

    if (requestDoc.exists || userUid === ownerUid) {
      setRequestStatus(true);
    }

  } catch (err) {
    if (onError) {
      onError();
    }
  }
};