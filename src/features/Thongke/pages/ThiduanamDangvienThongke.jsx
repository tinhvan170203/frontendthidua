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
import { useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import DoughnutChart from '../reactChartComponents/DoughnutChart';
import RectangleChart from '../reactChartComponents/RectangleChart';
import TableChitietXeploaiDangvien from '../components/TableChitietXeploaiDangvien';
let headers = [
  { label: "STT", key: "stt" },
  { label: "Họ tên", key: "hoten" },
  { label: "Đơn vị đang công tác", key: "donvidangcongtac" },
  { label: "Kết quả xếp loại đảng viên", key: "xeploai" },
  { label: "Ghi chú", key: "ghichu" }
];


const ThiduanamDangvienThongke = () => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const [donviList, setDonviList] = useState([]);
  const [chidoanDisplay, setChidoanDisplay] = useState({ label: "", value: "" })
  const [display, setDisplay] = useState(false)
  const [excelExport, setExcelExport] = useState([]);
  const [year, setYear] = useState(0);
  const [yearDisplay, setYearDisplay] = useState('');
  const [optionYear, setOptionYear] = useState([]);
  const [dataBang, setDataBang] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]);
  const [search, setSearch] = useState('');

  const [dataNotValue, setDataNotValue] = useState(0);
  const [dataKHTNV, setDataKHTNV] = useState(0);
  const [dataHTNV, setDataHTNV] = useState(0);
  const [dataHTTNV, setDataHTTNV] = useState(0);
  const [dataHTXSNV, setDataHTXSNV] = useState(0);

  const [xeploaiSearch, setXeploaiSearch] = useState({ label: "Tất cả", value: "" });
  const [doiList, setDoiList] = useState([]);
  const [doiSearch, setDoiSearch] = useState({ label: "Tất cả", value: "" });
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
      donvi: { label: "Tất cả", value: "" },
    },
  });

  const vaitro = useSelector(state => state.authReducer.vaitro_theodoithidua);

  useEffect(() => {
    const fetchYear = async () => {
      try {
        let res = await canboApi.fetchYearMonth();
        let res3 = await thongkeApi.getDonviDois({ vaitro });
        setDonviList(res3.data.data_donvi);
        setValue('tunam', res.data.year - 1)
        setValue('dennam', res.data.year - 1)
        setYear(res.data.year);
        setYearDisplay(res.data.year)
        let arr = [];
        for (let i = (res.data.year); i >= 2022; i--) {
          arr.push({
            label: i, value: i
          })
        };
        setOptionYear(arr)
        setFrom(res.data.year);
        setTo(res.data.year)
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

  const handleFetchThiduanam = async () => {
    try {
      handleLoading(true);
      let res = await thongkeApi.getXeploaidangvienNam({ vaitro, nam: year, donvi: watch('donvi').value });
      setYearDisplay(year);
      setChidoanDisplay(watch('donvi'));
      setDataBang(res.data.data);
      setDataDisplay(res.data.data);
      setDoiList([{ label: "Tất cả", value: "" }].concat(res.data.list_doi_option))
      setDataKHTNV(res.data.total_khtnv);
      setDataHTNV(res.data.total_htnv);
      setDataHTTNV(res.data.total_httnv);
      setDataHTXSNV(res.data.total_htxsnv);
      setDataNotValue(res.data.total_not_value);
      setSearch('');
      setDoiSearch({ label: "Tất cả", value: "" });
      setXeploaiSearch({ label: "Tất cả", value: "" });

      setExcelExport(res.data.data.map((i, index) => ({
        stt: index + 1,
        hoten: i.hoten,
        donvidangcongtac: i.donvidangcongtac,
        xeploai: i.result,
        ghichu: i.ghichu,
      })));
      handleLoading(false);
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

  //debounced input search
  useEffect(() => {
    let data = [...dataBang];
    if (data.length > 0) {
      const timer = setTimeout(() => {
        let dataDisplay = data.filter(i => i.hoten.toLowerCase().includes(search.toLowerCase()) && i.id_donvidangcongtac.includes(doiSearch.value)
          && i.result.includes(xeploaiSearch.value));
        // console.log(dataDisplay)
        setDataDisplay(dataDisplay);
        setExcelExport(dataDisplay.map((i, index) => ({
          stt: index + 1,
          hoten: i.hoten,
          donvidangcongtac: i.donvidangcongtac,
          xeploai: i.result,
          ghichu: i.ghichu,
        })));
      }, 500);
      return () => clearTimeout(timer)
    }
  }, [search, doiSearch, xeploaiSearch]);

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Thống kê, theo dõi kết quả xếp loại đảng viên của đảng viên công tác tại đơn vị</h4>
      </div>

      <div className='my-2 mt-4 flex justify-center shadow-gray-400 shadow-md p-4 rounded-sm'>
        <div className='flex-col md:basis-1/3 flex px-1'>
          <label className='font-semibold'>Năm: </label>
          <Select
            value={{ label: year, value: year }}
            required={true}
            name="nam"
            options={optionYear}
            className="basic-multi-select my-4"
            classNamePrefix="select"
            onChange={(e) => setYear(e.value)}
          />
        </div>
        <div className='flex-col md:basis-1/3 flex px-1'>
          <label className='font-semibold'>Đơn vị công tác: </label>
          <Controller
            control={control}
            name="donvi"
            render={({ field }) => (
              <Select
                options={donviList}
                className="basic-multi-select my-3 p-1"
                classNamePrefix="select"
                placeholder="Tất cả"
                {...field}
              />
            )}
          />
        </div>
        <div className='flex-col px-1 flex items-end justify-center'>
          <Button variant='contained' onClick={() => handleFetchThiduanam()} style={{ width: "200px" }} color='primary'><BarChartIcon /> Thống kê dữ liệu</Button>
        </div>
        {/* </div> */}
      </div>

     
      <p className='text-red-600 font-medium text-center mt-8'>{`Biểu đồ kết quả xếp loại đảng viên hiện nay đang công tác`}</p>
      <div className='flex mb-8 mt-2 justify-center items-center shadow-lg shadow-slate-300 py-8'>
        <div className='md:basis-1/4'>
          <DoughnutChart
            dataHTNV={dataHTNV}
            dataHTTNV={dataHTTNV}
            dataHTXSNV={dataHTXSNV}
            dataKHTNV={dataKHTNV}
            dataNotValue={dataNotValue}
            total={dataBang.length} />
        </div>
      </div>

<div className='shadow-lg  mb-8 pb-8 shadow-slate-300 '>
      <div className='flex mt-4'>
        <RectangleChart text={"Hoàn thành xuất sắc nhiệm vụ"} number={dataHTXSNV} color={'bg-red-600'} />
        <RectangleChart text={"Hoàn thành tốt nhiệm vụ"} number={dataHTTNV} color={'bg-cyan-600'} />
        <RectangleChart text={"Hoàn thành nhiệm vụ"} number={dataHTNV} color={'bg-blue-600'} />
        <RectangleChart text={"Không hoàn thành nhiệm vụ"} number={dataKHTNV} color={'bg-pink-600'} />
        <RectangleChart text={"Chưa có dữ liệu"} number={dataNotValue} color={'bg-yellow-600'} />
      </div>
       <p className='text-blue-600 font-medium text-center mt-2'>Thống kê số lượt xếp loại đảng viên</p>
</div>

      <div className='mt-4'>
        <p className='text-center text-lg mt-8 font-semibold'>Bảng xếp loại đảng viên đang công tác năm {yearDisplay}</p>
        <h3 className='text-center mt-4 text-blue-600 text-xl font-bold'></h3>
        <h3 className='text-center mb-4 text-lg text-black'> {chidoanDisplay?.label}</h3>

        <div className='flex space-x-2 md:flex-row justify-end items-center'>
          <div className='flex-col md:basis-1/3 flex px-1'>
            <input value={search} placeholder='Tìm kiếm đảng viên' name="search" onChange={(e) => setSearch(e.target.value)} type="text" className='outline-none my-4 border rounded-md px-2 py-[6px] border-neutral-300
                              focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col md:basis-1/3 flex px-1'>
            <Select
              value={doiSearch}
              options={doiList}
              className="basic-multi-select my-3 p-1"
              classNamePrefix="select"
              placeholder="Đơn vị công tác"
              onChange={(e) => setDoiSearch(e)}
            />
          </div>
          <div className='flex-col md:basis-1/3 flex px-1'>
            <Select
              value={xeploaiSearch}
              options={[
                { label: "Tất cả", value: "" },
                { label: "Hoàn thành xuất sắc nhiệm vụ", value: "Hoàn thành xuất sắc nhiệm vụ" },
                { label: "Hoàn thành tốt nhiệm vụ", value: "Hoàn thành tốt nhiệm vụ" },
                { label: "Hoàn thành nhiệm vụ", value: "Hoàn thành nhiệm vụ" },
                { label: "Không hoàn thành nhiệm vụ", value: "Không hoàn thành nhiệm vụ" },
                { label: "Chưa có dữ liệu", value: "Chưa có dữ liệu" },
              ]}
              className="basic-multi-select my-3 p-1"
              classNamePrefix="select"
              placeholder="Kết quả xếp loại"
              onChange={(e) => setXeploaiSearch(e)}
            />
          </div>
        </div>

        <div className='pb-8'>
          <h3 className='text-end my-4'>Tổng số: <span className='text-xl font-bold text-red-600'>{dataDisplay.length}</span> đảng viên</h3>
         <div className='mt-4 text-end mb-2 md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
          <Button variant='contained' color='success' size='small'>
            <CSVLink data={excelExport} headers={headers} filename={`xeploaidangvien`}>
              <FileDownloadIcon />
              <span className='text-sm ml-1 text-white'>Xuất file excel</span>
            </CSVLink>
          </Button>
        </div>
          <TableChitietXeploaiDangvien list={dataDisplay} />
        </div>
      </div>
    </div>
  )
}

export default ThiduanamDangvienThongke