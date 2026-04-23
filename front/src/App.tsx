import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"

import RegisteringPage from "./pages/auth/RegisteringPage"
import HomePage from "./pages/HomePage"

 function App() {


  return (
    <>
    <Navbar />
     <Routes>
      <Route path="/" element ={  <HomePage />}></Route>
    
      <Route path="register" element={ <RegisteringPage />}></Route>
      <Route path="profile" element></Route>
      <Route path="profile/edit" element></Route>

     </Routes>
      <ReactQueryDevtools />
    </>
  )
}

export default App
