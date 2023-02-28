import './App.css';
import React,{useEffect} from "react"; 
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Home from './Home/Home';
import Menu from './Navbar/Menu';
import Forgotpassword from "./Forgotpassword/Forgotpassword";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import {useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './Protectedroute';
import EditProfile from './Profile/EditProfile';
import {readAllPost} from "../src/store/readAllPosts"
import { getUserDetails } from '../src/store/getUser';
import Newpost from './Postcard/Newpost';
import Post from './Postcard/Post';
import Blog from './Postcard/Blog';
import EditPost from "./Postcard/EditPost"
function App() {

  const dispatch = useDispatch()
  const { sessionId, userInfo } = useSelector((state) => state.user)
  
  useEffect(() => {
    if (sessionId) {
      dispatch(getUserDetails())    
    }
  }, [sessionId, dispatch])
  return (
    <div>
    <Router>
    <Menu/> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>  
        <Route path="/blog" element={<Blog/>}/>  

        <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path="/post" element={<Post/>}/> 
            <Route path="/newpost" element={<Newpost/>}/>  
            <Route path="/editpost" element={<EditPost/>}/>  
          </Route>
        <Route path="/forgotpassword" element={<Forgotpassword/>}/>
      </Routes>
   </Router>
    </div>
  );
}

export default App;
