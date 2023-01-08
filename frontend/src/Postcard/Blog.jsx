import React, {useState, useEffect} from 'react'
import "./Postcard.css"
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Loading from '../Loading/Loading';
import {useDispatch, useSelector } from 'react-redux'
import {readAllPost} from "../store/readAllPosts"
import { unstable_createChainedFunction } from '@mui/utils';
function Blog() {
  const dispatch = useDispatch()
  const { posts, loading, error} = useSelector((state) => state.user)
  console.log(loading)
  useEffect(()=>{
    dispatch(readAllPost());
  },[]);

 
 var navigate= useNavigate();
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

export default Blog