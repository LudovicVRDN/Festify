import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import LoginPage from "./pages/auth/LoginPage"
import RegisteringPage from "./pages/auth/RegisteringPage"

 function App() {


  return (
    <>
    <Navbar />
     <Routes>
      <Route path="/" element ={  <LoginPage />}></Route>
    
      <Route path="register" element={ <RegisteringPage />}></Route>
      <Route path="profile" element></Route>
      <Route path="profile/edit" element></Route>

     </Routes>
      <ReactQueryDevtools />
    </>
  )
}

export default App
