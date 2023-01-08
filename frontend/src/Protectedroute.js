import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading/Loading";
import axios from 'axios';

const ProtectedRoute = () => {

    let navigate=useNavigate();
    const { userInfo} = useSelector((state) => state.user)
    
    if (!userInfo) {
      return (
        <div className='unauthorized'>
          <h1>Unauthorized Page</h1>
            <button className="siginin-btn" onClick={()=>navigate("/")}>Login</button>
        </div>
      )
    }
      return <Outlet />
  }
  export default ProtectedRoute