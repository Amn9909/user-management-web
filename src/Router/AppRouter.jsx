import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from '../components/Login';
import Homepage from '../pages/Homepage';

const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn />}/>
      <Route path="/homepage" element={<Homepage />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default AppRouter