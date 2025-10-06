import React, { useMemo, useState, useEffect } from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import ModalLoading from '../../components/ModalLoading';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
// import EditModal from './components/EditModal';
import { useOutletContext } from "react-router-dom";
import DialogDelete from '../../components/DialogDelete';
import donviApi from '../../api/donviApi';
import Select from 'react-select';
import chidoanApi from '../../api/chidoanApi';
import TableChidoan from './components/TableChidoan';
import EditModal from './components/EditModal';
import { useSelector } from 'react-redux';

const Chidoans = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [donvis, setDonvis] = useState([]);
  const [display, setDisplay] = useState(false);
  const [chidoans, setChidoans] = useState([]);
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const navigate = useNavigate();
  const [tenchidoan, setTenchidoan] = useState('');

  const queryParams = useMemo(() => {
    const params = querystring.parse(location.search);
    return {
      ...params,
      tenchidoan: params.tenchidoan || "",
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

  // handle submit search
  const handleFormSearchSubmit = (e) => {
    e.preventDefault()
    setSearchParams({ ...queryParams, tenchidoan});
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
      tenchidoan: "",
      nhomdonvithuocchidoan: "",
      thutu: 1,
      status: true
    },
  });


  //fetch don vi
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await donviApi.getDonvis();
        setDonvis(res.data.map(i => ({ value: i._id, label: i.tendonvi })))
      } catch (error) {
        if (
          error.message ===
          "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại"
        ) {
          navigate("/login");
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
        console.log(error.message)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        handleLoading(true);
        let res = await chidoanApi.getChidoans(queryParams);
        setChidoans(res.data)
        setTimeout(() => {
          handleLoading(false);
        }, 400);
      } catch (error) {
        if (
          error.message ===
          "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại"
        ) {
          navigate("/login");
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
        console.log(error.message)
      }
    };

    fetchData();
  }, [queryParams]);

  //handle submit add doi
  const onSubmit = async (values) => {
    let data = { ...values, queryParams };
    handleLoading(true);
    try {
      let res = await chidoanApi.addChidoan(data);
      setChidoans(res.data.chidoans)
      setTimeout(() => {
        handleLoading(false);
      }, 400)
      resetField('tenchidoan');
      resetField("thutu");
      resetField("nhomdonvithuocchidoan");
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
      let res = await chidoanApi.editChidoan(data);
      setChidoans(res.data.chidoans)

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
      let res = await chidoanApi.deleteChidoan(openDialogDelete.id_Delete, { ...queryParams });
      setChidoans(res.data.chidoans)

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
      <div className='flex items-center space-x-1'>
        <GridViewIcon color='primary' fontSize="large" />
        <h4 className='font-bold text-gray-800 text-lg'>Quản lý chi đoàn, liên chi đoàn</h4>
      </div>
      {roles && roles.includes('thêm mô hình tổ chức') && (
      <form className='mt-2 mx-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex-col flex'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên chi đoàn, liên chi đoàn: </label>
          <input {...register("tenchidoan", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
        </div>
        <div className='flex space-x-2'>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Thứ tự: </label>
            <input {...register("thutu", { required: true })} type="number" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
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
        <div className='flex-col flex'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Các đơn vị thuộc chi đoàn, liên chi đoàn: </label>
          <Controller
            control={control}
            name="nhomdonvithuocchidoan"
            render={({ field }) => (
              <Select
                isMulti
                required={true}
                name="nhomdonvithuocchidoan"
                options={donvis}
                className="basic-multi-select my-4"
                classNamePrefix="select"
                placeholder="Vui lòng chọn đơn vị"
                {...field}
              />
            )}
          />
        </div>
        <div className='md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
          <Button type='submit' sx={{ width: "220px", backgroundColor: "gray" }} color="primary" variant='contained'><AddIcon /> Thêm mới</Button>
          <Button sx={{ width: "220px", backgroundColor: "darkgray" }} onClick={() => setDisplay(true)} color="info" variant='contained'><SearchIcon /> Chức năng tìm kiếm</Button>
        </div>
      </form>
      )}

      {/* form tìm kiếm  */}
      {display && (
        <form onSubmit={(e) => handleFormSearchSubmit(e)} className='my-2 mt-4 mx-8 bg-slate-800 p-4 rounded-lg shadow-xl' data-aos="zoom-in-down" data-aos-once="true">
          <div className='flex justify-between'>
            <h5 className='text-white text-[18px] font-semibold'>Tìm kiếm chi đoàn, liên chi đoàn</h5>
            <IconButton onClick={() => setDisplay(false)} sx={{ backgroundColor: "#ccc" }}>
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </div>
          <div className='flex space-x-4 mt-4'>
            <div className='flex-col flex flex-1'>
              <input type="text" defaultValue={tenchidoan}
                className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:ring-white focus:border-white'
                onChange={(e) => setTenchidoan(e.target.value)}
                placeholder='Tên chi đoàn, liên chi đoàn' />
            </div>
          </div>
          <div className='my-2 text-center'>
            <Button sx={{ width: "200px", backgroundColor: "slategray" }} type='submit' color="info" variant='contained'><SearchIcon /> Tìm kiếm</Button>
          </div>
        </form>
      )}

      {/* table data  */}
      <div className='mt-6 mx-8'>
        <TableChidoan
          list={chidoans}
          onClickOpenDialogDelete={handleOpenDialogDelete}
          onClickOpenDialogEdit={handleOpenDialogEdit} />
      </div>

      <EditModal
        open={openDialogEdit.status}
        item={openDialogEdit.item}
        onCloseDialogEdit={handleCloseDialogEdit}
        onSubmit={handleSubmitEdit}
        donvis={donvis}
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

export default Chidoans
