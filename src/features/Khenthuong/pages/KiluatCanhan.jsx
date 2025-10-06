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
import kiluatApi from '../../../api/kiluatApi';
import { toast } from 'react-toastify';
import Select from 'react-select';
import DialogDelete from '../../../components/DialogDelete';
import DialogEditKhentapthe from '../components/DialogEditKhentapthe';
import { CSVLink } from "react-csv";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import canboApi from '../../../api/canboApi';
import TableDoanvien from '../components/TableDoanvien';
import TableKiluatcanhan from '../components/TableKiluatcanhan';
import DialogAddKiluatcanhan from '../components/DialogAddKiluatcanhan';
import DialogEditKiluatcanhan from '../components/DialogEditKiluatcanhan';
import { useSelector } from 'react-redux';
import TableDoanvienKiluat from '../components/TableDoanvienKiluat';

let headers = [
  { label: "STT", key: "stt" },
  { label: "Số quyết định", key: "soQD" },
  { label: "Hình thức", key: "hinhthuc" },
  { label: "Người ký", key: "nguoiky" },
  { label: "Ngày ký", key: "ngayky" },
  { label: "Nội dung khen", key: "noidung" }
];

const KiluatCanhan = () => {
  const [khenthuongs, setKhenthuongs] = useState([]);
  const [display, setDisplay] = useState(false);
  const [canbo, setCanbo] = useState(null)
  let [excelExport, setExcelExport] = useState([]);
  const [searchCanbo, setSearchCanbo] = useState({
    hoten: "",
    donvi: ""
  });
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  let [searchParams, setSearchParams] = useSearchParams();
  const [donvis, setDonvis] = useState([]);
  const [doanviens, setDoanviens] = useState([]);


  const [openDialogAdd, setOpenDialogAdd] = useState({
    status: false
  });

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

  const navigate = useNavigate();
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
  //state mở hộp thoại delete
  const [openDialogDelete, setOpenDialogDelete] = useState({
    status: false,
    id_Delete: null,
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
  const handleOpenDialogDelete = (id) => {
    setOpenDialogDelete({
      status: true,
      id_Delete: id,
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
      hinhthuc: { label: "Tất cả", value: "" },
    },
  });

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
  // handle submit search
  const handleFormSearchSubmit = async (values) => {
    let data = {
      ...values,
      hinhthuc: values.hinhthuc.value,
    };
    try {
      handleLoading(true);
      let res = await kiluatApi.searchKiluatcanhans(canbo._id, data);
      setKhenthuongs(res.data)
      setExcelExport(res.data.map((i, index) => ({
        stt: index + 1,
        soQD: i.soQD,
        ngayky: i.ngayky,
        noidung: i.noidung,
        nguoiky: i.nguoiky,
        hinhthuc: i.hinhthuc,
      })));
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
    const fetchData = async () => {
      try {
        handleLoading(true);
        let res = await kiluatApi.getKiluatcanhans(canbo._id);

        setKhenthuongs(res.data)
        setExcelExport(res.data.map((i, index) => ({
          stt: index + 1,
          soQD: i.soQD,
          ngayky: i.ngayky,
          noidung: i.noidung,
          nguoiky: i.nguoiky,
          hinhthuc: i.hinhthuc,
        })));
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

    if (canbo) {
      fetchData();
    }
  }, [canbo]);

  const handleFormSearchCanboSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ ...queryParams, hoten: searchCanbo.hoten, donvi: searchCanbo.donvi });
  };

  const handleChoiceCanbo = (canbo) => {
    setCanbo(canbo)
  };

  const handleSubmitAdd = async (values) => {
    let data = { ...values, id: canbo._id }
    handleLoading(true);
    try {
      let res1 = await kiluatApi.addKiluatcanhan(data);
      let res = await kiluatApi.getKiluatcanhans(canbo._id);
      setKhenthuongs(res.data)
      setExcelExport(res.data.map((i, index) => ({
        stt: index + 1,
        soQD: i.soQD,
        ngayky: i.ngayky,
        noidung: i.noidung,
        hinhthuc: i.hinhthuc,
        nguoiky: i.nguoiky,
      })));
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
      let res = await kiluatApi.deleteKiluatcanhan(openDialogDelete.id_Delete);

      let arr = [...khenthuongs];

      let newItems = arr.filter(i => i._id.toString() !== openDialogDelete.id_Delete);
      setKhenthuongs(newItems);
      setExcelExport(newItems.map((i, index) => ({
        stt: index + 1,
        soQD: i.soQD,
        ngayky: i.ngayky,
        nguoiky: i.nguoiky,
        noidung: i.noidung,
        hinhthuc: i.hinhthuc
      })))
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
    handleLoading(true);
    try {
      let res = await kiluatApi.editKiluatcanhan(values);

    let res1 = await kiluatApi.getKiluatcanhans(canbo._id);
      setKhenthuongs(res1.data)
      setExcelExport(arr.map((i, index) => ({
        stt: index + 1,
        soQD: i.soQD,
        ngayky: i.ngayky,
        noidung: i.noidung,
        hinhthuc: i.hinhthuc,
        nguoiky: i.nguoiky
      })));
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
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản lý kết quả kỉ luật đối với cá nhân trong đơn vị</h4>
      </div>
      <form onSubmit={(e) => handleFormSearchCanboSubmit(e)} className='my-2 mt-4 p-4 rounded-lg shadow-md shadow-gray-500'>
        <div className='flex mb-4'>
          <SearchIcon />
          <h3 className='font-semibold'>Tìm kiếm cán bộ, chiến sĩ</h3>
        </div>
        <div className='flex flex-wrap xl:flex-row flex-col flex-1 py-2 rounded-md'>
          <div className='flex-col flex md:basis-1/3 flex-1 px-1'>
            <label className='underline font-semibold'>Họ và tên: </label>
            <input onChange={(e) => setSearchCanbo({ ...searchCanbo, hoten: e.target.value })} type="text" className='outline-none my-4 border rounded-md px-2 py-[6px] border-neutral-300
                  focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col flex flex-1 md:basis-1/3 px-1'>
            <label className='underline font-semibold'>Đơn vị công tác:</label>
            <Select
              options={donvis}
              className="basic-multi-select my-4"
              classNamePrefix="select"
              placeholder="Tất cả"
              onChange={(e) => setSearchCanbo({ ...searchCanbo, donvi: e.value })}
            />
          </div>
        </div>
        <div className='my-2 text-center'>
          <Button type='submit' color="info" variant='contained'><SearchIcon /> Tìm kiếm dữ liệu</Button>
        </div>
      </form>

      <div className='mt-6 mx-0 shadow-md shadow-gray-500 rounded-md'>
        <TableDoanvienKiluat
          list={doanviens}
          onHandleChoiceCanbo={handleChoiceCanbo}
        />
      </div>

      {canbo && (
        <div>

        </div>
      )}
      {/* form tìm kiếm  */}
      <div className='shadow-md shadow-gray-500 rounded-md pb-4'>
        {canbo && (
          <>
            <div className='mt-8 text-end md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
              <Button type='submit' onClick={() => handleOpenDialogAdd()} color="primary" variant='contained'><AddIcon /> Thêm mới kỉ luật</Button>

              <Button onClick={() => setDisplay(true)} color="info" variant='contained'><SearchIcon /> Chức năng tìm kiếm</Button>

              <Button variant='contained' color='success'>
                <CSVLink data={excelExport} headers={headers} filename={`danhsachkiluat_${canbo?.hoten}_${watch('tungay')}_${watch('denngay')}`}>
                  <FileDownloadIcon style={{ color: "fff", fontSize: "16px" }} />
                  <span className='ml-1 text-sm text-white'>Xuất file excel</span>
                </CSVLink>
              </Button>
            </div>

            {display && (
            <form onSubmit={handleSubmit(handleFormSearchSubmit)} className='my-2 mt-4 shadow-gray-400 shadow-md p-4 rounded-lg' data-aos="zoom-in-down" data-aos-once="true">
          <div className='flex justify-between'>
            <h5 className='text-[18px] font-semibold'>Tìm kiếm kỉ luật cá nhân</h5>

          </div>
          <div className='flex flex-wrap xl:flex-row flex-col flex-1 p-2'>
            <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
              <label className='underline font-semibold'>Số QĐ kỉ luật: </label>
              <input {...register("soQD")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:border-blue-500 focus:border-2'/>
            </div>
            <div className='flex-col md:basis-1/6 flex flex-1 px-1'>
              <label className='underline font-semibold'>Từ ngày: </label>
              <input {...register("tungay")} type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
            </div>
            <div className='flex-col md:basis-1/6 flex flex-1 px-1'>
              <label className='underline font-semibold'>Đến ngày: </label>
              <input {...register("denngay")} type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
            </div>
            <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
              <label className='underline font-semibold'>Người ký: </label>
              <input {...register("nguoiky")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
            </div>
            <div className='flex-col md:basis-full flex flex-1 px-1'>
              <label className='underline font-semibold'>Nội dung và ghi chú: </label>
              <input {...register("noidung")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
            </div>
            <div className='flex-col md:basis-1/2 flex flex-1 px-1'>
              <label className='underline font-semibold'>Hình thức kỉ luật: </label>
              <Controller
                control={control}
                name="hinhthuc"
                render={({ field }) => (
                  <Select
                    options={[
                      {label: "Tất cả", value: ""},
                     { label: "Khiển trách", value: "Khiển trách" },
                    { label: "Cảnh cáo", value: "Cảnh cáo" },
                    { label: "Hạ cấp bậc hàm", value: "Hạ cấp bậc hàm" },
                    { label: "Tước quân tịch CAND", value: "Tước quân tịch CAND" },
                    ]}
                    className="basic-multi-select my-4 p-1"
                    classNamePrefix="select"
                    placeholder="Vui lòng chọn hình thức kỉ luật"
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
          </>
        )}


        {canbo && (
          <div className='mt-6'>
            <h3 className='text-center text-blue-600 my-8 text-xl'>Danh sách kỉ luật cá nhân của đồng chí {canbo?.bachamPopulate[0].bacham} {canbo?.hoten}</h3>
                  <div className='mb-4 pl-4'>
                <span className='font-semibold'>Tổng số: <span className='text-2xl text-red-600 font-semibold'>{khenthuongs.length}</span> lượt bị kỉ luật đối với cá nhân</span>
              </div>
            <TableKiluatcanhan
              list={khenthuongs}
              onClickOpenDialogDelete={handleOpenDialogDelete}
              onClickOpenDialogEdit={handleOpenDialogEdit} />
          </div>
        )}
      </div>

      <DialogAddKiluatcanhan
        open={openDialogAdd.status}
        onSubmit={handleSubmitAdd}
        onCloseDialogAdd={handleCloseDialogAdd}
      />

      <DialogEditKiluatcanhan
        open={openDialogEdit.status}
        item={openDialogEdit.item}
        onSubmit={handleSubmitEdit}
        onCloseDialogEdit={handleCloseDialogEdit}
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

export default KiluatCanhan