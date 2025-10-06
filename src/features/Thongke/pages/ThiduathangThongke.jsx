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
import BarChartThiduathang from '../reactChartComponents/BarChartThiduathang';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useSelector } from 'react-redux';
import RectangleChart from '../reactChartComponents/RectangleChart';

let headers = [
  { label: "STT", key: "stt" },
  { label: "Họ tên", key: "hoten" },
  { label: "Đơn vị đang công tác", key: "donvidangcongtac" },
  { label: "Số lượt cờ xanh", key: "blue" },
  { label: "Số lượt cờ vàng", key: "yellow" }
];

const ThiduathangThongke = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [chidoans, setChidoans] = useState([]);
  const [chidoanDisplay, setChidoanDisplay] = useState({ label: "", value: "" })
  const [totalCB, setTotalCB] = useState(null);
  const [totalCBNotRed, setTotalCBNotRed] = useState(null);
  const [totalBlue, setTotalBlue] = useState(null);
  const [totalYellow, setTotalYellow] = useState(null);
  const [totalNotRed, setTotalNotRed] = useState([]);
  const [excelExport, setExcelExport] = useState([]);
  const [year, setYear] = useState(0);
  const [yearDisplay, setYearDisplay] = useState('');
  const [optionYear, setOptionYear] = useState([]);
  const [dataBang, setDataBang] = useState([]);
  const [search, setSearch] = useState('');
  const [dataDisplay, setDataDisplay] = useState([]);
  const navigate = useNavigate()
  const [donviList, setDonviList] = useState([]);

  const [dataRed, setDataRed] = useState([]);
  const [dataBlue, setDataBlue] = useState([]);
  const [dataYellow, setDataYellow] = useState([]);
  const [dataNotValue, setDataNotValue] = useState([]);

  const [doiList, setDoiList] = useState([]);
  const [doiSearch, setDoiSearch] = useState({ label: "Tất cả", value: "" });
  const [handleChangeNotifications, handleLoading] = useOutletContext();
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
      tungay: "",
      denngay: "",
      hoten: ""
    },
  });

  const vaitro = useSelector(state => state.authReducer.vaitro_theodoithidua)

  useEffect(() => {
    const fetchYear = async () => {
      try {
        let res = await canboApi.fetchYearMonth();
        let res3 = await thongkeApi.getDonviDois({ vaitro })
   
        setDonviList(res3.data.data_donvi);
        setValue('tungay', res.data.year + `-01-01`)
        setValue('denngay', res.data.year + "-" + `${String("0" + res.data.month).slice(-2)}` + `-15`)
        setYear(res.data.year);
        setYearDisplay(res.data.year)
        let arr = [];
        for (let i = res.data.year; i >= 2022; i--) {
          arr.push({
            label: i, value: i
          })
        };
        setOptionYear(arr)
        setFrom(res.data.year + `-01-01`);
        setTo(res.data.year + "-" + `${String("0" + res.data.month).slice(-2)}` + `-15`)
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


  //debounced input search
  useEffect(() => {
    let data = [...dataBang];
    if (data.length > 0) {
      const timer = setTimeout(() => {
        let dataDisplay = data.filter(i => i.hoten.toLowerCase().includes(search.toLowerCase()) && i.id_donvidangcongtac.includes(doiSearch.value));
        setDataDisplay(dataDisplay)
      }, 500);
      return () => clearTimeout(timer)
    }
  }, [search, doiSearch]);

  const handleFetchBarChart = async () => {
    handleLoading(true);
    try {
      setYearDisplay(year);
      setChidoanDisplay(watch('donvi'));
      let res = await thongkeApi.getBangThiduathangsDangCongtac({ vaitro, nam: year, donvi: watch('donvi').value });

      setDataRed(res.data.data_thidua_red_month_of_year);
      setDataBlue(res.data.data_thidua_blue_month_of_year);
      setDataYellow(res.data.data_thidua_yellow_month_of_year);
      setDataNotValue(res.data.data_thidua_not_value_month_of_year);

      setTotalCB(res.data.totalCanbo);
      setTotalCBNotRed(res.data.data_not_red.length);
      setTotalBlue(res.data.total_flag_blue);
      setTotalYellow(res.data.total_flag_yellow);
      setTotalNotRed(res.data.data_not_red);

      setDoiList([{ label: "Tất cả", value: "" }].concat(res.data.list_doi_option))
      setSearch('');
      setDoiSearch({ label: "Tất cả", value: "" });
      let dataDisplay = res.data.data.filter(i => i.hoten.toLowerCase().includes(search.toLowerCase()));
      setDataBang(res.data.data);
      setDataDisplay(dataDisplay);

      setExcelExport(res.data.data_not_red.map((i, index)=>({
        stt: index + 1,
        hoten: i.hoten,
        donvidangcongtac: i.donvidangcongtac,
        blue: i.blue,
        yellow: i.yellow,
      })));

      handleLoading(false);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Thống kê, theo dõi kết quả thi đua tháng của cán bộ, chiến sĩ công tác</h4>
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
          <label className='font-semibold'>Đơn vị: </label>
          <Controller
            control={control}
            name="donvi"
            render={({ field }) => (
              <Select
                // isMulti
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
          <Button variant='contained' onClick={() => handleFetchBarChart()} style={{ width: "200px" }} color='primary'><BarChartIcon /> Thống kê dữ liệu</Button>
        </div>
      </div>

      <div className='flex mb-8 mt-12 shadow-lg shadow-slate-300 py-8'>
        <RectangleChart text={"Tổng số cán bộ, chiến sĩ"} number={totalCB} color={'bg-red-600'} />
        <RectangleChart text={"Tổng số cán bộ, chiến sĩ thi đua cờ xanh, cờ vàng"} number={totalCBNotRed} color={'bg-cyan-600'} />
        <RectangleChart text={"Tổng số lượt cờ xanh"} number={totalBlue} color={'bg-blue-600'} />
        <RectangleChart text={"Tổng số lượt cờ vàng"} number={totalYellow} color={'bg-yellow-600'} />
      </div>

      <div className='items-center flex justify-center my-2 mt-4 shadow-gray-400 shadow-md p-4 rounded-lg'>
        <BarChartThiduathang text={`Biểu đồ kết quả thi đua tháng trong năm ${yearDisplay} ${chidoanDisplay.label}`}
          dataRed={dataRed} dataBlue={dataBlue} dataYellow={dataYellow} dataNotValue={dataNotValue} />
      </div>

      <div className='px-4 mt-8'>
        <p className='text-center text-lg mt-8 font-semibold'>Bảng theo dõi kết quả thi đua tháng của cán bộ, chiến sĩ công tác năm {yearDisplay}</p>
        <h3 className='text-center text-lg text-black'> {chidoanDisplay?.label}</h3>
        <div className='flex space-x-2 md:flex-row justify-end items-center'>
          <div className='flex-col md:basis-1/3 flex px-1'>
            <input value={search} placeholder='Tìm kiếm cán bộ' name="search" onChange={(e) => setSearch(e.target.value)} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-300
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
        </div>
      </div>
      <div>
        <TableBangThiduathang list={dataDisplay} />
      </div>

      <div className='mt-4'>
        <p className='text-center text-lg my-8 font-semibold'>Danh sách cán bộ, chiến sĩ xếp loại thi đua tháng cờ xanh, cờ vàng</p>
        <div className='mt-4 text-end mb-2 md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
          <Button variant='contained' color='success' size='small'>
            <CSVLink data={excelExport} headers={headers} filename={`danhsachcoxanhcovang_${watch('tungay')}_${watch('denngay')}`}>
              <FileDownloadIcon />
              <span className='text-sm ml-1 text-white'>Xuất file excel</span>
            </CSVLink>
          </Button>
        </div>
        <TableChitietThiduathang list={totalNotRed} />
      </div>
    </div>
  )
}

export default ThiduathangThongke