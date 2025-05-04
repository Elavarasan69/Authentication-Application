import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Profile() {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDOB] = useState("")
    const [contact, setContact] = useState("")
    const [no, setNo] = useState("")
    const [street, setStreet] = useState("")
    const [locality, setLocality] = useState("")
    const [city, setCity] = useState("")
    const [pincode, setPincode] = useState("")
    const [state, setState] = useState("")

    const [check, setCheck] = useState(false)

    const handleName = (event) => {
        setFullname(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleDOB = (event) => {
        setDOB(event.target.value)
    }

    const handleContact = (event) => {
        setContact(event.target.value)
    }

    const handleNo = (event) => {
        setNo(event.target.value)
    }

    const handleStreet = (event) => {
        setStreet(event.target.value)
    }

    const handleLocality = (event) => {
        setLocality(event.target.value)
    }

    const handleCity = (event) => {
        setCity(event.target.value)
    }

    const handlePincode = (event) => {
        setPincode(event.target.value)
    }

    const handleState = (event) => {
        setState(event.target.value)
    }

    function agreeCheck() {
        !check ? setCheck(true) : setCheck(false)
    }

    function formSubmit(event) {
        event.preventDefault()
            async function submitData(){
                await axios.post('http://localhost:3001/profile',{fullname,email,dob,contact,no,street,locality,city,pincode,state})
                .then(response => console.log(response))
                .catch(error => console.log(error.message))
                
            }
            submitData()
        }
    


    return (
        <div className='box-container'>
            <form className='box-form' onSubmit={formSubmit}>
                <h2>User Profile</h2>
                <label htmlFor="fullname">
                    Fullname:
                    <input type="text" id='fullname' value={fullname} onChange={handleName} required />
                </label>
                <label htmlFor="email">
                    Email:
                    <input type="text" id='email' value={email} onChange={handleEmail} required />
                </label>
                <label htmlFor="dob">
                    Date of birth:
                    <input type="date" id='dob' value={dob} onChange={handleDOB} required />
                </label>
                <label htmlFor="contact">
                    Contact:
                    <input type="text" id='contact' value={contact} onChange={handleContact} required />
                </label>
                <label htmlFor="no">
                    Door no:
                    <input type="text" id='no' value={street} onChange={handleStreet} required />
                </label>
                <label htmlFor="street">
                    Street:
                    <input type="text" id='street' value={no} onChange={handleNo} required />
                </label>
                <label htmlFor="locality">
                    Locality:
                    <input type="text" id='locality' value={locality} onChange={handleLocality} required />
                </label>
                <label htmlFor="city">
                    City:
                    <input type="text" id='city' value={city} onChange={handleCity} required />
                </label>
                <label htmlFor="pincode">
                    Pincode:
                    <input type="text" id='pinccode' value={pincode} onChange={handlePincode} required />
                </label>
                <label htmlFor="state">
                    State:
                    <input type="text" id='state' value={state} onChange={handleState} required />
                </label>
                <div className='input-field checkBox'>
                    <input type="checkbox" value={check} onClick={agreeCheck} id='check' required />
                    <label htmlFor="check" className='form-label'>I agree</label>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Profile