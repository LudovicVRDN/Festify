import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/auth.store";
import PrivateNavbar from "../components/PrivateNavbar";

type Props = {
  allowedRoles?: string;
};
export default function PrivateRoute({ allowedRoles }: Props) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const id = useAuthStore((state) => state.user?.id);

  if (!isHydrated) return <div>Chargement...</div>;

  if (!accessToken) {
    console.warn("Accès refusé : pas de token");
    return <Navigate to="/" replace />;
  }

  if (allowedRoles) {
    if (!user || allowedRoles != user.role) {
      console.warn("Accès refusé : rôle insuffisant");
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return (
    <div>
      <PrivateNavbar id={id} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
