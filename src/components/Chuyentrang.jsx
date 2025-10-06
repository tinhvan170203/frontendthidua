import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const Chuyentrang = () => {
  return (
    // <div className='flex justify-center items-center fixed top-0 left-0 right-0 bottom-0'>
    //   <img src="/anhchuyentrang.gif" alt="anhchuyentrang" className='bg-center w-[400px]'/>
    // </div>
     <Backdrop
        sx={{ color: '#fff', zIndex: 1301 }}
        open={true}
      >
         <div className='fixed top-0 left-0 right-0 bottom-0 h-[100vh] flex items-center justify-center z-[100000] bg-white opacity-90'>
            <div className='flex-col relative'>
            <img alt="img" className='w-20' src='/cong-an-hieu.png'/>
            <div className='absolute top-[-12px] left-[-12px]'>
            <CircularProgress style={{width: '100px', height: "100px"}}/>
            </div>
            </div>
        </div>
       </Backdrop>
  )
}

export default Chuyentrang
