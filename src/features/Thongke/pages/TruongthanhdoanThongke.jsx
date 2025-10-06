import React, { useMemo, useState, useEffect } from 'react'
import GridView from '@mui/icons-material/GridView'
import chidoanApi from '../../../api/chidoanApi';
import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import { useOutletContext, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Select from 'react-select';
import { CSVLink } from "react-csv";
import canboApi from '../../../api/canboApi';
import dayjs from 'dayjs';
import thongkeApi from '../../../api/thongkeApi';
import TableChitietThiduathang from '../components/TableChitietThiduathang';
import TableBangThiduathang from '../components/TableBangthiduathang';
import TableBangTruongthanhdoan from '../components/TableTruongthanhdoan';


let headers = [
  { label: "STT", key: "stt" },
  { label: "Họ tên", key: "hoten" },
  { label: "Ngày trưởng thành đoàn", key: "ngaytruongthanhdoan" },
  { label: "Đơn vị", key: "donvi" }
];

const TruongthanhdoanThongke = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const [chidoans, setChidoans] = useState([]);
  const [chidoanDisplay, setChidoanDisplay] = useState({label: "", value: ""})
  const [display, setDisplay] = useState(false)
  const [excelExport, setExcelExport] = useState([]);
  const [dataBang, setDataBang] = useState([]);
  const navigate = useNavigate();

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
      chidoans: { label: "Tất cả", value: "" },
      tungay: "",
      denngay: "",
      hoten: ""
    },
  });

  useEffect(() => {
    const fetchYear = async () => {
      try {
        let res = await canboApi.fetchYearMonth();
        let res1 = await chidoanApi.getChidoanOfUser();
        setChidoans([{ label: "Tất cả", value: "" }].concat(res1.data.map(i => ({ value: i._id, label: i.tenchidoan }))))
        setValue('tungay', res.data.year + `-01-01`)
        setValue('denngay', res.data.year + "-" + res.data.month + `-15`)

        setFrom(res.data.year + `-01-01`);
        setTo(res.data.year + "-" + res.data.month + `-15`)
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
    fetchYear()
  }, []);

 

  const handleFetchTruongthanhdoan = async (values) => {
    let params = { ...values, chidoans: values.chidoans.value }
    try {
      handleLoading(true);
      let res = await thongkeApi.getTruongthanhdoans(params);
      setDataBang(res.data)
      setChidoanDisplay(values.chidoans);
      setExcelExport(res.data.map((i, index) => ({
        stt: index + 1,
        hoten: i.hoten,
        ngaytruongthanhdoan: dayjs(i.ngaytruongthanhdoan).format('DD/MM/YYYY'),
        donvi: i.donvi.donvi.tendonvi
      })));
      handleLoading(false)
      setDisplay(true);
    } catch (error) {
      console.log(error.message)
    }
  };

  const changeStatusTruongthanhdoan = async (id) => {
    handleLoading(true)
    try {
       await thongkeApi.changeStatusTruongthanhdoan(id);

       let data = [...dataBang];
       data = data.filter(i=> i._id.toString() !== id);
       setDataBang(data);
       setExcelExport(data.map((i, index) => ({
        stt: index + 1,
        hoten: i.hoten,
        ngaytruongthanhdoan: dayjs(i.ngaytruongthanhdoan).format('DD/MM/YYYY'),
        donvi: i.donvi.donvi.tendonvi
      })));
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
      console.log(error.message)
    }
  }




  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='flex items-center space-x-1'>
        <GridView color='primary' fontSize="large" />
        <h4 className='font-bold text-gray-800 text-lg'>Theo dõi, thống kê đoàn viên trưởng thành đoàn từ ngày {dayjs(from).format('DD/MM/YYYY')} đến ngày {dayjs(to).format('DD/MM/YYYY')} - chi đoàn, liên chi đoàn: {chidoanDisplay?.label}</h4>
      </div>

      <form onSubmit={handleSubmit(handleFetchTruongthanhdoan)}>
        <div className='flex mt-4 px-4 space-x-2 md:flex-row justify-end items-start'>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
            <label className='underline font-semibold'>Họ tên: </label>
            <input {...register("hoten")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
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
            <label className='underline font-semibold'>Chi đoàn, liên chi đoàn: </label>
            <Controller
              control={control}
              name="chidoans"
              render={({ field }) => (
                <Select
                  options={chidoans}
                  className="basic-multi-select my-4 p-1"
                  classNamePrefix="select"
                  placeholder="Tất cả"
                  {...field}
                />
              )}
            />

          </div>
          <div className='flex-col flex md:basis-1/6'>
            <Button size='small'
              type="submit" sx={{ width: "220px", backgroundColor: "gray" }} color="primary" variant='contained'><AddIcon /> Lấy dữ liệu</Button>
          </div>
        </div>
      </form>

      {display && (
        <div className='px-4' data-aos="fade-left" data-aos-once="true">
          <Button color="info" variant='contained' size='small'>
            <CSVLink data={excelExport} headers={headers} filename={`danhsachtruongthanhdoan_${watch('tungay')}_${watch('denngay')}`}>
              <div className='flex items-center'>
                <FileDownloadIcon />
                <span className='text-sm'>Xuất file excel</span>
              </div>
            </CSVLink>
          </Button>

          <div className='mt-4'>
            <TableBangTruongthanhdoan list={dataBang} onChangeStatus = {changeStatusTruongthanhdoan}/>
          </div>
        </div>)}

    </div>
  )
}

export default TruongthanhdoanThongke