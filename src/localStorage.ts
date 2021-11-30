import { UserType } from "@/src/enum";

export enum LocalStorageKey {
  UserType = "yokoso.userType",
}

export const getUserType = () =>
  window.localStorage.getItem(LocalStorageKey.UserType) as UserType | null;
