import React, {useEffect, useState} from 'react'
import "./Postcard.css"
import axios from 'axios';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {useDispatch, useSelector } from 'react-redux'
import { readPost } from '../store/readPost';
import Loading from '../Loading/Loading';
export default function PostCard() {
  const { userInfo ,posts, loading} = useSelector((state) => state.user)
  let navigate=useNavigate();
  const dispatch = useDispatch()
  const[delPost,setDelPost]=useState(false)
  useEffect(()=>{
    dispatch(readPost(userInfo.fname + " " +userInfo.lname));
    setDelPost(false)

  },[delPost]);
console.log(posts)
  function del (id){
    console.log(id)
    const config = {
      withCredentials: true,
      params: {
          'postID':id,
      },
    }; 

      return axios.delete("http://localhost:5000/deletePost",config)
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
        <img src={`data:image/image/png;base64, ${Buffer.from(item.img.data).toString('base64')}`} style={{width:'200px', height:'150px'}}></img>
        <h4>{item.title}</h4>
        <button onClick={()=>navigate("/editpost", { state: { post:item } })} className='readmore-btn' >Edit</button>
        <button onClick={()=>del(item._id)} className='readmore-btn' >delete</button>
        <button onClick={()=>navigate("/post", { state: { post:item } })} className='readmore-btn' >read more..</button>
      </div>
    ))}
    </>:
    <h2>You have no posts</h2>}
    </Box>
    </>:null}
    </>}
    
    
    </div>
  )
}
