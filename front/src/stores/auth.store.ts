import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "../types/user.type"
import { jwtDecode } from "jwt-decode"; 


interface AuthState {
    user: IUser | null;
    accessToken: string | null;
    setUser: (user: IUser | null) => void;
    setAccessToken: (token: string | null) => void;
    setRole: (role: string) => void;
    clearAuth: () => void;
    isHydrated: boolean; // Ajoute ça
    setHydrated: (val: boolean) => void;
    logout : () => void
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
            isHydrated: false, // Faux par défaut au démarrage de l'app

            setUser: (user) => set({ user }),
            setAccessToken: (token) => {
                if (token) {
                    try {
                        const decoded = jwtDecode<TokenPayload>(token);
                        set({ 
                            accessToken: token,
                            // On "mappe" les données du token vers ton objet user
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

            logout: () =>{
                set({accessToken :null , user:null });
                window.location.href = '/';
            }
        }),
        {
            name: "auth-storage",
            // Cette partie est cruciale pour la PrivateRoute
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        },
    ),
);