import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";

import RegisteringPage from "./pages/auth/RegisteringPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./guards/PrivateRoute";
import UnauthorizedPage from "./pages/base/UnauthorizedPage";
import Profile from "./pages/profile/Profile";
import OrganizerHomePage from "./pages/organizer/OrganizerHomePage";
import VolunteerHomePage from "./pages/volunteer/VolunteerHomePage";
import ProfileEditPage from "./pages/profile/ProfileEditPage";
import { useAuthStore } from "./stores/auth.store";
import { useEffect } from "react";
import api from "./api/axios.instance";

function App() {
  const id = useAuthStore((state) => state.user?.id);
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await api.get("/auth/refresh_token");
        useAuthStore.getState().setAccessToken(data.access_token);
      } catch {
        useAuthStore.getState().logout();
      }
    };

    restoreSession();
  }, []);
  return (
    <>
      <Navbar id={id} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="register" element={<RegisteringPage />}></Route>

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
        </Route>

        <Route element={<PrivateRoute allowedRoles="benevole" />}>
          <Route path="/benevole" element={<VolunteerHomePage />}></Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
