import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import NotificationsIcon from '@mui/icons-material/Notifications';

const MenuChildrent = ({ option }) => {
  // console.log(option)
  const [count, setCount] =  useState(0);

  useEffect(()=>{
    // console.log('number,',option.quanlity)
    // if(!option.quanlity)return;
    setCount(option.quanlity)
  },[option.quanlity])
  return (
    <NavLink to={option.link}>
      <div className='pl-4 relative py-2 flex space-x-2 items-end w-full hover:bg-red-800 transition duration-300'>
        {option.icon}
        <Typography sx={{ color: "white", fontSize: "14px" }}>
          {option.name}
        </Typography>
       { count !== undefined && count !== 0 && (
        <div className='absolute top-[2px] right-0 flex items-center justify-center'>
            <NotificationsIcon style={{color: "#fff"}}/>
         <span className='absolute top-[2px] text-red-700 right-[8px] flex items-center justify-center text-sm font-bold'>
          {count}
          </span>
          </div>    
       )}
      </div>
    </NavLink>
  )
}

export default MenuChildrent
