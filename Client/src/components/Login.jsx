import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pwdVisibility, setPwdVisibility] = useState(false)
  const [errorEmailText, setErrorEmailText] = useState('')
  const [errorPasswordText, setErrorPasswordText] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passworError, setPasswordError] = useState(false)

  const BASE_URL = 'http://localhost:4000/api/'

  const navigate = useNavigate()

  function handleEmail(event) {
    setEmail(event.target.value.trim())
    setEmailError(false)
    setPasswordError(false)
  }

  function handlePwd(event) {
    setPassword(event.target.value)
    setEmailError(false)
    setPasswordError(false)
  }


  function login(event) {
    event.preventDefault()
    if (!emailError && !passworError) {
      async function submitData() {
        await axios.post(`${BASE_URL}login`, { email, password })
          .then(response => {
            if (response.data.body.user.email === email) {
              console.log(response.data.body)
              localStorage.setItem("isLoggedIn",JSON.stringify(true))
              localStorage.setItem("userEmail",JSON.stringify(response.data.body.user.email))
              navigate('/home', { state: { userData: response.data.body.user.email, accessToken: response.data.body.access_token } })

              setEmail("")
              setPassword("")
              setPwdVisibility(false)
              setEmailError(false)
              setPasswordError(false)
            }
            else {
              console.log(response.data)
              if (response.data == "User does not exist") 
                { setEmailError(true)
                  setErrorEmailText(response.data)
                 }
               else { setEmailError(false) }
              if (response.data == "Incorrect password")
                 { setPasswordError(true)
                  setErrorPasswordText(response.data)
                  } 
              else { setPasswordError(false) }
            }
          })
          .catch(error => console.log(error.message))
      }
      submitData()
    }
  }

  return (
    <div className='box-section'>
      <div className='box-container' >
        <div className='image-container'>
          <img className='art-images' src={assets.login} alt="login" />
        </div>
        <div className='form-container'>
          <form className='form' onSubmit={login}>
            <h2 style={{ textAlign: "center", fontWeight: "500" }}>Login</h2>
            <div className={!emailError ? 'input-field' : 'error-input'}>
              <input className='input-box' type="text" id='email' value={email} onChange={handleEmail} placeholder='Email' required />
              <img src={assets.user} alt="user" />
            </div>
            <p className={emailError ? 'error-text' : 'none'}>{errorEmailText}</p>
            <div className={!passworError ? 'input-field' : 'error-input'}>
              <input className='input-box' type={pwdVisibility ? "text" : "password"} id='pwd' value={password} onChange={handlePwd} placeholder='Password' required />
              <img onClick={() => { setPwdVisibility(!pwdVisibility) }} src={pwdVisibility ? assets.visibility_on : assets.visibility_off} alt="user" />
            </div>
            <p className={passworError ? 'error-text' : 'none'}>{errorPasswordText}</p>
            <button className='button-primary' type='submit'>Login</button>
            <p className='bottom-link'>Don't have account? <a onClick={() => { navigate('/signup') }}>create one</a></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login