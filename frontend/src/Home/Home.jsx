import React from 'react'
import Login from '../Login/Login';
import "./Home.css"
import 'animate.css';
import {useNavigate} from "react-router-dom"
function Home() {

  let navigate= useNavigate();
  return (

    <>
    <div className='home-background'>
    </div>
    <div className='home-content'>
    <span className='left-content'>
      <h1 id="bl">Create a blog.</h1>
      <h3 id="best">The best blogging platform to share your story with the world</h3>
      <button className='join-btn' onClick={()=>navigate("/register")}>JOIN NOW!</button>
    </span>
      <div   className='home-container animate__animated animate__fadeIn'>
        <Login/>
      </div>

    </div>

    
    </>
  )
}


export default Home