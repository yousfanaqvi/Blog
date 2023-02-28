import React, {useEffect, useState}  from 'react'
import TextField from '@mui/material/TextField';
import 'animate.css';
import "./Register.css"
import "../Login/Login.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux'
import {registerUser} from "../store/register"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import PortraitIcon from '@mui/icons-material/Portrait';
import LockIcon from '@mui/icons-material/Lock';
import Loading from '../Loading/Loading';
import Alert from '@mui/material/Alert';
import { userActions } from '../store/userSlice';

function Register() {
//////////////////////////store and navigate/////////////////////////////////////////////
  const { loading,Response,error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.reset());
  }, [])
 
  const [question, setQuestion] = React.useState('');

  const handleQChange = (event) => {
    setQuestion(event.target.value);
  };
  ///////////////////////////////////////validate password/////////////////////////////////
  const [data,setData]= useState({
    password:"",
    cPassword:""
  });

  const [passMatch, setPassmatch]=useState("true");

  React.useEffect(() => {
    validatePassword();
  }, [data]);

  const validatePassword = () => {
    data.password === data.cPassword
      ? setPassmatch(true)
      : setPassmatch(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  //////////////////////////send data to backend through user slice /////////////////////////
  async function sendData (e) {
  e.preventDefault();
  validatePassword();
  if (passMatch && data.password.length>=8){
      const bodyFormData = new FormData(e.target)
      bodyFormData.set("username",e.target.username.value.toLowerCase())
      dispatch(registerUser(bodyFormData))
      }
  }

  return (
    <div className='register-container'>
    <div className='register-content'>
    <div className='reg-img'>
      <span className='reg-desc'>
        <p className='animate__animated animate__fadeInDown'>Your online platform inspired by a your daily life,personal interests and areas of expertise</p>
        <p className='animate__animated animate__fadeInDown animate__delay-2s'>Publish your passions, your way</p>
        <p className='animate__animated animate__fadeInDown animate__delay-3s'>Save the moments that matter</p>
      </span>
    </div>
    <form className='register-form' onSubmit={sendData} encType="multipart/form-data" > 
    <h1>Register</h1>
        <span className="form-box">
          <AccountBoxIcon sx={{color:'#c3c1c7',fontSize:30, m:2}}/>
          <TextField fullWidth id="standard-basic" name="fname" label="First name" type="text" variant="standard" required />
          <TextField fullWidth id="standard-basic" name="lname" label="Last name" type="text" variant="standard" required />
        </span>
        <span className="form-box">
          <EmailIcon sx={{color:'#c3c1c7',fontSize:30, m:2}}/>
          <TextField fullWidth id="standard-basic" name="username" label="Email" type="email" variant="standard" required />
        </span>
        <span className="form-box">
          <PortraitIcon sx={{color:'#c3c1c7',fontSize:30, m:2}}/>
          <TextField fullWidth type="file" name="image" id="image" helperText="Profile picture" required/>
        </span>
        <span className="form-box">
          <LockIcon  sx={{color:'#c3c1c7',fontSize:30, m:2,}}/>
          <TextField  fullWidth id="password" name="password" label="password" type="password" variant="standard" 
          value={data.password}
          onChange={handleChange}
          required />
          <TextField fullWidth id="cPassword" name="cp" label="confirm password" type="password" variant="standard" 
          value={data.cPassword}
          onChange={handleChange}
          required />
        </span>
        <span className='sec-question'>
        <InputLabel id="demo-simple-select-label">Security question</InputLabel>
        <Select
          value={question}
          label="Question"
          name="Question"
          onChange={handleQChange}
        >
          <MenuItem value={"What is your first school name?"}>What is your first school name?</MenuItem>
          <MenuItem value={"What is your pet's name?"}>What is your pet's name?</MenuItem>
          <MenuItem value={"What is your favorite color?"}>What is your favorite color?</MenuItem>
        </Select>
            <TextField fullWidth id="standard-basic" name="answer" label="Answer" type="text" variant="standard" required />

        </span>
        
          <div className="input-error">
          {data.password !== data.cPassword ? "" : ""}
        </div>
        <div className="input-error">
          {passMatch ? "" : "Error: Passwords do not match"}<br></br>
          {data.password.length<=7 &&data.password.length >0 ? "Error: Password must be more than 7 characters long":null}
          {error?error:null}
        </div>
        {loading ?
          <div className='loading-div'><Loading/></div>
        :null}

        {Response?<Alert severity="success">Registered successfully!- please login</Alert>:null}

        <button type='submit' name="submit" className='siginin-btn' disabled={loading}>Submit</button>
      </form>
    </div>
     
    </div>
  )
}

export default Register