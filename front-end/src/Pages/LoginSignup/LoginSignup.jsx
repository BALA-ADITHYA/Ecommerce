import React, { useState } from 'react'
import './LoginSignup.css'

const LoginSignup = () => {

  const [state,setState] = useState('Login');
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  });

  const changeHandler = async(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
   
  }


  const login = async ()=>{
    let responseDate;
    await fetch('http://localhost:4000/login',{
      method:'Post',
      headers:{
      Accept:"application/json",
      'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>responseDate=data)


    if(responseDate.success){
      localStorage.setItem('auth-token',responseDate.token);
      window.location.replace('/')
    }
    else{
      alert(responseDate.errors)
    }
  }
  const signUp = async()=>{

    let responseDate;
    await fetch('http://localhost:4000/signup',{
      method:'Post',
      headers:{
      Accept:"application/json",
      'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>responseDate=data)


    if(responseDate.success){
      localStorage.setItem('auth-token',responseDate.token);
      window.location.replace('/')
    }
    else{
      alert(responseDate.errors)
    }
  }
 

  return (
    <div className='login-signup'>
      <div className="login-signup-container">
        <h1>{state}</h1>
        <div className="login-signup-fields">
         {state==="Sign up"?<input type="text" name='username' value={formData.username} onChange={changeHandler} placeholder='YourName' />:<></>} 
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='password ' />
        </div>
        <button  onClick={()=>{state === "Login"?login():signUp()}}>Continue</button>
        {state==="Sign up"?
        <p className='login-signup-login'> Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>:
        <p className='login-signup-login'> Create an Account? <span onClick={()=>{setState("Sign up")}}>Click here</span></p>}
        <div className="login-signup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
