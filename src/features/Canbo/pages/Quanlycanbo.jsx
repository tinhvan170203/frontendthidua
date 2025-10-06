import React, { useMemo, useState, useEffect } from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate, Navigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
// import EditModal from './components/EditModal';
import { useOutletContext } from "react-router-dom";
import Select from 'react-select';
import canboApi from '../../../api/canboApi';
import { useSelector } from 'react-redux';

const Quanlycanbos = () => {
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
  const [donvis, setDonvis] = useState([]);
  const [dois, setDois] = useState([]);
  const [display, setDisplay] = useState(false);
  const [bachams, setBachams] = useState([]);
  const [chucvus, setChucvus] = useState([]);
  const [handleChangeNotifications, handleLoading] = useOutletContext();

  const [tenchidoan, setTenchidoan] = useState('');
  const [gioitinh, setGioitinh] = useState('Nam');
  const [dangvien, setDangvien] = useState(true);

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
      hoten: "",
      gioitinh: { value: 'Nam', label: "Nam" },
      dangvien: { label: "Có", value: true },
    },
  });

  //fetch data initial for add person
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await canboApi.getDataForAddPerson();
        setDois(res.data.dois.map(i => ({ value: i._id, label: i.tendoi })))
        setChucvus(res.data.chucvus.map(i => ({ value: i._id, label: i.chucvu })))
        setBachams(res.data.bachams.map(i => ({ value: i._id, label: i.bacham })))
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


  //   //handle submit add doi
  const onSubmit = async (values) => {
    let data = { ...values };
    handleLoading(true);
    try {
      let res = await canboApi.addPerson(data);
      // setChidoans(res.data.chidoans)
      setTimeout(() => {
        handleLoading(false);
      }, 400)
      resetField('hoten');
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

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Thêm mới cán bộ, chiến sĩ thuộc đơn vị</h4>
      </div>

      <h3 className="my-2 italic text-red-700 ml-2 mb-4">
        Lưu ý: Tạo mới cán bộ, chiến sĩ chỉ được thực hiện đối với cán bộ đến nhận công tác
        tại Công an tỉnh lần đầu tiên, cần kiểm tra kỹ lại xem trong hệ thống có
        dữ liệu của cán bộ đó chưa để tránh việc trùng lặp dữ liệu.
      </h3>
      <form className='mt-2 mx-2' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex space-x-2 items-start'>

          <img src={gioitinh === "Nam" ? "/namcongan.png" : "/anhnucongan.png"} alt="avatar" className='w-auto h-full shadow-md shadow-gray-500' />

          <div className='shadow-md shadow-gray-500 p-2 rounded-md'>
            <div className='flex flex-wrap xl:flex-row flex-col flex-1'>
              <div className='flex-col flex md:basis-1/3 flex-1 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Họ và tên: </label>
                <input {...register("hoten", { required: true })} type="text" className='outline-none my-4 rouned-md border rounded-md p-2 border-neutral-300
                  focus:border-blue-500 focus:border-2'/>
              </div>
              <div className='flex-col flex flex-1 md:basis-1/6 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Giới tính:</label>
                <Select
                  {...register("gioitinh")}
                  name="gioitinh"
                  options={[
                    { value: "Nam", label: "Nam" },
                    { value: "Nữ", label: "Nữ" }
                  ]}
                  className="basic-multi-select my-4 rouned-md"
                  classNamePrefix="select"
                  defaultValue={{ value: 'Nam', label: "Nam" }}
                  onChange={(e) => {
                    setGioitinh(e.value)
                    setValue('gioitinh', e)
                  }}
                />
              </div>
              <div className='flex-col flex md:basis-1/6 flex-1 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày sinh: </label>
                <input {...register("ngaysinh")} placeholder="dd-mm-yyyy" type="date" className='outline-none my-4 rouned-md border rounded-md p-2 border-neutral-300
                  focus:border-blue-500 focus:border-2' required />
              </div>
              <div className='flex-col flex flex-1 md:basis-1/6 px-1'>
                <label className='underline font-semibold'>Đảng viên:</label>
                <Select
                  required
                  {...register('dangvien')}
                  options={[
                    { value: true, label: "Có" },
                    { value: false, label: "Không" }
                  ]}
                  className="basic-multi-select my-4 rouned-md"
                  classNamePrefix="select"
                  defaultValue={{ value: true, label: "Có" }}
                  onChange={(e) => {
                    setDangvien(e.value)
                    setValue('dangvien', e)
                  }}
                />
              </div>
              <div className='flex-col flex flex-1 md:basis-1/4 px-1'>
                <label className='underline font-semibold'>Cấp bậc hàm:</label>
                <Controller
                  control={control}
                  name="bacham"
                  render={({ field }) => (
                    <Select
                      options={bachams}
                      className="basic-multi-select my-4 rouned-md"
                      classNamePrefix="select"
                      placeholder="Vui lòng chọn cấp hàm"
                      required
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='flex-col flex flex-1 md:basis-1/4 px-1'>
                <label className='underline font-semibold'>Chức vụ công tác:</label>
                <Controller
                  control={control}
                  name="chucvu"
                  render={({ field }) => (
                    <Select
                      required
                      options={chucvus}
                      className="basic-multi-select my-4 rouned-md"
                      classNamePrefix="select"
                      placeholder="Vui lòng chọn chức vụ"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='flex-col flex md:basis-1/4 flex-1 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày lên quân hàm hiện tại: </label>
                <input {...register("ngaylenham")} placeholder="dd-mm-yyyy" type="date" className='outline-none my-4 rouned-md border rounded-md p-2 border-neutral-300
                  focus:border-blue-500 focus:border-2' required />
              </div>
              <div className='flex-col flex md:basis-1/4 flex-1 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày giữ chức vụ hiện tại: </label>
                <input {...register("ngaygiuchucvu")} placeholder="dd-mm-yyyy" type="date" className='outline-none my-4 rouned-md border rounded-md p-2 border-neutral-300
                  focus:border-blue-500 focus:border-2' required />
              </div>
              {/* <div className='flex-col flex md:basis-1/4 flex-1 px-1'>
              <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày nhận QĐ về đơn vị: </label>
              <input {...register("ngayvedonvi")} placeholder="dd-mm-yyyy" type="date" className='outline-none my-4 rouned-md border rounded-md p-2 border-neutral-300
                  focus:border-blue-500 focus:border-2' required/>
            </div> */}
              <div className='flex-col flex md:basis-1/4 flex-1 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày nhận QĐ về đội, tổ: </label>
                <input {...register("ngayvedonvi")} placeholder="dd-mm-yyyy" type="date" className='outline-none my-4 rouned-md border rounded-md p-2 border-neutral-300
                  focus:border-blue-500 focus:border-2' required />
              </div>
              <div className='flex-col flex flex-1 md:basis-1/4 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Đội nghiệp vụ (tổ công tác):</label>
                <Controller
                  control={control}
                  name="donvi"
                  render={({ field }) => (
                    <Select
                      options={dois}
                      className="basic-multi-select my-4 rouned-md"
                      classNamePrefix="select"
                      placeholder="Vui lòng chọn đội, tổ công tác"
                      required
                      {...field}
                    />
                  )}
                />
              </div>


              {dangvien === true ?
                (<div className='flex-col flex md:basis-1/4 flex-1 px-1'>
                  <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày kết nạp vào đảng: </label>
                  <input {...register("ngayvaodang")} placeholder="dd-mm-yyyy" type="date" className='outline-none my-4 rouned-md border rounded-md p-2 border-neutral-300
                  focus:border-blue-500 focus:border-2'/>
                </div>) : ""}

              <div className='items-center space-x-2 flex md:basis-1/4 flex-1 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span>Đoàn viên: </label>
                <input {...register("doanvien")} type="checkbox" className='outline-none my-4 rouned-md border rounded-md p-2 border-neutral-300 w-6 h-6
                  focus:border-blue-500 focus:border-2' />
              </div>
            </div>
            <div className='md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center mt-4'>
              <Button type='submit' color="primary" variant='contained'><AddIcon /> Thêm mới</Button>
            </div>
          </div>
        </div>
      </form >
    </div >
  )
}

export default Quanlycanbos
