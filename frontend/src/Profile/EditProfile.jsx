import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { editProfile } from '../store/updateUser';
import "./Profile.css"
import { editPicture } from '../store/updatePicture';
import { getUserDetails } from '../store/getUser';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { userActions } from '../store/userSlice';
import axios from 'axios';
import Alert from '@mui/material/Alert';

function EditProfile( props) {
  
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const { userInfo,loading ,error,Response,editpicResponse} = useSelector((state) => state.user)
  const [value, setValue] = React.useState('1');
  const [formData, setFormData] = useState(userInfo);
  const[img,setImg]=useState(`data:image/image/png;base64, ${Buffer.from(formData.img.data).toString('base64')}`);
  const[alert,setAlert]=useState(null);
  const[isDel,setIsDel]=useState(false)

  var fname= userInfo.fname.charAt(0).toUpperCase() + userInfo.fname.slice(1);
  var lname=userInfo.lname.charAt(0).toUpperCase() + userInfo.lname.slice(1);

  const [data,setData]= useState({
    oldPassword:"",
    newPassword:"",
    cPassword:""
  });

  const [passMatch, setPassmatch]=useState("true");

  React.useEffect(() => {
    validatePassword();
  }, [data]);

  
 // media query
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(() => {
      console.log(editpicResponse)
      if(editpicResponse)
      dispatch(getUserDetails())  
    },[editpicResponse])

    useEffect(() => {
      dispatch(userActions.reset());
      if(isDel)
      {
        logout();
      }
    },)

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleImgChange = (e) => {
    const value = URL.createObjectURL(e.target.files[0]);
    setImg(()=>value);
  
  };
  const sendData = (e) => {
      e.preventDefault();
      const bodyFormData = new FormData(e.target)
      dispatch(editProfile(bodyFormData)) 
  }
  const sendPic = (e) => {
    e.preventDefault();
    const bodyFormData = new FormData(e.target)
    dispatch(editPicture(bodyFormData))
  }

  const validatePassword = () => {
    data.newPassword === data.cPassword
      ? setPassmatch(true)
      : setPassmatch(false);
  };

  const handlePassChange = (e) => {
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const config = {
    // withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  }; 

  const changePassword = (e) => {
    e.preventDefault();
    validatePassword();
    if (passMatch && data.newPassword.length>=8){
        const passdata=({
          oldPassword:e.target.oldPassword.value,
          newPassword:e.target.newPassword.value
        })
        return axios.post('https://blog-server-gilt.vercel.app/changePassword',passdata, config)
        .then((res) => {
          if(res.data.code=='500'){
            setAlert(true)
          }
          else if(res.data.code=='200'){
            logout();
          }
        });   
      }
  } 
  const logout= ()=>{
    setAlert(null)
    return axios.get('/logout', config)
    .then((res) => {
      if(res.data==="success"){
       dispatch(userActions.logout());
       navigate("/");
      }
    });  
  }


  const del =()=>{
      return axios.delete("/deleteAccount",config)
      .then((res)=>{
        if(res.data.code=='200'){
          setIsDel(true)
        }
      })
  }
  return (
    <div className='edit-container'>
    <h2>Edit profile</h2>
        <TabContext value={value} >
        <div className='edit-content'>
        <div className='tabs'>
          <TabList variant="scrollable" scrollButtons="auto"  
          textColor="primary" indicatorColor="secondary"
          onChange={handleTabChange} aria-label="tabs" orientation={matches ?'horizontal':'vertical'} 
          sx={{backgroundColor:'rgb(169, 169, 169,0.7)', height:'100%'}}>
            <Tab sx={{m:2}} label="Details" value="1" />
            <Tab sx={{m:2}} label="Picture" value="2" />
            <Tab sx={{m:2}} label="password" value="3" />
            <Tab sx={{m:2}} label="Delete" value="4" />

          </TabList>
        </div>
        <div sx={{width:'100vw'}} >
          <TabPanel value="1" id="links">
            <form className='edit-form' onSubmit={sendData} >
              <TextField fullWidth id="standard-basic" name="fname" label="First name" type="text" variant="standard"
                value={formData.fname}
                onChange={handleChange}
              />
              <TextField fullWidth id="standard-basic" name="lname" label="Last name" type="text" variant="standard"
                value={formData.lname}
                onChange={handleChange} />
              <button type='submit' name="submit" className='siginin-btn' disabled={loading} >Submit</button>
            </form>
          </TabPanel>  

          <TabPanel value="2" id="links">
            <form className='edit-form' onSubmit={sendPic} encType="multipart/form-data">
              <Avatar src={img} sx={{width:150,height:150, m:1}}></Avatar>
                <input type="file" name="image" id="image" onChange={handleImgChange}></input>
                {editpicResponse?editpicResponse:null}
              <button type='submit' name="submit" className='siginin-btn'  disabled={loading}>Submit</button>
            </form>
          </TabPanel>

          <TabPanel value="3" id="links">
            <form className='changePass-form' onSubmit={changePassword}>
            <Alert severity='info'>You will be logged out after resetting your password</Alert>
              <TextField fullWidth id="oldPassword" name="oldPassword" label="old password" type="password" variant="standard" 
                value={data.oldPassword}
                onChange={handlePassChange}
                required />
              <TextField fullWidth id="newPassword" name="newPassword" label="new password" type="password" variant="standard" 
                value={data.newPassword}
                onChange={handlePassChange}
                required />
              <TextField fullWidth id="cPassword" name="cp" label="confirm password" type="password" variant="standard" 
                value={data.cPassword}
                onChange={handlePassChange}
                required />
                <div className="input-error">
                  {data.newPassword !== data.cPassword ? "" : ""}
                </div>
                <div className="input-error">
                  {passMatch ? "" : "Error: Passwords do not match"}<br></br>
                  {data.newPassword.length<=7 &&data.newPassword.length >0 ? "Error: Password must be more than 7 characters long":null}
                  {error?error:null}
                </div>
                {alert===true?<Alert severity="error">"Given old password is incorrect"</Alert>:null}
                <button name='submit'  className='siginin-btn' type='submit'>submit</button>
            </form>
          </TabPanel> 

          <TabPanel value="4" id="links">
            <div className='del-content'>
            <Alert severity='info'>You will be logged out after deleting your account</Alert>
              <h1>Are you sure you want to delete this user?</h1>
              <p className='del-desc'>{fname}&nbsp;{lname} and their data will be permanently deleted.</p>
              <button type='submit' name='submit' className='del-btn' onClick={del}>Delete</button>
            </div>
          </TabPanel>
          </div>
        </div>
        </TabContext>    
    </div>
  )
}

export default EditProfile