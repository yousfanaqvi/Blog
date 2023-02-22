import React from "react"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {

    let navigate=useNavigate();
    const { userInfo} = useSelector((state) => state.user)
    
    if (!userInfo) {
      return (
        <div className='unauthorized'>
          <h1>Unauthorized Page</h1>
          <h3>Please Login or Create an Account with us!</h3>
          <div className="unauth-cta">
            <a className="unauth-link" onClick={()=>navigate("/")}>Login</a>
            <a className="unauth-link" onClick={()=>navigate("/register")}>Join us</a>

          </div>
            
        </div>
      )
    }
      return <Outlet />
  }
  export default ProtectedRoute