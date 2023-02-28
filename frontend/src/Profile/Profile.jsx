import React from 'react'
import "./Profile.css"
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import PostCard from '../Postcard/PostCard';
import {useNavigate} from "react-router-dom"

export default function Profile() {

    const navigate=useNavigate();
    const { userInfo } = useSelector((state) => state.user)
    var img=`data:image/image/png;base64, ${Buffer.from(userInfo.img.data).toString('base64')}`;
    var fname= userInfo.fname.charAt(0).toUpperCase() + userInfo.fname.slice(1);
    var lname=userInfo.lname.charAt(0).toUpperCase() + userInfo.lname.slice(1);
  return (
    <>
   
    <div className='profile'>
    <div className='Profile-container'>
      <div className='profile-avatar-box'>
        <h4 id="dashboard">PROFILE</h4>
        <Avatar src={img} sx={{width:100,height:100}}></Avatar>
          <p id="name">{fname}&nbsp;{lname}</p>
          <p id="username">{userInfo.username}</p>
            <Box>
              <button className='addPost-btn' onClick={()=>navigate("/newpost")}>New post</button>
            </Box>
      </div>
      <Box sx={{ width: '100%', height:'100%', overflowY:'scroll', display:'flex',
                 flexDirection:'row',flexWrap:'wrap' , justifyContent:'center',backgroundColor:'#E5E0FF' ,mt:'2rem', p:'2rem'}}> 
        <PostCard/>
      </Box>
      {/* <Box sx={{ width: '80%', height:'max-content', overflowY:'scroll', justifyContent:'center', mt:'0.5rem',backgroundColor:'#E5E0FF', m:'2rem'}}> */}
      {/* </Box> */}
    </div>
    
  </div>
 
</>
  )
}
