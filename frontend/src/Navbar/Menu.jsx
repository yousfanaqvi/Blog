import React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import "./Nav.css"
import {useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux";
import axios from 'axios';
import { userActions } from '../store/userSlice';

function AccountMenu() {

  const { userInfo } = useSelector((state) => state.user)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const navigate=useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  let img="";
    if(userInfo){
      img=`data:image/image/png;base64, ${Buffer.from(userInfo.img.data).toString('base64')}`;
    }  

    const logout= ()=>{
      const config = {
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      return axios.get('http://localhost:5000/logout', config)
      .then((res) => {
        console.log(res)
        if(res.data==="success"){
         dispatch(userActions.logout());
         navigate("/");
        }
      });  
    }
  return (
    <React.Fragment>
      <div className='Navbar'>
      <h2 id="app-title" onClick={()=>navigate("/")}>Better Living</h2>
      {!userInfo?<a className='nav-link' onClick={()=>navigate("/")}>Home</a>:null}
        <a className='nav-link' onClick={()=>navigate("/blog")}>Blog</a>
        {userInfo?<Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={img} alt=""></Avatar>
          </IconButton>
        </Tooltip>:null}
      </div>
      {userInfo?<Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        
        {userInfo? <MenuItem onClick={()=>{navigate("/profile");handleClose();}}>
        <Avatar sx={{ width: 32, height: 32 }} src={img}></Avatar>Profile
        </MenuItem>:null}
        {userInfo?<MenuItem onClick={()=>navigate("/editprofile")}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>:null}
        {userInfo?<MenuItem  onClick={()=>{logout();handleClose();}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
        Logout
        </MenuItem>:null}
      </Menu>:null}
    </React.Fragment>
  );
}


export default AccountMenu;