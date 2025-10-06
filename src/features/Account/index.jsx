import GridView from '@mui/icons-material/GridView'
import React, { useState, useEffect, useMemo } from 'react'
import { Button, IconButton, Paper } from '@mui/material';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useOutletContext } from "react-router-dom";
import Select from 'react-select';
import roleApi from '../../api/roleApi';
import authApi from '../../api/authApi';
import TableAccounts from './components/TableAccount';
import DialogDelete from '../../components/DialogDelete';
import ModalEditAccount from './components/ModalEditAccount';
import donviApi from '../../api/donviApi';
import chidoanApi from '../../api/chidoanApi';
import { useSelector } from 'react-redux';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [roles, setRoles] = useState([]);
  const [donvis, setDonvis] = useState([]);
  const [chidoans, setChidoans] = useState([]);
  const navigate = useNavigate();
  const [handleChangeNotifications, handleLoading] = useOutletContext();

  const roleList = useSelector((state) => state.authReducer.roles_theodoithidua);

  // console.log(roleList.includes("thêm tài khoản"))
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
      tentaikhoan: "",
      matkhau: "",
      roles: "",
      quantrinhomdonvi: "",
      quantrinhomchidoan: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await roleApi.getRoles();
        let res1 = await donviApi.getDonvis();
        let res2 = await chidoanApi.getChidoans({ tenchidoan: "" });
        setRoles(res.data.map(i => ({ value: i._id, label: i.tennhom })));
        setDonvis(res1.data.map(i => ({ label: i.tendonvi, value: i._id })))
        setChidoans(res2.data.map(i => ({ label: i.tenchidoan, value: i._id })))
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

  //fetch account
  useEffect(() => {
    const fetchData = async () => {
      handleLoading(true);
      try {
        let res = await authApi.getUsers();
        setAccounts(res.data);
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
        handleLoading(false);
        console.log(error.message)
      }
    };

    fetchData();
  }, []);
  //handle submit add account group
  const onSubmit = async (values) => {
    let data = { ...values };
    handleLoading(true);
    try {
      let res = await authApi.addUser(data);
      setAccounts(res.data.users);
      setTimeout(() => {
        handleLoading(false);
      }, 400);

      resetField('tentaikhoan');
      resetField("matkhau");
      resetField("roles");
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 2000,
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

  //handle submit edit account
  const handleSubmitEdit = async (values) => {
    let data = { ...values };
    handleLoading(true);
    try {
      let res = await authApi.editUser(data);
      setAccounts(res.data.users);

      setTimeout(() => {
        handleLoading(false);
      }, 400);

      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 2000,
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
      };

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

  // hanle delete account 
  const handleConfirmDelete = async () => {
    handleLoading(true);
    try {
      let res = await authApi.deleteUser(openDialogDelete.id_Delete);
      setAccounts(res.data.users);

      setTimeout(() => {
        handleLoading(false);
      }, 400);

      setOpenDialogDelete({
        ...openDialogDelete,
        status: false
      });

      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 2000,
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


  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='flex items-center space-x-1'>
        <GridView color='primary' fontSize="large" />
        <h4 className='font-bold text-gray-800 text-lg'>Quản lý tài khoản hệ thống</h4>
      </div>
      {/* {roleList && roleList.includes('thêm tài khoản') && ( */}
        <form className='mt-2 mx-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex-col flex'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên tài khoản: </label>
            <input {...register("tentaikhoan", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2' placeholder='Vui lòng nhập tên tài khoản' />
          </div>
          <div className='flex-col flex'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Mật khẩu: </label>
            <input {...register("matkhau", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2' placeholder='Vui lòng nhập mật khẩu' />
          </div>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Nhóm quyền: </label>
            <Controller
              control={control}
              name="roles"
              render={({ field }) => (
                <Select
                  // defaultValue={[colourOptions[2], colourOptions[3]]}
                  required={true}
                  isMulti
                  options={roles}
                  className="basic-multi-select my-4"
                  classNamePrefix="select"
                  {...field}
                  placeholder="Vui lòng chọn nhóm quyền hệ thống"
                />
              )}
            />
          </div>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Phân quyền quản lý các đơn vị: </label>
            <Controller
              control={control}
              name="quantrinhomdonvi"
              render={({ field }) => (
                <Select
                  // defaultValue={[colourOptions[2], colourOptions[3]]}
                  required={true}
                  isMulti
                  options={donvis}
                  className="basic-multi-select my-4"
                  classNamePrefix="select"
                  {...field}
                  placeholder="Vui lòng chọn đơn vị"
                />
              )}
            />
          </div>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Phân quyền quản lý các chi đoàn: </label>
            <Controller
              control={control}
              name="quantrinhomchidoan"
              render={({ field }) => (
                <Select
                  required={true}
                  placeholder="Vui lòng chọn chi đoàn"
                  isMulti
                  options={chidoans}
                  className="basic-multi-select my-4"
                  classNamePrefix="select"
                  {...field}
                />
              )}
            />
          </div>

          <div className='md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
            <Button type='submit' sx={{ width: "220px", backgroundColor: "gray" }} color="primary" variant='contained'><AddIcon /> Thêm mới</Button>
          </div>
        </form>
      {/* )} */}

      <div className='mt-6 mx-8'>
        <TableAccounts
          list={accounts}
          onClickOpenDialogDelete={handleOpenDialogDelete}
          onClickOpenDialogEdit={handleOpenDialogEdit} />
      </div>

      <ModalEditAccount
        open={openDialogEdit.status}
        item={openDialogEdit.item}
        onCloseDialogEdit={handleCloseDialogEdit}
        onSubmit={handleSubmitEdit}
        roles={roles}
        donvis={donvis}
        chidoans={chidoans}
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

export default Accounts
