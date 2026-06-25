import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router";
import RegisteringPage from "./pages/auth/RegisteringPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./guards/PrivateRoute";
import UnauthorizedPage from "./pages/base/UnauthorizedPage";
import Profile from "./pages/profile/Profile";
import OrganizerHomePage from "./pages/organizer/OrganizerHomePage";
import VolunteerHomePage from "./pages/volunteer/VolunteerHomePage";
import ProfileEditPage from "./pages/profile/ProfileEditPage";
import { useAuthStore } from "./stores/auth.store";
import { useEffect, useState } from "react";
import api from "./api/axios.instance";
import PublicLayout from "./guards/layout/PublicLayout";
import SkillsPage from "./pages/skills/SkillsPage";
import SkillDetailPage from "./pages/skills/SkillDetailPage";
import ResetPassword from "./pages/auth/ResetPassword";
import FestivalCreatePage from "./pages/festival/FestivalCreatePage";
import FestivalDetailPage from "./pages/festival/FestivalDetailPage";
import FestivalListPage from "./pages/festival/FestivalListPage";

function App() {
  const id = useAuthStore((state) => state.user?.id);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await api.get("/auth/refresh_token");
        useAuthStore.getState().setAccessToken(data.access_token);
      } catch {
        useAuthStore.getState().clearSession();
      } finally {
        setIsRestoring(false);
      }
    };

    restoreSession();
  }, []);

  if (isRestoring) return null;

  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<RegisteringPage />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path={`/profile/${id}`} element={<Profile id={id} />}></Route>
          <Route
            path={`/profile/${id}/update`}
            element={<ProfileEditPage userId={id} />}
          ></Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles="benevole" />}>
          <Route path="/missions" element></Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles="organisateur" />}>
          <Route path="/organisateur" element={<OrganizerHomePage />}></Route>
          <Route
            path="/organisateur/festival/create"
            element={<FestivalCreatePage />}
          ></Route>
          <Route
            path="/organisateur/festivals"
            element={<FestivalListPage />}
          ></Route>
          <Route
            path="/festival/:festivalId/details"
            element={<FestivalDetailPage />}
          ></Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles="benevole" />}>
          <Route path="/benevole" element={<VolunteerHomePage />}></Route>
          <Route
            path={`/skills/${id}`}
            element={<SkillsPage id={id} />}
          ></Route>

          <Route
            path="/skills/:skillId/details"
            element={<SkillDetailPage  />}
          ></Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
