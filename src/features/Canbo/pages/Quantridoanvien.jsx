import React, { useMemo, useState, useEffect, lazy } from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useOutletContext } from "react-router-dom";
import Select from 'react-select';
import canboApi from '../../../api/canboApi';
import TableDangvien from '../components/TableDangvien';
import ModalEditDoanvien from '../components/ModalEditDoanvien';
import DialogChangeChucvu from '../components/DialogChangeChucvu';
import DialogDelete from '../../../components/DialogDelete';
import DialogChucvuPlus from '../components/DialogChucvuPlus';
import DialogBachamPlus from '../components/DialogBachamPlus';
import DialogChuyenCongtac from '../components/DialogChuyenCongtac';
import DialogDonviPlus from '../components/DialogDonviPlus';
import DialogTruongthanhdoan from '../components/DialogTruongthanhdoan';
import DialogChuyenCongtackhactinh from '../components/DialogChuyenngoaitinh';
import DialogChuyenCongtacTrongCoquan from '../components/DialogChuyenCongtacTrongCoquan';
import DialogChuyenCongtacMultiple from '../components/DialogChuyenCongtacMultiple';
import { useSelector } from 'react-redux';
const DialogChangeBacHam = lazy(() => import("../components/DialogChangeBacham"));

const Quantridoanvien = () => {
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
  const [display, setDisplay] = useState(false);
  const [donvis, setDonvis] = useState([]);
  const [doanviens, setDoanviens] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [checkList, setCheckList] = useState([]);
  const [handleChangeNotifications, handleLoading, handleCountListTiepnhan, handleCountListTuchoi, handleCountListDangDoiTiepnhan] = useOutletContext();



  const queryParams = useMemo(() => {
    const params = querystring.parse(location.search);
    return {
      ...params,
      hoten: params.hoten || "",
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

  const [openDialogChangeBacHam, setOpenDialogChangeBacHam] = useState({
    status: false,
    item: null,
  });

  const [openDialogChangeChucvu, setOpenDialogChangeChucvu] = useState({
    status: false,
    item: null,
  });

  const [openDialogChucvuPlus, setOpenDialogChucvuPlus] = useState({
    status: false,
    item: null,
  });

  const [openDialogBachamPlus, setOpenDialogBachamPlus] = useState({
    status: false,
    item: null,
  });

  const [openDialogChuyenCongtac, setOpenDialogChuyenCongtac] = useState({
    status: false,
    item: null,
  });
  const [openDialogChuyenCongtacMultiple, setOpenDialogChuyenCongtacMultiple] = useState({
    status: false
  });

  const [openDialogChuyenCongtacTrongCoquan, setOpenDialogChuyenCongtacTrongCoquan] = useState({
    status: false,
    item: null,
  });

  const [openDialogChuyenCongtackhactinh, setOpenDialogChuyenCongtackhactinh] = useState({
    status: false,
    item: null,
  });

  const [openDialogDonviPlus, setOpenDialogDonviPlus] = useState({
    status: false,
    item: null,
  });
  const [openDialogTruongthanhdoan, setOpenDialogTruongthanhdoan] = useState({
    status: false,
    item: null,
  });

  const handleCloseDialogChangeBacHam = () => {
    setOpenDialogChangeBacHam({
      ...openDialogChangeBacHam,
      status: false,
    });
  };

  const handleCloseDialogChangeChucvu = () => {
    setOpenDialogChangeChucvu({
      ...openDialogChangeChucvu,
      status: false,
    });
  };
  const handleCloseDialogChucvuPlus = () => {
    setOpenDialogChucvuPlus({
      ...openDialogChucvuPlus,
      status: false,
    });
  };

  const handleCloseDialogDonviPlus = () => {
    setOpenDialogDonviPlus({
      ...openDialogDonviPlus,
      status: false,
    });
  };

  const handleCloseDialogBachamPlus = () => {
    setOpenDialogBachamPlus({
      ...openDialogBachamPlus,
      status: false,
    });
  };
  const handleCloseDialogChuyenCongtac = () => {
    setOpenDialogChuyenCongtac({
      ...openDialogChuyenCongtac,
      status: false,
    });
  };
  const handleCloseDialogChuyenCongtacTrongCoquan = () => {
    setOpenDialogChuyenCongtacTrongCoquan({
      ...openDialogChuyenCongtacTrongCoquan,
      status: false,
    });
  };
  const handleCloseDialogChuyenCongtacMultiple = () => {
    setOpenDialogChuyenCongtacMultiple({
      ...openDialogChuyenCongtacMultiple,
      status: false,
    });
  };
  const handleCloseDialogChuyenCongtackhactinh = () => {
    setOpenDialogChuyenCongtackhactinh({
      ...openDialogChuyenCongtackhactinh,
      status: false,
    });
  };

  const handleCloseDialogTruongthanhdoan = () => {
    setOpenDialogTruongthanhdoan({
      ...openDialogTruongthanhdoan,
      status: false,
    });
  };

  const handleOpenDialogChangeBacHam = (item) => {
    setOpenDialogChangeBacHam({
      item,
      status: true,
    });
  };

  const handleOpenDialogChuyenCongtac = (item) => {
    setOpenDialogChuyenCongtac({
      item,
      status: true,
    });
  };
  const handleOpenDialogChuyenCongtacMultiple = () => {
    let values = [...checkList];
    values = values.filter(e => e.isChecked === true).map(i => i.value);

    if (values.length === 0) {
      alert('Vui lòng chọn cán bộ, chiến sĩ muốn chuyển công tác');
      return;
    }

    setOpenDialogChuyenCongtacMultiple({
      status: true,
    });
  };
  const handleOpenDialogChuyenCongtacTrongCoquan = (item) => {
    setOpenDialogChuyenCongtacTrongCoquan({
      item,
      status: true,
    });
  };
  const handleOpenDialogChuyenCongtackhactinh = (item) => {
    setOpenDialogChuyenCongtackhactinh({
      item,
      status: true,
    });
  };

  const handleOpenDialogChangeChucvu = (item) => {
    setOpenDialogChangeChucvu({
      item,
      status: true,
    });
  };

  const handleOpenDialogChucvuPlus = (item) => {
    setOpenDialogChucvuPlus({
      item,
      status: true,
    });
  };
  const handleOpenDialogDonviPlus = (item) => {
    setOpenDialogDonviPlus({
      item,
      status: true,
    });
  };

  const handleOpenDialogBachamPlus = (item) => {
    setOpenDialogBachamPlus({
      item,
      status: true,
    });
  };

  const handleOpenDialogTruongthanhdoan = (item) => {
    setOpenDialogTruongthanhdoan({
      item,
      status: true,
    });
  };

  const {
    register,
    handleSubmit,
    control,
    resetField,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      donvi: { value: "", label: "Tất cả" }
    },
  });

  // handle submit search
  const handleFormSearchSubmit = (e) => {
    e.preventDefault()
    setSearchParams({ ...queryParams, hoten: watch('hoten'), donvi: watch('donvi').value, sohieuCAND: watch('sohieuCAND') });
  };

  //fetch data initial for add person
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await canboApi.getDataForAddPerson();
        let options = [{ label: "Tất cả", value: "" }].concat(res.data.dois.map(i => ({ value: i._id, label: i.tendoi })))
        setDonvis(options)
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
    setValue('donvi', queryParams.donvi === "" ? { value: "", label: "Tất cả" } : donvis.find(i => i.value === queryParams.donvi))
  }, [donvis]);


  //fetch doan vien quan ly
  useEffect(() => {
    setValue('donvi', queryParams.donvi === "" ? { value: "", label: "Tất cả" } : donvis.find(i => i.value === queryParams.donvi))
    const fetchData = async () => {
      try {
        handleLoading(true);
        let res = await canboApi.fetchDangvienList(queryParams);
        setDoanviens(res.data);

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


  //handle submit edit
  const handleSubmitEdit = async (values) => {
    let data = { ...values, queryParams };
    handleLoading(true);
    try {
      let res = await canboApi.editPerson(data);

      let arr = [...doanviens];

      let index = doanviens.findIndex(i => i._id.toString() === values.id_edit);
      arr[index].hoten = values.hoten;
      arr[index].ngaysinh = values.ngaysinh;
      if (!values.dangvien.value) {
        arr[index].ngayvaodang = ""
      } else {
        arr[index].ngayvaodang = values.ngayvaodang;
      }
      arr[index].gioitinh = values.gioitinh.value;
      arr[index].dangvien = values.dangvien.value;

      setDoanviens(arr)

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

  // handle delete doan vien (xoa mem)
  const handleConfirmDelete = async () => {
    handleLoading(true);
    try {
      let res = await canboApi.deletePerson(openDialogDelete.id_Delete, { ...queryParams });

      let arr = [...doanviens];

      let newItems = arr.filter(i => i._id.toString() !== openDialogDelete.id_Delete);
      setDoanviens(newItems);

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

  const handleSubmitChangeBacHam = async (values) => {
    handleLoading(true);
    try {
      await canboApi.changeBacham(values);
      let res = await canboApi.fetchDangvienList(queryParams);
      setDoanviens(res.data);

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
      handleLoading(false)
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

  const handleSubmitChangeChucvu = async (values) => {
    try {
      handleLoading(true)
      let res = await canboApi.changeChucvu(values);
      let res1 = await canboApi.fetchDangvienList(queryParams);
      setDoanviens(res1.data);
      // console.log(res1)
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
      handleLoading(false)
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

  const handleSubmitChuyenCongtac = async (values) => {
    try {
      handleLoading(true)
      let res1 = await canboApi.chuyenCongtac(values);
      let res = await canboApi.fetchDangvienList(queryParams);
      handleCountListDangDoiTiepnhan();
      setDoanviens(res.data);
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
      handleLoading(false)
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


  const handleSubmitChuyenCongtacTrongCoquan = async (values) => {
    try {
      handleLoading(true)
      let res1 = await canboApi.chuyentrongCoquan(values);
      let res = await canboApi.fetchDangvienList(queryParams);

      setDoanviens(res.data);
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
      handleLoading(false)
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

  const handleSubmitChuyenCongtacMultiple = async (values) => {
    try {
      let arr = [...checkList];
      arr = arr.filter(e => e.isChecked === true).map(i => i.value);
      let data = { ...values, list: arr }
      handleLoading(true)
      let res1 = await canboApi.chuyenCongtacMultiple(data);
      let res = await canboApi.fetchDangvienList(queryParams);
      handleCountListDangDoiTiepnhan();
      setDoanviens(res.data);
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
      handleLoading(false)
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

  const handleSubmitChuyenCongtackhactinh = async (values) => {
    try {
      handleLoading(true)
      let res1 = await canboApi.postChuyenkhactinh(values);
      let res = await canboApi.fetchDangvienList(queryParams);
      setDoanviens(res.data);
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
      handleLoading(false)
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

  // handle fetch lại đoàn viên khi thay đổi các chức năng nâng cao
  const handleSubmitAdvancedPlus = async () => {
    try {
      let res = await canboApi.fetchDangvienList(queryParams);
      setDoanviens(res.data);
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleSubmitTruongthanhdoan = async (values) => {
    handleLoading(true);
    let data = { ...values, id: openDialogTruongthanhdoan.item._id }
    // console.log(data)
    try {
      let res = await canboApi.upTruongthanhdoan(data);

      let arr = [...doanviens];

      let newItems = arr.filter(i => i._id.toString() !== openDialogTruongthanhdoan.item._id);
      setDoanviens(newItems);

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

  const handleChangeCheckList = (data) => {
    console.log(data)
    setCheckList(data)
  };

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản lý cán bộ, chiến sĩ</h4>
      </div>

      {/* form tìm kiếm  */}
      {/* {display && ( */}
      <form onSubmit={(e) => handleFormSearchSubmit(e)} className='my-2 mt-4 p-4 rounded-lg shadow-md shadow-gray-500'>
        <div className='flex mb-4'>
          <SearchIcon />
          <h3 className='font-semibold'>Tìm kiếm cán bộ, chiến sĩ</h3>
        </div>
        <div className='flex flex-wrap xl:flex-row flex-col flex-1 py-2 rounded-md'>
          <div className='flex-col flex md:basis-1/2 flex-1 px-1'>
            <label className='underline font-semibold'>Họ và tên: </label>
            <input {...register("hoten", { required: true })} type="text" className='outline-none my-4 border rounded-md px-2 py-[6px] border-neutral-300
                   focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col flex flex-1 md:basis-1/2 px-1'>
            <label className='underline font-semibold'>Đội nghiệp vụ, tổ công tác:</label>
            <Controller
              control={control}
              name="donvi"
              render={({ field }) => (
                <Select
                  options={donvis}
                  className="basic-multi-select my-4 rounded-md"
                  classNamePrefix="select"
                  placeholder="Tất cả"
                  required
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className='my-2 text-center'>
          <Button type='submit' color="primary" variant='contained'><SearchIcon /> Tìm kiếm</Button>
        </div>
      </form>
      {/* )} */}

      <div className='mt-6 mx-0 shadow-md shadow-gray-500 rounded-md'>
        <div className='text-end my-4 mr-4'>
          <Button onClick={() => handleOpenDialogChuyenCongtacMultiple()} variant='contained'>Chuyển công tác đơn vị khác trong CA tỉnh</Button>
        </div>

        <TableDangvien
          list={doanviens}
          onChangeCheckList={handleChangeCheckList}
          onClickOpenDialogDelete={handleOpenDialogDelete}
          onClickOpenDialogEdit={handleOpenDialogEdit}
          onClickOpenDialogChangeBacHam={handleOpenDialogChangeBacHam}
          onClickOpenDialogChangeChucvu={handleOpenDialogChangeChucvu}
          onClickOpenDialogChucvuPlus={handleOpenDialogChucvuPlus}
          onClickOpenDialogBachamPlus={handleOpenDialogBachamPlus}
          onClickOpenDialogDonviPlus={handleOpenDialogDonviPlus}
          onClickOpenDialogChuyenCongtac={handleOpenDialogChuyenCongtac}
          onClickOpenDialogChuyenCongtacTrongCoquan={handleOpenDialogChuyenCongtacTrongCoquan}
          onClickOpenDialogChuyenCongtackhactinh={handleOpenDialogChuyenCongtackhactinh}
          onClickOpenDialogTruongthanhdoan={handleOpenDialogTruongthanhdoan}
        />
      </div>

      <ModalEditDoanvien
        open={openDialogEdit.status}
        item={openDialogEdit.item}
        onCloseDialogEdit={handleCloseDialogEdit}
        onSubmit={handleSubmitEdit}
        donvis={donvis}
      />

      <DialogChangeBacHam
        open={openDialogChangeBacHam.status}
        item={openDialogChangeBacHam.item}
        onSubmit={handleSubmitChangeBacHam}
        onCloseDialogChangeBacHam={handleCloseDialogChangeBacHam}
      />

      <DialogChangeChucvu
        open={openDialogChangeChucvu.status}
        item={openDialogChangeChucvu.item}
        onSubmit={handleSubmitChangeChucvu}
        onCloseDialogChangeChucvu={handleCloseDialogChangeChucvu}
      />

      <DialogDelete
        open={openDialogDelete.status}
        onCloseDialogDelete={handleCloseDialogDelete}
        onConfirmDelete={handleConfirmDelete}
        onCancelDelete={handleCancelDelete}
      />

      <DialogChucvuPlus
        open={openDialogChucvuPlus.status}
        item={openDialogChucvuPlus.item}
        onCloseDialogChucvuPlus={handleCloseDialogChucvuPlus}
        onSubmit={handleSubmitAdvancedPlus}
      />

      <DialogTruongthanhdoan
        open={openDialogTruongthanhdoan.status}
        item={openDialogTruongthanhdoan.item}
        onCloseDialogTruongthanhdoan={handleCloseDialogTruongthanhdoan}
        onSubmit={handleSubmitTruongthanhdoan}
      />

      <DialogBachamPlus
        open={openDialogBachamPlus.status}
        item={openDialogBachamPlus.item}
        onCloseDialogBachamPlus={handleCloseDialogBachamPlus}
        onSubmit={handleSubmitAdvancedPlus}
      />

      <DialogChuyenCongtac
        open={openDialogChuyenCongtac.status}
        item={openDialogChuyenCongtac.item}
        onCloseDialogChuyenCongtac={handleCloseDialogChuyenCongtac}
        onSubmit={handleSubmitChuyenCongtac}
      />

      <DialogChuyenCongtacTrongCoquan
        open={openDialogChuyenCongtacTrongCoquan.status}
        item={openDialogChuyenCongtacTrongCoquan.item}
        donviList={donvis}
        onCloseDialogChuyenCongtac={handleCloseDialogChuyenCongtacTrongCoquan}
        onSubmit={handleSubmitChuyenCongtacTrongCoquan}
      />

      <DialogChuyenCongtacMultiple
        open={openDialogChuyenCongtacMultiple.status}
        donviList={donvis}
        onCloseDialogChuyenCongtac={handleCloseDialogChuyenCongtacMultiple}
        onSubmit={handleSubmitChuyenCongtacMultiple}
      />

      <DialogChuyenCongtackhactinh
        open={openDialogChuyenCongtackhactinh.status}
        item={openDialogChuyenCongtackhactinh.item}
        onCloseDialogChuyenCongtackhactinh={handleCloseDialogChuyenCongtackhactinh}
        onSubmit={handleSubmitChuyenCongtackhactinh}
      />

      {/* <DialogDonviPlus
        open={openDialogDonviPlus.status}
        item={openDialogDonviPlus.item}
        onCloseDialogDonviPlus={handleCloseDialogDonviPlus}
        onSubmit={handleSubmitAdvancedPlus}
      /> */}
    </div>
  )
}

export default Quantridoanvien
