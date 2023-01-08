import React, {useState} from 'react'
import {  SwatchesPicker } from 'react-color';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function ColorPicker() {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [textColor,setTextColor]=useState("")
    
    function handleChange(color, event) {
        setTextColor(color)
    }
    console.log(textColor.hex)
  return (
    <div>
    <button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
    Font color
    </button>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
         <MenuItem onClick={handleClose} ><SwatchesPicker onChange={ handleChange }/></MenuItem>

    </Menu>
    </div>
  )
}

export default ColorPicker