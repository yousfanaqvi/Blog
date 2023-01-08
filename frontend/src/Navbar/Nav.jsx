// import React,{useEffect} from 'react'
// import "./Nav.css"
// import {useNavigate} from "react-router-dom"
// import {useSelector,useDispatch} from "react-redux";
// import axios from 'axios';
// import { userActions } from '../store/userSlice';
// import Menu from "./Menu"

// export default function Nav() {
//     const navigate=useNavigate();
   

//     const { userInfo, sessionId } = useSelector((state) => state.user)
//     const dispatch = useDispatch()
//     // automatically authenticate user if session is found
     

//     const logout = () => {
      
//      const config = {
//          withCredentials: true,
//          headers: {
//            'Content-Type': 'application/json',
//          },
//        };
   
//        return axios.get('http://localhost:5000/logout', config)
//        .then((res) => {
//          console.log(res)
//          if(res.data==="success"){
//           dispatch(userActions.logout());
//           navigate("/");
//          }
//        });   
//   }

//   return (
//     <div className='navbar'>
//     <h2>Better Living</h2>
//     <Menu/>
        
//      {/* <ul> 
     
//         {!userInfo?<li>Home</li>:null}
//         {userInfo?<li>Blog</li>:null}
//         {userInfo? <li onClick={()=>navigate("/profile")}>Profile</li>:null}
//         {userInfo?<li onClick={()=>logout()}>Logout</li>:null}
//     </ul> */}
//     </div>
//   )
// }

  