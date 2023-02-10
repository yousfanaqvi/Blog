import React from 'react'
import Login from '../Login/Login';
import "./Home.css"
import 'animate.css';

function Home() {

  return (

    <>
    <div className='home-background'></div>
    <div   className='home-container animate__animated animate__fadeIn'>
        <Login/>
       
    </div>
    </>
  )
}


export default Home