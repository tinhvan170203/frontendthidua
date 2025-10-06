import React, { useMemo, useState, useEffect } from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate, Navigate } from "react-router-dom";
import notificationApi from '../../api/notificationApi';
import ModalLoading from '../../components/ModalLoading';
import { toast } from 'react-toastify';
import EditModal from './components/EditModal';
import { useOutletContext } from "react-router-dom";
import DialogDelete from '../../components/DialogDelete';
import TableKhoi from './components/TableKhoi';
import { useSelector } from 'react-redux';
import hinhthuckhenApi from '../../api/hinhthuckhen';

const HinhthuckhenComponent = () => {
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
  const [khois, setKhois] = useState([])

  const [handleChangeNotifications, handleLoading] = useOutletContext();

  const [openDialogEdit, setOpenDialogEdit] = useState({
    status: false,
    item: null,
  });

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit({
      ...openDialogEdit,
      status: false,
    });
  };

  //open dialog edit
  const handleOpenDialogEdit = (item) => {
    setOpenDialogEdit({
      item,
      status: true,
    });
  };

  //state mở hộp thoại delete
  const [openDialogDelete, setOpenDialogDelete] = useState({
    status: false,
    id_Delete: null,
  });

  //open dialog delete
  const handleOpenDialogDelete = (id) => {
    setOpenDialogDelete({
      status: true,
      id_Delete: id,
    });
  };

  const handleCancelDelete = () => {
    setOpenDialogDelete({
      ...openDialogDelete,
      status: false,
    });
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete({
      ...openDialogDelete,
      status: false,
    });
  };


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
      hinhthuckhen: "",
      thutu: 1,
      status: true
    },
  });


  //fetch notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        handleLoading(true);
        let res = await hinhthuckhenApi.getHinhthuckhens();
        setKhois(res.data);
        handleLoading(false);
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

      }
    };

    fetchData();
  }, []);

  //handle submit add notification
  const onSubmit = async (values) => {
    let data = { ...values };
    handleLoading(true);
    try {
      let res = await hinhthuckhenApi.addHinhthuckhen(data);
      setKhois(res.data.khois)
      handleLoading(false);
      resetField('hinhthuckhen');
      setValue("thutu", Number(values.thutu) + 1);
      resetField("status");
      toast.success(res.data.message, {
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
  };

  //handle submit edit notification
  const handleSubmitEdit = async (values) => {
    let data = { ...values };
    handleLoading(true);
    try {
      let res = await hinhthuckhenApi.editHinhthuckhen(data);
      setKhois(res.data.khois)
      handleLoading(false);
      toast.success(res.data.message, {
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
  };

  // handle delete notification
  const handleConfirmDelete = async () => {
    handleLoading(true);
    try {
      let res = await hinhthuckhenApi.deleteHinhthuckhen(openDialogDelete.id_Delete);

      setKhois(res.data.khois)
      handleLoading(false);
      setOpenDialogDelete({
        ...openDialogDelete,
        status: false
      })
      toast.success(res.data.message, {
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
      setOpenDialogDelete({
        ...openDialogDelete,
        status: false
      });
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
  const roles = useSelector((state) => state.authReducer.roles_theodoithidua);

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
     <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản lý hình thức khen thưởng</h4>
      </div>

      <form className='mt-2 px-6 py-4 shadow-gray-400 shadow-md' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex-col flex'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Hình thức khen thưởng: </label>
          <input {...register("hinhthuckhen", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
        </div>
        <div className='flex space-x-2'>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Thứ tự xuất hiện: </label>
            <input {...register("thutu", { required: true })} type="number" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'>Trạng thái sử dụng:</label>
            <Controller
              name="status"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch
                  checked={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>
        <div className='md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
          <Button type='submit' color="primary" variant='contained'><AddIcon /> Thêm mới</Button>
        </div>
      </form>

      {/* table data  */}
      <div className='mt-6 px-2 shadow-black shadow-sm'>
        <TableKhoi
          list={khois}
          onClickOpenDialogDelete={handleOpenDialogDelete}
          onClickOpenDialogEdit={handleOpenDialogEdit} />
      </div>

      <EditModal
        open={openDialogEdit.status}
        item={openDialogEdit.item}
        onCloseDialogEdit={handleCloseDialogEdit}
        onSubmit={handleSubmitEdit}
      />

      <DialogDelete
        open={openDialogDelete.status}
        onCloseDialogDelete={handleCloseDialogDelete}
        onConfirmDelete={handleConfirmDelete}
        onCancelDelete={handleCancelDelete}
      />

    </div>
  )
}

export default HinhthuckhenComponent
