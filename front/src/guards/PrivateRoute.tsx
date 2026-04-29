import { Navigate, Outlet } from "react-router"
import { useAuthStore } from "../stores/auth.store";

type Props = {
    allowedRoles?:string
}
export default function PrivateRoute ({ allowedRoles }: Props){
    const accessToken = useAuthStore((state) => state.accessToken);
    const user = useAuthStore((state) => state.user); // <--- Récupère l'user ici
    const isHydrated = useAuthStore((state) => state.isHydrated);
    
    // 1. Attendre que Zustand ait lu le LocalStorage
    if (!isHydrated) return <div>Chargement...</div>;

    // 2. Vérifier si l'utilisateur est connecté
    if(!accessToken){
        console.warn("Accès refusé : pas de token");
        return <Navigate to="/" replace />;
    }

    // 3. Vérifier les permissions
    if(allowedRoles){
        // Si l'user n'est pas encore créé ou si son rôle n'est pas dans la liste autorisée
        if(!user || allowedRoles != user.role){
            console.warn("Accès refusé : rôle insuffisant");
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <Outlet />;
}