import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "../types/user.type"
import { jwtDecode } from "jwt-decode";
import api from "../api/axios.instance";


interface AuthState {
    user: IUser | null;
    accessToken: string | null;
    setUser: (user: IUser | null) => void;
    setAccessToken: (token: string | null) => void;
    setRole: (role: string) => void;
    clearAuth: () => void;
    isHydrated: boolean; // Ajoute ça
    setHydrated: (val: boolean) => void;
    logout: () => void;
    clearSession: () => void;
}
interface TokenPayload {
    sub: number;
    role: string;
    iat?: number;
    exp?: number;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isHydrated: false,

            setUser: (user) => set({ user }),

            setAccessToken: (token) => {
                if (token) {
                    try {
                        const decoded = jwtDecode<TokenPayload>(token);
                        set({
                            accessToken: token,
                            user: {
                                id: decoded.sub,
                                role: decoded.role
                            } as IUser
                        });
                    } catch (error) {
                        console.error("Erreur décodage token:", error);
                        set({ accessToken: null, user: null });
                    }
                } else {
                    set({ accessToken: null, user: null });
                }
            },

            setRole: (role) =>
                set((state) => ({
                    user: state.user ? { ...state.user, role } : null,
                })),

            clearAuth: () => set({ user: null, accessToken: null }),

            setHydrated: (val) => set({ isHydrated: val }),

            clearSession: () => {
                set({ accessToken: null, user: null }); 
            },

            logout: async () => {
                try {
                    await api.post('/auth/logout');
                } catch {
                    //Logout even if back end is wrong 
                } finally {
                    set({ accessToken: null, user: null });
                    useAuthStore.persist.clearStorage();
                }
            },
        }),
        {
            name: "auth-storage",


            partialize: (state) => ({
                user: state.user

            }),

            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    ),
);