import create from "zustand";
import { UserType } from "@/src/enum";
import { LocalStorageKey } from "@/src/localStorage";

type State = {
  userType: UserType | undefined;
  setUserType: (type: UserType) => void;
  toggleUserType: () => void;
  clearUserType: () => void;
};

export const useStore = create<State>((set) => ({
  userType: undefined,
  setUserType: (userType) => {
    set({ userType });
    window.localStorage.setItem(LocalStorageKey.UserType, userType);
  },
  toggleUserType: () =>
    set((state) => {
      let { userType } = state;

      if (userType === UserType.Tenant) {
        userType = UserType.Landlord;
      } else if (userType === UserType.Landlord) {
        userType = UserType.Tenant;
      }

      if (userType) {
        window.localStorage.setItem(LocalStorageKey.UserType, userType);
      }

      return { userType };
    }),
  clearUserType: () => {
    set({ userType: undefined });
    window.localStorage.removeItem(LocalStorageKey.UserType);
  },
}));
