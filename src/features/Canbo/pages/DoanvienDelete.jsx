import React, { useMemo, useState, useEffect } from 'react'
import { Button, IconButton, Paper } from '@mui/material';
import { useForm, Controller } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add';
import { useOutletContext, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import canboApi from '../../../api/canboApi';
import TableDoanvienDelete from '../components/TableDoanvienDelete';
import { useSelector } from 'react-redux';




const DoanvienDelete = () => {
  let vaitro = useSelector((state) => state.authReducer.vaitro_theodoithidua);
  const navigate = useNavigate();
  if (vaitro !== "Quản trị hệ thống") {
    toast.error("Tài khoản không có truy cập trang này", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    return <Navigate to='/login' replace />;
  };
  const [handleChangeNotifications, handleLoading] = useOutletContext();

  const [dataBang, setDataBang] = useState([])

  const {
    register,
    handleSubmit,
    control,
    resetField,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hoten: ""
    },
  });


  const handleFetchDoanvienDelete = async (values) => {
    let params = { ...values }
    try {
      handleLoading(true);
      let res = await canboApi.fetchCanboStatusDelete(params);
      setDataBang(res.data)
      handleLoading(false)
    } catch (error) {
      if (
        error.message ===
        "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại"
      ) {
        navigate("/login");
        handleLoading(false);
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
      handleLoading(false);
    }
  };

  const changeStatusDoanvien = async (id) => {
    handleLoading(true)
    try {
       await canboApi.changeActive(id);

       let data = [...dataBang];
       data = data.filter(i=> i._id.toString() !== id);
       setDataBang(data);
      handleLoading(false);
      toast.success("Thay đổi trạng thái thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      
      if (
        error.message ===
        "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại"
      ) {
        navigate("/login");
        handleLoading(false);
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
      handleLoading(false);
    }
  };

  const deleteDoanvien = async (id) => {
    handleLoading(true)
    try {
       await canboApi.deletePersonAdvaned(id);

       let data = [...dataBang];
       data = data.filter(i=> i._id.toString() !== id);
       setDataBang(data);
      handleLoading(false);
      toast.success("Xóa đoàn viên khỏi hệ thống thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
      handleLoading(false);
    }
  }




  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
     <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản lý danh sách cán bộ, chiến sĩ bị xóa bởi tài khoản người dùng (mức 1)</h4>
      </div>

      <form onSubmit={handleSubmit(handleFetchDoanvienDelete)}>
        <div className='flex mt-4 px-4 space-x-2 md:flex-row justify-end items-start'>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
            <label className='underline font-semibold'>Họ tên: </label>
            <input {...register("hoten")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col flex md:basis-1/6'>
            <Button size='small'
              type="submit" color="primary" variant='contained'><AddIcon /> Lấy dữ liệu</Button>
          </div>
        </div>
      </form>


        <div className='px-4' data-aos="fade-left" data-aos-once="true">
    

          <div className='mt-4'>
            <TableDoanvienDelete list={dataBang} onChangeStatus={changeStatusDoanvien} onDelete={deleteDoanvien}/>
          </div>
        </div>

    </div>
  )
}

export default DoanvienDelete