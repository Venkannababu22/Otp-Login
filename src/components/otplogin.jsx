import React, { useEffect, useRef, useState } from 'react'

const OtpLogin = ({length=4, onOtpSubmit}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([])

   useEffect(()=>{
    if(inputRefs.current[0]){
        inputRefs.current[0].focus();
    }
   },[])

    const handleChange = (index, e) => {
        const value = e.target.value; 
        if(isNaN(value)){
            return;
        }

        const newOtp = [...otp];
        //allow only one input
        newOtp[index] = value.substring(value.length-1);
        setOtp(newOtp);

        //submit trigger
        const combinedOtp =  newOtp.join("")
        if(combinedOtp.length === 4){
            onOtpSubmit(combinedOtp)
        }

        // moving focus to the forward input field
        if(value && index < length-1 && inputRefs.current[index+1]){
            inputRefs.current[index+1].focus()
        }
    }

    //cursor will be set to the right side position only after the number
    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1,1)
    }

    //moving focus to the previous input field
    const handleKeyDown = (e, index) => {
        if(index > 0 && !otp[index] && e.key === "Backspace" && inputRefs.current[index-1]){
            inputRefs.current[index - 1].focus()
        }
    }

  return (
    <div>
      {
        otp.map((value, index) => {
            return <input type='text' 
            key={index}
            value={value}
            ref={(input) => (inputRefs.current[index] = input)}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => handleClick(index) }
            className='otpInput'
            />
        })
      }
    </div>
  )
}

export default OtpLogin;
