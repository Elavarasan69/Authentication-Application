import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userEmail"))
  console.log(location.state?.accessToken)

  const navigate = useNavigate()

  function logout() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className='home-section'>
      <div className='home-header'>
      <h2 className='home-title'>Welcome {userData}</h2>
      <button className='button-primary logout-button' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Home