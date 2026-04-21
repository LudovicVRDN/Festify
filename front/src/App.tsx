import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"

 function App() {


  return (
    <>
    <Navbar />
     <Routes>
      
      <Route path="/" element></Route>
      <Route path="register" element></Route>
      <Route path="profile" element></Route>
      <Route path="profile/edit" element></Route>

     </Routes>
      <ReactQueryDevtools />
    </>
  )
}

export default App
