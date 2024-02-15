import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from '../pages/Login';
import Homepage from '../pages/Homepage';
import SignUp from '../pages/Signup';

const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/homepage" element={<Homepage />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default AppRouter