import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { CircularProgress } from '@mui/material';
import AOS from "aos";
import "aos/dist/aos.css";
import { loginAccount } from '../../auth/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';
function Login() {
  const [tentaikhoan, setUsername] = useState('');
  const [matkhau, setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate()

  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault()
    const action = loginAccount({ tentaikhoan, matkhau });
    try {
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);

      toast.success('Đăng nhập thành công', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Cookies.remove("refreshToken_theodoithidua");
      Cookies.set("refreshToken_theodoithidua", data.refreshToken, {
        expires: 7,
        secure: true,
      });
      navigate("/dashboard/home");
    } catch (error) {

      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    // <div>
    <div className='flex items-center min-h-screen justify-center bg-center bg-cover' >
      <form onSubmit={()=>handleLogin()} className='p-8 shadow-lg shadow-slate-400  rounded-lg border  bg-center bg-cover border-white' style={{ backgroundImage: `url('/nentrongdong.png')` }}>
        <div className='flex items-center justify-center space-x-2'>
          <img src="/conganhieu.png" alt="logo" className='w-[100px]' />
          {/* <img src="/huyhieudoan.png" alt="logo" className='w-[80px]'/> */}
        </div>

        <h3 className='text-center text-xl font-bold text-[crimson] mb-2 uppercase'>CÔNG AN TỈNH Hưng Yên</h3>
        <h3 className='text-center text-xl font-sans text-[darkred]'>Phần mềm quản lý, theo dõi công tác cán bộ và tổng hợp, theo dõi</h3>
        <h3 className='text-center text-xl font-sans text-[darkred]'>công tác thi đua, khen thưởng, kỉ luật của tập thể và cá nhân theo mô hình tổ chức mới</h3>

        <div className='flex'>
          <div className='md:basis-1/3 flex-1'>
            <div className='flex flex-col mt-8'>
              <span className='text-md font-medium mb-1'>Tên đăng nhập</span>
              <input defaultValue={tentaikhoan} name='tentankhoan' type="text" placeholder='Tài khoản...'
                className='outline-none border rounded-md p-2 border-red-400
                    focus:border-blue-500 focus:border-2'
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='flex flex-col my-2'>
              <span className='text-md mb-1 font-medium'>Mật khẩu</span>
              <input defaultValue={matkhau} name='matkhau' type="password" placeholder='Mật khẩu...'
                className='outline-none mb-4 border rounded-md p-2 border-red-400
                    focus:border-blue-500 focus:border-2'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        {isSubmit && (
          <div className='text-center'><CircularProgress /></div>
        )}

        <Button variant="contained" className='w-full' onClick={handleLogin} color="error"  type='submit' disabled={isSubmit}>
          Đăng nhập
        </Button>

        <p className='text-center mt-8 font-semibold text-[darkred]'>Bản quyền thuộc về Công an tỉnh Hưng Yên</p>
        <p className='text-center font-semibold text-[darkred]'>@2026 - Thiết kế xây dựng phần mềm: Vũ Văn Tính</p>

      </form>
    </div>
  )
}

export default Login
