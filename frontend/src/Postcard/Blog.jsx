import React, { useEffect} from 'react'
import "./Postcard.css"
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Loading from '../Loading/Loading';
import {useDispatch, useSelector } from 'react-redux'
import {readAllPost} from "../store/readAllPosts"
import { userActions } from '../store/userSlice';
import { TextField } from '@mui/material';
function Blog() {
  const dispatch = useDispatch()
  const { posts, loading, error} = useSelector((state) => state.user)
  useEffect(()=>{
    dispatch(readAllPost());
  },[]);
  console.log(posts)

  const categories = [
    {
      value: '',
      label: 'All',
      },
    {
    value: 'lifestyle',
    label: 'lifestyle',
    },
    {
    value: 'fashion',
    label: 'fashion',
    },
    {
    value: 'travel',
    label: 'travel',
    },
    {
    value: 'food',
    label: 'food',
    },
    ,
    {
    value: 'science',
    label: 'science',
    },
    ,
    {
    value: 'health',
    label: 'health',
    },
  ];
  var x='';
  const [category, setCategory] = React.useState('');
      const handleChange = (event) => {
        setCategory(event.target.value);
        x =posts.filter(post => post.category.includes(category))
  };

  var navigate= useNavigate();
  return (
    <>
    <div className='blog-bg'></div>
    <div className='blog-container'>
      <div className='search-post-container'>
        <form>
        <TextField fullWidth
              select
              value={category}
              name="category"
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Select any category"
            >
              {categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
        </form>
      </div>
    {loading? <div className='loading-div'><Loading/></div>:
    <>
    {posts?
    <>
    <Box sx={{ width: '100%', height:'100%', overflowY:'scroll', display:'flex',
                 flexDirection:'row',flexWrap:'wrap' , justifyContent:'center', pt:'4rem',}}> 
    {posts.length!==0 && category === ''?
    <>
    {posts.map((item) =>(
      <div className='card' key={item.id}>
        <img src={`data:image/image/png;base64, ${Buffer.from(item.img.data).toString('base64')}`} style={{width:'200px', height:'150px', borderRadius:'10%'}}></img>
        <h4>{item.title}</h4>
        <button onClick={()=>navigate("/post", { state: { post:item } })} className='readmore-btn' >read more..</button>
      </div>
    ))}
    </>:
    null}
    </Box>
    </>:null}
    </>}
    
    {category!==''?
    <>
    {posts.filter(post => post.category.includes(category)).map(filteredcategory => (
      <div className='card' key={filteredcategory.id}>
        <img src={`data:image/image/png;base64, ${Buffer.from(filteredcategory.img.data).toString('base64')}`} style={{width:'200px', height:'150px', borderRadius:'10%'}}></img>
        <h4>{filteredcategory.title}</h4>
        <button onClick={()=>navigate("/post", { state: { post:filteredcategory } })} className='readmore-btn' >read more..</button>
      </div>
     ))}
    </>:null
    }

    
    </div>
    </>
  )
}

export default Blog