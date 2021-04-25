import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {navigate} from '@reach/router';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import { useHistory } from "react-router-dom";

const Authentication = () => {
  const [emailL,setEmailL]=useState("");
  const [passwordL,setPasswordL]=useState("");
  const [emailR,setEmailR]=useState("");
  const [nameR,setNameR]=useState("");
  const [passwordR,setPasswordR]=useState("");
  const [conpassR,setConpassR]=useState("");

  let history=useHistory();

  const  clickHandler=async()=>{
   await document.querySelector('.cont').classList.toggle('s-signup')
  }
  
  const navigateToHome=()=>{
     navigate("/home",{ replace: true })
}

  const responseFacebook = (response) => {
    console.log(response.userID);
    axios.put("http://localhost:3007/api/login-fb",{fbID:response.userID}).then((res)=>{
      alert(res.data.message)
      sessionStorage.setItem("user",JSON.stringify(res.data.data));
     navigateToHome()
    }).catch((error)=>{
      alert(error.response.data.message)
      console.log(error.response.data.message)
    })
  }
  

  const signInHandler=(e)=>{
      e.preventDefault();
      let regex= "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
      let ans=emailL.match(regex);
      if(!ans){
        alert("Invalid Email")
      }
      else{
        axios.put("http://localhost:3007/api/login-username",{
          username:emailL,
          password:passwordL
        }).then((res)=>{
          alert(res.data.message)
          sessionStorage.setItem("user",JSON.stringify(res.data.data));
          setEmailL("");
        setPasswordL("");
        navigateToHome();
        }).catch((error)=>{
          alert(error.response.data.message)
        })
      }      
  }

  const signUpHandler=(e)=>{
    e.preventDefault();
    let regex= "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    let ans=emailR.match(regex);
    if(!ans){
      alert("Invalid Email")
    }
    else{
      if(passwordR==conpassR){
        axios.post("http://localhost:3007/api/signup-username",{
        username:emailR,
        password:passwordR,
        name:nameR
      }).then((res)=>{
        alert("please sign in to continue")
        console.log("response",res);
        setNameR("")
        setEmailR("");
        setPasswordR("")
        setConpassR("")
      }).catch((error)=>{
        alert(error.response.data.message)
      })
      }
      else{
          alert("passwords mismatch")
      }
     
    }
  }

    return (
      <div className="cont">
           <div className="form sign-in">
      <h2>Sign In</h2>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div>
      <label>
        <span>Email Address</span>
        <input type="email" name="email" value={emailL} onChange={(e)=>setEmailL(e.target.value)}/>
       </label>
      </div>
      <div>
      <label>
        <span>Password</span>
        <input type="password" name="password" value={passwordL} onChange={(e)=>setPasswordL(e.target.value)}/>
      </label>
      </div>
      <button className="submit" type="button" onClick={signInHandler}>Sign In</button>
      </div>
      <p className="forgot-pass">Forgot Password ?</p>
     <div className="social-media">
        <ul>
         <li> <FacebookLogin
    appId="123727169749017"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="fbButton"
    textButton = "" /></li>
          <li onClick={()=> navigate("/mobile",{ replace: true })}><img src="/images/telephone.png"/></li>
       </ul>
      </div>
    </div>
    <div className="sub-cont">
      <div className="img">
        <div className="img-text m-up">
          <h2>New here?</h2>
          <p>Register and discover great amount of new opportunities!</p>
        </div>
        <div className="img-text m-in">
          <h2>One of us?</h2>
          <p>If you already has an account, just log in. We've missed you!</p>
        </div>
        <div className="img-btn" onClick={clickHandler}>
          <span className="m-up">Register</span>
          <span className="m-in">Log In</span>
        </div>
      </div>
      <div className="form sign-up">
        <h2>Register</h2>
         <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
         <div>
        <label>
          <input type="text" placeholder="Name" required value={nameR} onChange={(e)=>setNameR(e.target.value)}/>
        </label>
        </div>
       <div>
       <label> 
          <input type="text" placeholder="Email" required value={emailR} onChange={(e)=>setEmailR(e.target.value)}/>
        </label>
       </div>
       <div>
       <label>
           <input type="password" placeholder="Password" required value={passwordR} onChange={(e)=>setPasswordR(e.target.value)}/>
        </label>
        <br/>
        <small style={{color:"#7a7976",marginTop:"-7px!important"}}>atleast one char,one number and minimum length 7</small>
       </div>
       <div>
       <label>
          <input type="password" placeholder="Confirm Password" required value={conpassR} onChange={(e)=>setConpassR(e.target.value)}/>
        </label>
       </div>
        <button type="button" className="submit" onClick={signUpHandler}>Register Now</button>
         </div>
      </div>
    </div>
      </div>
    )
}

export default Authentication
