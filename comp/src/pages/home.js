import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Canvas from "../components/canvas";
import { UserContext } from "../contexts/userContext";

export default function Home() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    if(!context.user || !context.user.token || !user || !user.token){
      navigate("/");
    }
  })
  return (
    <div>
        <Canvas />
    </div>
  )
}
