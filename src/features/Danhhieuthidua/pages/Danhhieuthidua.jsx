import React, { useMemo, useState, useEffect } from 'react'
import GridView from '@mui/icons-material/GridView'
import chidoanApi from '../../../api/chidoanApi';
import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useOutletContext, useSearchParams, useNavigate } from "react-router-dom";
import querystring from "query-string";
import DialogAddKhentapthe from '../components/DialogAddKhentapthe';
import khenthuongApi from '../../../api/khenthuongApi';
import { toast } from 'react-toastify';
import Select from 'react-select';
import TableKhentapthe from '../components/TableKhentapthe';
import DialogDelete from '../../../components/DialogDelete';
import DialogEditKhentapthe from '../components/DialogEditKhentapthe';
import { CSVLink } from "react-csv";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useSelector } from 'react-redux';
import capkhenthuongApi from '../../../api/capkhenthuong';
import hinhthuckhenApi from '../../../api/hinhthuckhen';
import doiApi from '../../../api/doiApi';


const Danhhieuthidua = () => {
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
  const [khenthuongs, setKhenthuongs] = useState([]);
  const [chidoans, setChidoans] = useState([]);
  const [display, setDisplay] = useState(false);
  const [chidoansOption, setChidoansOption] = useState([])
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  let [searchParams, setSearchParams] = useSearchParams();
  const [openDialogAdd, setOpenDialogAdd] = useState({
    status: false
  });
  const [capkhenList, setCapkhenList] = useState([]);
  const [capkhenSearchList, setCapkhenSearchList] = useState([]);
  const [hinhthucList, setHinhthucList] = useState([]);
  const [hinhthucSearchList, setHinhthucSearchList] = useState([]);



  const handleOpenDialogAdd = (item) => {
    setOpenDialogAdd({
      status: true,
    });
  };

  const handleCloseDialogAdd = () => {
    setOpenDialogAdd({
      ...openDialogAdd,
      status: false,
    });
  };


  const [openDialogEdit, setOpenDialogEdit] = useState({
    status: false,
    item: null,
  });
  //state mở hộp thoại delete
  const [openDialogDelete, setOpenDialogDelete] = useState({
    status: false,
    id_Delete: null,
    capkhenBefore: null
  });


  const handleOpenDialogEdit = (item) => {
    setOpenDialogEdit({
      item,
      status: true,
    });
  };
  const handleCloseDialogEdit = () => {
    setOpenDialogEdit({
      ...openDialogEdit,
      status: false,
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


  //open dialog delete
  const handleOpenDialogDelete = (id,capkhenBefore) => {
    setOpenDialogDelete({
      status: true,
      id_Delete: id,
      capkhenBefore
    });
  };
  // get danh sách chi đoàn thuộc quyền quản lý của tài khoản
  let authReducer = useSelector((state) => state.authReducer);
// console.log(authReducer)

  useEffect(() => {
    const getData = async () => {
      try {

        let res = await doiApi.getDois({ tendoi: "", donvi: "" });
        setChidoans([{ label: authReducer.user, value: authReducer.id_user }].concat(res.data.map(i => ({
          label: i.tendoi,
          value: i._id
        }))));
        setChidoansOption([{ label: "Tất cả", value: "" }].concat(
          [{ label: authReducer.user, value: authReducer.id_user }].concat(res.data.map(i => ({
            label: i.tendoi,
            value: i._id
          })))
        ))
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

    getData();
  }, []);

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
      taptheduockhenthuong: { label: "Tất cả", value: "" }
    },
  });
  // handle submit search
  const handleFormSearchSubmit = (values) => {
    setSearchParams({
      ...queryParams, ...values,
      taptheduockhenthuong: values.taptheduockhenthuong.value,
    });
  };


  const queryParams = useMemo(() => {
    const params = querystring.parse(location.search);
    return {
      ...params,
      nam: params.nam || "",
      noidung: params.noidung || "",
      taptheduockhenthuong: params.taptheduockhenthuong || ""
    };
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        handleLoading(true);
        let res = await khenthuongApi.getDanhhieuthiduas(queryParams);
        setKhenthuongs(res.data)
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
        console.log(error.message)
      }
    };

    fetchData();
  }, [queryParams]);

  const handleSubmitAdd = async (data) => {
    try {
      handleLoading(true);
      let res1 = await khenthuongApi.addDanhhieuthidua(data);
      let res = await khenthuongApi.getDanhhieuthiduas(queryParams);
      setKhenthuongs(res.data)

      handleLoading(false);
      toast.success(res1.data.message, {
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


  const handleConfirmDelete = async () => {
    handleLoading(true);
    try {
      let res = await khenthuongApi.deleteDanhhieuthidua(openDialogDelete.id_Delete,{capkhenBefore: openDialogDelete.capkhenBefore});

      let arr = [...khenthuongs];

      let newItems = arr.filter(i => i._id.toString() !== openDialogDelete.id_Delete);
      setKhenthuongs(newItems);
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

  const handleSubmitEdit = async (values) => {

    try {
      handleLoading(true);
      let res = await khenthuongApi.editDanhhieuthidua(values);

      let res1 = await khenthuongApi.getDanhhieuthiduas(queryParams);
      setKhenthuongs(res1.data)

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

  const roles = useSelector((state) => state.authReducer.roles_theodoithidua);
  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản lý danh hiệu thi đua đối với tập thể đơn vị</h4>
      </div>

      <div className='mt-4 text-end md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>

        <Button type='submit' onClick={() => handleOpenDialogAdd()} color="primary" variant='contained'><AddIcon /> Thêm mới danh hiệu thi đua</Button>

        <Button onClick={() => setDisplay(true)} color="info" variant='contained'><SearchIcon /> Chức năng tìm kiếm </Button>

      </div>


      {/* form tìm kiếm  */}
      {display && (
        <form onSubmit={handleSubmit(handleFormSearchSubmit)} className='my-2 mt-4 shadow-gray-400 shadow-md p-4 rounded-lg' data-aos="zoom-in-down" data-aos-once="true">
          <div className='flex justify-between'>
            <h5 className='text-[18px] font-semibold'>Tìm kiếm danh hiệu thi đua</h5>

          </div>
          <div className='flex flex-wrap xl:flex-row flex-col flex-1 p-2'>
            <div className='flex-col md:basis-full flex flex-1 px-1'>
              <label className='underline font-semibold'>Nội dung danh hiệu và ghi chú: </label>
              <input {...register("noidung")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
            </div>
            <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
              <label className='underline font-semibold'>Tập thể đạt danh hiệu: </label>
              <Controller
                control={control}
                name="taptheduockhenthuong"
                render={({ field }) => (
                  <Select
                    // isMulti={true}
                    options={chidoansOption}
                    className="basic-multi-select my-4 p-1"
                    classNamePrefix="select"
                    placeholder="Tất cả"
                    {...field}
                  />
                )}
              />

            </div>
          </div>
          <div className='my-2 text-center'>
            <Button type='submit' color="primary" variant='contained'><SearchIcon /> Tìm kiếm dữ liệu</Button>
          </div>
        </form>
      )}

      <div className='mt-6 py-4 px-2 shadow-black shadow-sm'>
 <p className='text-center text-lg mt-8 font-semibold'>Danh sách kết quả danh hiệu thi đua đối với tập thể đơn vị</p>
        <div>
          <span className='font-semibold'>Tổng số: <span className='text-2xl text-red-600 font-semibold'>{khenthuongs.length}</span> lượt đạt danh hiệu thi đua đối với tập thể</span>
        </div>
        <div className='mt-8'>
          <TableKhentapthe
            list={khenthuongs}
            onClickOpenDialogDelete={handleOpenDialogDelete}
            onClickOpenDialogEdit={handleOpenDialogEdit}
          />
        </div>
      </div>

      <DialogAddKhentapthe
        open={openDialogAdd.status}
        onSubmit={handleSubmitAdd}
        onCloseDialogAdd={handleCloseDialogAdd}
        chidoans={chidoans}
        capkhen={capkhenList}
        hinhthuc={hinhthucList}
      />

      <DialogEditKhentapthe
        open={openDialogEdit.status}
        item={openDialogEdit.item}
        onSubmit={handleSubmitEdit}
        onCloseDialogEdit={handleCloseDialogEdit}
        chidoans={chidoans}
           capkhen={capkhenList}
        hinhthuc={hinhthucList}
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

export default Danhhieuthidua
