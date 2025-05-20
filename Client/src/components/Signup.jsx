import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [pwdVisibility, setPwdVisibility] = useState(false)
    const [cpwdVisibility, setcPwdVisibility] = useState(false)
    const [errorEmailText, setErrorEmailText] = useState('')
    const [errorPasswordText, setErrorPasswordText] = useState('')
    const [errorcPasswordText, setcErrorPasswordText] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passworError, setPasswordError] = useState(false)
    const [errorRespone,setErrorResponse] = useState(false)
    const [errorResponeText,setErrorResponseText] = useState("")

    const BASE_URL = 'http://localhost:4000/api/'

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/

    const navigate = useNavigate()

    function handleEmail(event) {
        const newEmail = event.target.value.trim()
        setEmail(newEmail)
        setPasswordError(false)
        setPasswordMatch(false)
        setErrorResponse(false)
        if (!emailRegex.test(newEmail)) {
            setEmailError(true)
            setErrorEmailText("Please enter a valid email address.")
        }
        else {
                setEmailError(false)
        }
    }

    function handlePwd(event) {
        const newPwd = event.target.value
        setPassword(newPwd)
        setEmailError(false)
        setPasswordMatch(false)
        setErrorResponse(false)
        if (!passwordRegex.test(newPwd)) {
            setPasswordError(true)
            setErrorPasswordText("Password shoud contains minimum 6 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character.")
        }
        else {
            setPasswordError(false)
        }

    }

    function handleCpdw(event) {
        setConfirmPassword(event.target.value)
        setEmailError(false)
        setPasswordError(false)
        setErrorResponse(false)
        if (password != event.target.value){ 
            setPasswordMatch(true) 
            setcErrorPasswordText("Password does not match")
        }
        else {
            setPasswordMatch(false)
        }
    }

    function signUp(event) {
        event.preventDefault()
        if (!emailError && !passworError && !passwordMatch) {
            async function submitData() {
                await axios.post(`${BASE_URL}register`, { email, password })
                    .then(response => {
                        console.log(response.data)
                        if(response.data.message == "User already exists") {
                            setErrorResponse(true)
                            setErrorResponseText(response.data.message)
                        }
                        else {
                            setErrorResponse(false)
                        } 
                    })
                    .catch(error => console.log(error.message))
            }
            submitData()
        }
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setPwdVisibility(false)
        setcPwdVisibility(false)
        setPasswordMatch(false)
        setEmailError(false)
        setPasswordError(false)
        setErrorResponse(false)
    }

    return (
        <div className='box-section'>
            <div className='box-container signup-container' >
                <div className='form-container'>
                    <form className='form' onSubmit={signUp}>
                        <h2 style={{ textAlign: "center", fontWeight: "500" }}>Sign Up</h2>

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

                        <div className={!passwordMatch ? 'input-field' : 'error-input'}>
                            <input className='input-box' type={cpwdVisibility ? "text" : "password"} id='cpwd' value={confirmPassword} onChange={handleCpdw} placeholder='Confirm Password' required />
                            <img onClick={() => { setcPwdVisibility(!cpwdVisibility) }} src={cpwdVisibility ? assets.visibility_on : assets.visibility_off} alt="user" />
                        </div>
                        <p className={passwordMatch ? 'error-text' : 'none'}>{errorcPasswordText}</p>

                        <p className={errorRespone ? 'error-text' : 'none'}>{errorResponeText}</p>
                        <button className='button-primary' type='submit'>Sign Up</button>
                        <p className='bottom-link'>Already have account? <a onClick={() => { navigate('/login') }}>Login</a></p>
                    </form>
                </div>
                <div className='image-container'>
                    <img className='art-images' src={assets.signup} alt="login" />
                </div>

            </div>
        </div>
    )
}

export default Signup