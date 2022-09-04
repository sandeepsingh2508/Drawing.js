import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/userContext";

export default function Login() {

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ tab, setTab ] = useState("login");
  const [ running, setRunning ] = useState(false);
  const [ errorFlag, setErrorFlag ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState();

  const loginUser = async ()=>{
    setRunning(true);
    const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });
    const resp = await response.json();
    setRunning(false);

    if(resp.status === "FAIL"){
      setErrorMsg(resp.data.error);
      setErrorFlag(true);
      setTimeout(()=>{
        setErrorFlag(false)
      }, 5000);
    }
    else{
      const token = resp.data.token;
      context.setUser({...resp.data.user, token});
      localStorage.setItem("user", JSON.stringify({...resp.data.user, token}));
      navigate('/home');
    }
    
    return resp;
  }
  const registerUser = async ()=>{
    setRunning(true);
    const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    const resp = await response.json();
    setRunning(false);

    if(resp.status === "FAIL"){
      setErrorMsg(resp.data.error);
      setErrorFlag(true);
      setTimeout(()=>{
        setErrorFlag(false)
      }, 5000);
    }
    else{
      const token = resp.data.token;
      context.setUser({...resp.data.user, token});
      localStorage.setItem("user", JSON.stringify({...resp.data.user, token}));
      navigate('/home');
    }

    return resp;
  }

  return (
    <div className='login-box'>

      <div className='login-row'>
        <label htmlFor="email" >Email</label>
        <input type="email" className='login-input' placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      
      <div className='login-row'>
        <label htmlFor="password">Password</label>
        <input type="password" className='login-input' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      {errorFlag &&
        <div className='login-warning'>
          {errorMsg}
        </div>
      }
      <button className='login-btn' onClick={(e)=>{
          if(tab === "login")loginUser();
          else registerUser();
        }}>{ tab === "login" ? "Login" : "Register" }</button>

      <div className='auth-tab' onClick={(e)=>{
        if(tab === "login"){setTab("register")}
        else setTab("login")
      }}> { tab === "login" ? "New User, Register" : "Existing User, Login"}</div>

    </div>
  )
}
