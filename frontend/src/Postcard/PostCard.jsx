import React, {useEffect, useState} from 'react'
import "./Postcard.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {useDispatch, useSelector } from 'react-redux'
import { readPost } from '../store/readPost';
import Loading from '../Loading/Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
export default function PostCard() {
  const { userInfo ,posts, loading} = useSelector((state) => state.user)
  console.log(posts)
  let navigate=useNavigate();
  const dispatch = useDispatch()
  const[delPost,setDelPost]=useState(false)
  useEffect(()=>{
    // dispatch(readPost(userInfo.fname + " " +userInfo.lname));
    dispatch(readPost(userInfo._id));
    setDelPost(false)

  },[delPost]);
  function del (id){
    const config = {
      withCredentials: true,
      params: {
          'postID':id,
      },
    }; 

      return axios.delete("/deletePost",config)
      .then((res)=>{
        if(res.data.code=='200'){
          setDelPost(true)
        }
      })
  }
  return (
    <div>
    {loading? <div className='loading-div'><Loading/></div>:
    <>
    {posts?
    <>
    <Box sx={{ width: '100%', height:'100%', overflowY:'scroll', display:'flex',
                 flexDirection:'row',flexWrap:'wrap' , justifyContent:'center', p:'1rem',}}> 
    {posts.length!==0?
    <>
    {posts.map((item) =>(
      <div className='card' key={item.id}>
        <span className='post-btns'>
          <img src={`data:image/image/png;base64, ${Buffer.from(item.img.data).toString('base64')}`} style={{width:'400px', height:'400px'}} className='postcard-img'></img>
          <span className='post-btns2'>
            <button onClick={()=>navigate("/editpost", { state: { post:item } })} className='editPost-btn' title='edit' ><EditIcon sx={{fontSize:'small'}}></EditIcon></button>
            <button onClick={()=>del(item._id)} className='delPost-btn' title='delete' ><DeleteIcon sx={{fontSize:'small'}}></DeleteIcon></button>
          </span>
        </span>
        <h4>{item.title}</h4>
        <button onClick={()=>navigate("/post", { state: { post:item } })} className='readmore-btn' >read more..</button>
      </div>
    ))}
    </>:
    <h2>You have no posts</h2>}
    </Box>
    </>:null
    }
    </>}
    
    
    </div>
  )
}
