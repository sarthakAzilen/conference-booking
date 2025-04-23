import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  name: string;
  role: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "userStore", // unique name
    }
  )
);

export default useUserStore;
