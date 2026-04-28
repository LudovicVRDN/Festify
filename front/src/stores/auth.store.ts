import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "../types/user.type"

interface AuthState {
    user: IUser | null;
    accessToken: string | null;
    setUser: (user: IUser  | null) => void;
    setAccessToken: (token: string | null) => void;
    setRole: (role: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,

            setUser: (user) => set({ user }),
            setAccessToken: (token) => set({ accessToken: token }),

            setRole: (role) =>
                set((state) => ({
                    user: state.user ? { ...state.user, role } : null,
                })),

            clearAuth: () => set({ user: null, accessToken: null }),
        }),
        {
            name: "auth-storage", 
        },
    ),
);

