import React, { useMemo, useState, useEffect } from 'react'
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useOutletContext } from "react-router-dom";
import DialogDelete from '../../components/DialogDelete';
import doiApi from '../../api/doiApi';
import TableConganxa from './components/TableConganxa';
import EditModal from './components/EditModal';
import { useSelector } from 'react-redux';

const Conganxas = () => {
      let vaitro = useSelector((state) => state.authReducer.vaitro_theodoithidua);
    const navigate = useNavigate();
      if (vaitro !== "Quản trị thông thường") {
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
  let [searchParams, setSearchParams] = useSearchParams();

  const [dois, setDois] = useState([]);
  const [handleChangeNotifications, handleLoading] = useOutletContext();

  const [tendoi, setTendoi] = useState('');
  const [donviSearch, setDonviSearchs] = useState('');

  const queryParams = useMemo(() => {
    const params = querystring.parse(location.search);
    return {
      ...params,
      tendoi: params.tendoi || "",
      donvi: params.donvi || "",
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
    setSearchParams({ ...queryParams, tendoi, donvi: donviSearch });
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
      tendoi: "",
      donvi: "",
      thutu: 1,
      status: true
    },
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        handleLoading(true);
        let res = await doiApi.getDois(queryParams);
        setDois(res.data)
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
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    };

    fetchData();
  }, [queryParams]);

  //handle submit add doi
  const onSubmit = async (values) => {
    let data = { ...values, donvi: id_user, queryParams };
    handleLoading(true);
    try {
      let res = await doiApi.addDoi(data);
      setDois(res.data.dois)
      handleLoading(false);
      resetField('tendoi');
      // resetField("thutu");
      setValue('thutu', Number(data.thutu) + 1)
      resetField("status");
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
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
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleLoading(false);
    }
  };

  //handle submit edit notification
  const handleSubmitEdit = async (values) => {
    let data = { ...values, donvi: id_user, queryParams };
    handleLoading(true);
    try {
      let res = await doiApi.editDoi(data);
      setDois(res.data.dois)
      handleLoading(false);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
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
        pauseOnHover: false,
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
      let res = await doiApi.deleteDoi(openDialogDelete.id_Delete, { ...queryParams });

      setDois(res.data.dois)
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
        pauseOnHover: false,
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
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleLoading(false);
    }
  };

  const id_user = useSelector((state) => state.authReducer.id_user);

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản lý đội nghiệp vụ, tổ công an cấp xã</h4>
      </div>

      <form className='mt-2 px-6 py-4 shadow-gray-400 shadow-md' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex-col flex'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên đội nghiệp vụ, tổ công an cấp xã: </label>
          <input {...register("tendoi", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
        </div>
        <div className='flex space-x-2'>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Thứ tự: </label>
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

      <div className='mt-6 shadow-black shadow-sm px-2'>
        <p className='text-center text-lg my-8 font-semibold mb-8'>Bảng danh sách đội nghiệp vụ, tổ công tác thuộc đơn vị</p>
        <TableConganxa
          list={dois}
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

export default Conganxas
