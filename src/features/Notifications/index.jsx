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
import TableNotification from './components/TableNotification';
import EditModal from './components/EditModal';
import { useOutletContext } from "react-router-dom";
import DialogDelete from '../../components/DialogDelete';
import { useSelector } from 'react-redux';

const NotificationComponent = () => {
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
  const [display, setDisplay] = useState(false);
  const [thongbao, setThongbao] = useState("");
  const [notifications, setNotifications] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();

  const [handleChangeNotifications, handleLoading] = useOutletContext();

  const queryParams = useMemo(() => {
    const params = querystring.parse(location.search);
    return {
      ...params,
      thongbao: params.thongbao || ""
    };
  }, [location.search]);

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
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      thongbao: "",
      thutu: 1,
      status: true
    },
  });

  // handle submit search
  const handleFormSearchSubmit = (e) => {
    e.preventDefault()
    setSearchParams({ ...queryParams, thongbao });
  };


  //fetch notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        handleLoading(true);
        let res = await notificationApi.getNotifications(queryParams);
        setNotifications(res.data);
        handleChangeNotifications(res.data)
        // setTongbanghi(res.data.length);
        setTimeout(() => {
          handleLoading(false);
        }, 400);
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
  }, [queryParams]);

  //handle submit add notification
  const onSubmit = async (values) => {
    let data = { ...values, queryParams };
    handleLoading(true);
    try {
      let res = await notificationApi.addNotification(data);
      setNotifications(res.data.notifications)
      handleChangeNotifications(res.data.notifications)
      setTimeout(() => {
        handleLoading(false);
      }, 400)
      resetField('thongbao');
      resetField("thutu");
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
    let data = { ...values, queryParams };
    handleLoading(true);
    try {
      let res = await notificationApi.editNotification(data);
      setNotifications(res.data.notifications)
      handleChangeNotifications(res.data.notifications)

      setTimeout(() => {
        handleLoading(false);
      }, 400);
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
      let res = await notificationApi.deleteNotification(openDialogDelete.id_Delete, {...queryParams});
      
      setNotifications(res.data.notifications)
      handleChangeNotifications(res.data.notifications)

      setTimeout(() => {
        handleLoading(false);
      }, 400);

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
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản lý thông báo hệ thống</h4>
      </div>
      
      <form className='mt-2 px-6 py-4 shadow-gray-400 shadow-md' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex-col flex'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Nội dung thông báo mới: </label>
          <input {...register("thongbao", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
        </div>
        <div className='flex space-x-2'>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Thứ tự xuất hiện: </label>
            <input {...register("thutu", { required: true })} type="number" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'>Trạng thái hiển thị:</label>
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
          <Button onClick={() => setDisplay(true)} color="info" variant='contained'><SearchIcon /> Chức năng tìm kiếm</Button>
        </div>
      </form>
      {/* form tìm kiếm  */}
      {display && (
        <form onSubmit={(e) => handleFormSearchSubmit(e)} className='my-2 mt-4 shadow-gray-400 shadow-md p-4 rounded-lg' data-aos="zoom-in-down" data-aos-once="true">
          <div className='flex justify-between'>
            <h5 className='text-white text-[18px] font-semibold'>Tìm kiếm thông báo</h5>
          </div>
          <div className='flex space-x-4 mt-2'>
            <div className='flex-col flex flex-1'>
              <input type="text" defaultValue={thongbao}
                className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:ring-white focus:border-white'
                onChange={(e) => setThongbao(e.target.value)}
                placeholder='Nội dung thông báo' />
            </div>
          </div>
          <div className='my-2 text-center'>
            <Button  type='submit' color="info" variant='contained'><SearchIcon /> Tìm kiếm</Button>
          </div>
        </form>
      )}

      {/* table data  */}
         <div className='mt-6 px-2 shadow-black shadow-sm'>
        <TableNotification
          list={notifications}
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

export default NotificationComponent
