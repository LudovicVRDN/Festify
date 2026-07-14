import { Navigate, Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import { useAuthStore } from "../../stores/auth.store";

export default function PublicLayout() {
  const token = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);

  // Si l'utilisateur est connecté, on l'empêche de voir les pages publiques
  if (token) {
    // Tu peux même personnaliser la redirection selon son rôle
    const redirectPath =
      user?.role === "organisateur" ? "/organisateur" : "/benevole";
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Pas de navigation pour les pages publiques */}
      <Navbar />
      <main >
        <Outlet />
      </main>
    </div>
  );
}
