import React, {useState} from 'react'
import "./Profile.css"
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Box from '@mui/material/Box';
import PostCard from '../Postcard/PostCard';
import {useNavigate} from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';

export default function Profile() {

    const navigate=useNavigate();
    const { userInfo } = useSelector((state) => state.user)
    console.log(userInfo)
    var img=`data:image/image/png;base64, ${Buffer.from(userInfo.img.data).toString('base64')}`;
    var fname= userInfo.fname.charAt(0).toUpperCase() + userInfo.fname.slice(1);
    var lname=userInfo.lname.charAt(0).toUpperCase() + userInfo.lname.slice(1);
     
  return (
    <>
   
    <div className='profile'>
      <h4 id="dashboard">Dashboard</h4>
    <div className='Profile-container'>
      <div className='profile-avatar-box'>
        <Avatar src={img} sx={{width:100,height:100}}></Avatar>
          <p id="name">{fname}&nbsp;{lname}</p>
          <p id="username">{userInfo.username}</p> 
      </div>
      <Box sx={{ width: '100%', height:'100%', overflowY:'scroll', justifyContent:'center', p:'4rem',}}>
        <PostCard/>
      </Box>
    </div>
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
    <Tooltip title="New post">
      <SpeedDial
        onClick={()=>navigate("/newpost")}
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom:-250, right: 10 }}
        icon={<SpeedDialIcon />}
      ></SpeedDial>
      </Tooltip>
    </Box>
  </div>
 
</>
  )
}
