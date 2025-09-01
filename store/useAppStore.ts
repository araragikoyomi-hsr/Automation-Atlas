import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

const AUTH_KEY = "devops_app_auth";

interface Store {
  isAuthenticated: boolean;
  userName: string;
  userEmail: string;
  accessToken: string;

  setAuth: (value: boolean, token?: string) => Promise<void>;
  setUserName: (userName: string) => Promise<void>;
  setUserEmail: (userEmail: string) => Promise<void>;
  setAccessToken: (token: string) => Promise<void>;

  restore: () => Promise<void>;
  clearAuth: () => Promise<void>;
}

export const useAppStore = create<Store>((set, get) => ({
  isAuthenticated: false,
  userName: "",
  userEmail: "",
  accessToken: "",

  setAuth: async (value, token) => {
    set({ isAuthenticated: value, accessToken: token ?? get().accessToken });
    await SecureStore.setItemAsync(
      AUTH_KEY,
      JSON.stringify({
        isAuthenticated: value,
        userName: get().userName,
        userEmail: get().userEmail,
        accessToken: token ?? get().accessToken,
      })
    );
  },

  setUserName: async (userName) => {
    set({ userName });
    await SecureStore.setItemAsync(
      AUTH_KEY,
      JSON.stringify({
        isAuthenticated: get().isAuthenticated,
        userName,
        userEmail: get().userEmail,
        accessToken: get().accessToken,
      })
    );
  },

  setUserEmail: async (userEmail) => {
    set({ userEmail });
    await SecureStore.setItemAsync(
      AUTH_KEY,
      JSON.stringify({
        isAuthenticated: get().isAuthenticated,
        userName: get().userName,
        userEmail,
        accessToken: get().accessToken,
      })
    );
  },

  setAccessToken: async (token) => {
    set({ accessToken: token });
    await SecureStore.setItemAsync(
      AUTH_KEY,
      JSON.stringify({
        isAuthenticated: get().isAuthenticated,
        userName: get().userName,
        userEmail: get().userEmail,
        accessToken: token,
      })
    );
  },

  restore: async () => {
    const raw = await SecureStore.getItemAsync(AUTH_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      set(parsed);
    }
  },

  clearAuth: async () => {
    await SecureStore.deleteItemAsync(AUTH_KEY);
    set({ isAuthenticated: false, userName: "", userEmail: "", accessToken: "" });
  },
}));
