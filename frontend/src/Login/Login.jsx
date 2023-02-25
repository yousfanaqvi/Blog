import React,{useEffect, useState} from 'react'
import "./Login.css"
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import { loginUser } from '../store/login';
import { userActions } from '../store/userSlice';
import axios from "axios"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Loading from '../Loading/Loading';
function Login() {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const[invalidUser,setInvaliduser]=useState("");
    const { loading,userInfo,error,isAuth } = useSelector((state) => state.user);
    useEffect(() => {
      if (userInfo) {
        console.log(userInfo)
        navigate('/profile')
      }

    }, [navigate, userInfo])
   
    useEffect(() => {
      dispatch(userActions.reset());
    }, [])
   
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const sendData = (e) => {
         e.preventDefault();
        let userData = {
            "username":e.target.username.value,
            "password":e.target.password.value,
        }
        dispatch(loginUser(userData))

    }
   
    const submit = (e) => {
      e.preventDefault();
     let userData = {
         "username":e.target.username.value,
     }
     const config = {
        //  withCredentials: true,
         headers: {
           'Content-Type': 'application/json',
         },
       };
   
       return axios.post('/forgotpassword', userData, config)
       .then((res) => {
         console.log(res.data.code)
         if(res.data)
         {
          navigate("/forgotpassword",{state:{username:e.target.username.value, question:res.data.question, answer:res.data.answer}})
         }
         else if(res.data.code===500){
          setInvaliduser("invalid username")
         }
  
       });
  }
    
  return (
    <div className='Login-container'>
    <h1 id="login">Login</h1>
    <form onSubmit={sendData} className="login-form">
    <TextField fullWidth id="username" name="username" label="username" type="email" variant="standard" required />
    <TextField  fullWidth id="password" name="password" label="password" type="password" variant="standard" required />
    <a className='FpLink' onClick={handleClickOpen}>
      Forgot password
      </a>
    <button type='submit' name="submit" className='siginin-btn' disabled={loading}>Log in</button>
    {error ? error:null}
    {loading ?
      <div className='loading-div'><Loading/></div>
    :null}
    </form>
     
      <span>Not a Member? 
      <a className='signupLink' onClick={()=>{navigate("/register")}}> Join now</a> </span>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Forgot password</DialogTitle>
        <DialogContent>
        <form onSubmit={submit}>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Enter your username"
            type="email"
            fullWidth
            variant="standard"
          />
          <h5>{invalidUser?invalidUser:null}</h5>
          <button type='submit' name='submit' disabled={loading} >Continue</button>
          </form>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
        </DialogActions>
      </Dialog>
    </div>

  )
}

export default Login