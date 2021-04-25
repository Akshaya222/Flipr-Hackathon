import React,{useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

const Otp = () => {
    const [number,setNumber]=useState("");
    const [otp,setOtp]=useState("");
    const [show,setShow]=useState(false);

    const sendOtp=(e)=>{
            e.preventDefault();
            axios.post("http://localhost:3007/api/send-otp",{phoneNumber:number}).then((res)=>{
                alert(res.data.message);
                setShow(true);
    })
        .catch((error)=>{
            alert(error.response.data.message)
        })
    }

    const verifyOtp=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3007/api/verify-otp",{phoneNumber:number,otp:otp}).then((res)=>{
            alert(res.data.message);
            setOtp("");
            setShow(false)
})
    .catch((error)=>{
        alert(error.response.data.message)
    })
    }


    const navigateToHome=()=>{
        navigate("/home")
    }

    const signUpHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3007/api/signup-phone",{phoneNumber:number}).then((res)=>{
            alert("please sign in to continue")
            setNumber("")
            setOtp("")
            navigateToHome();
})
    .catch((error)=>{
        alert(error.response.data.message)
    })
    }

    const signInHandler=(e)=>{
        e.preventDefault();
        axios.put("http://localhost:3007/api/login-phone",{phoneNumber:number}).then((res)=>{
            alert(res.data.message);
            sessionStorage.setItem("user",JSON.stringify(res.data.data));
            setNumber("")
            setOtp("")
           navigateToHome();
})
    .catch((error)=>{
        alert(error.response.data.message)
    })
    }


    return (
    <div className="cont" style={{width:'700px'}}>
    <div className="form sign-in" style={{width:'600px'}}>
      <h2>OTP Verification</h2>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div>
      <label>
        <input placeholder="Phone Number" type="tel" value={number} onChange={(e)=>setNumber(e.target.value)}  name="number"/>
      </label>
      </div>
      <button class="submit" type="button" onClick={sendOtp}>Get OTP</button>
      {
          show?  <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <label> 
             <input placeholder="Enter OTP"  name="number" value={otp} style={{width:'70%',margin:'0px auto'}} onChange={(e)=>setOtp(e.target.value)}/>
           </label>
           <button class="submit" type="button" onClick={verifyOtp} style={{width:"70px",marginLeft:'3px'}}>Verify</button></div>:null
      }
      <div style={{display:'flex',flexDirection:'row'}}>
      <button class="submit" type="button" onClick={signUpHandler} style={{width:"80px",marginRight:'10px'}}>Sign Up</button>
      <button class="submit" type="button" onClick={signInHandler} style={{width:"80px",marginLeft:'10px'}}>Sign In</button>
      </div>
      </div> 
    </div>
        </div>
    )
}

export default Otp
