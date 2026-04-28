import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";

import RegisteringPage from "./pages/auth/RegisteringPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./guards/PrivateRoute";
import UnauthorizedPage from "./pages/base/UnauthorizedPage";
import Profile from "./pages/profile/ProfileEdit";
import OrganizerHomePage from "./pages/organizer/OrganizerHomePage";
import VolunteerHomePage from "./pages/volunteer/VolunteerHomePage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="register" element={<RegisteringPage />}></Route>

        <Route element={<PrivateRoute />}>
          
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/profile/edit" element></Route>

        </Route>

        <Route element={<PrivateRoute allowedRoles="benevole" />}>

        <Route path="/missions" element></Route>

        </Route>

        {/* <Route element={<PrivateRoute allowedRoles="benevole" />}> */}

        <Route path="/organizer" element={<OrganizerHomePage />}></Route>

        {/* </Route> */}

         <Route path="/volunteer" element={<VolunteerHomePage />}></Route>


        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
