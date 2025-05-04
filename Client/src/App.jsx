import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Login from './components/Login'
import Home from './components/Home'


function App() {
const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> :<Navigate to="/login" />} />
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
