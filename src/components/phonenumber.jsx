import React from 'react'
import { useState } from 'react';
import OtpLogin from './otplogin';
import "../App.css"

const PhoneNumber = () => {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isclicked,setIsClicked] = useState(false);
  const [message, setMessage] = useState("")

  const handlePhoneNumber  = (e) => {
      setPhoneNumber(e.target.value)
  }

  const handleSubmit = (e)=> {
    const regex = /[^0-9]/g;
      if(phoneNumber.length < 10 || regex.test(phoneNumber)){
        alert("Invalid Phone Number");
        return;
      }
      //call api to send sms to customer
      //show otp ui
      setIsClicked(true);
  }


  const onOtpSubmit = (e)=>{
    setMessage("Login Successful.");
  }

  return (
    <div className='phonenumber'>
      {!isclicked ? 
        
        <form onSubmit={handleSubmit} className='main'> 
        <h3>Enter the Phone number</h3>
          <input type='text' value={phoneNumber} onChange={handlePhoneNumber} placeholder='Enter phone number'/>
          <button type='submit'>Submit</button>
        </form> 
          : 
          <div>
            <h3>Enter the otp sent to {phoneNumber}</h3> 
            <OtpLogin length={4} onOtpSubmit={onOtpSubmit}/>
            <div>{message}</div>
          </div>
        }
    </div>
  )
}

export default PhoneNumber;
