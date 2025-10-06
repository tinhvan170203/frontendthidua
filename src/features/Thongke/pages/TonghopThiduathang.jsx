import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";
import { Button, IconButton, Paper } from '@mui/material';
import canboApi from '../../../api/canboApi';
import thongkeApi from '../../../api/thongkeApi';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import authApi from '../../../api/authApi';
import SettingSendUser from '../components/SettingSendUser';
import RectangleChart from '../reactChartComponents/RectangleChart';
import TableChitietThiduathangTonghop from '../components/TableChitietThiduathangTonghop';
import dayjs from 'dayjs';
import { CSVLink } from "react-csv";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

let headers = [
  { label: "STT", key: "stt" },
  { label: "Họ tên", key: "hoten" },
  { label: "Đơn vị đang công tác", key: "donvidangcongtac" },
  { label: "Số lượt cờ xanh", key: "blue" },
  { label: "Số lượt cờ vàng", key: "yellow" }
];

const TonghopThiduathang = () => {
  const vaitro = useSelector(state => state.authReducer.vaitro_theodoithidua)
  const [donviList, setDonviList] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [resetCheckbox, setResetCheckbox] = useState(false)
  const [accounts_send, setAccountsSend] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const [totalCB, setTotalCB] = useState(null);
  const [totalCBNotRed, setTotalCBNotRed] = useState(null);
  const [totalBlue, setTotalBlue] = useState(null);
  const [totalYellow, setTotalYellow] = useState(null);
  const [totalNotRed, setTotalNotRed] = useState([]);
  const [excelExport, setExcelExport] = useState([]);
  const [doiList, setDoiList] = useState([]);
  const [doiSearch, setDoiSearch] = useState({ label: "Tất cả", value: "" });
  const [dataBase, setDataBase] = useState([]);
  const [search, setSearch] = useState('');
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

  useEffect(() => {
    const fetchYear = async () => {
      try {
        let res = await canboApi.fetchYearMonth();
        let res1 = await authApi.getUserOfKhoi({ vaitro });

        setAccounts(res1.data)
        setValue('tungay', res.data.year + `-01-01`)
        setValue('denngay', res.data.year + "-" + `${String("0" + res.data.month).slice(-2)}` + `-15`)
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

  const handleChangeGroupAccount = async (values) => {
    let data = [...values]; // values là array chứa các accounts cần gửi báo cáo
    setAccountsSend(data.map(i => i.value))
    setResetCheckbox(false)
  };

  const handleFetchData = async () => {
    if (accounts_send.length === 0) {
      alert('Vui lòng chọn đơn vị cần thống kê kết quả');
      return
    };

    handleLoading(true)
    try {
      let res = await thongkeApi.getThiduathangs({ tungay: (watch('tungay')), denngay: (watch('denngay')), donvis: accounts_send });
      setFrom(watch('tungay'))
      setTo(watch('denngay'))
      setTotalCB(res.data.totalCanbo);
      setTotalCBNotRed(res.data.data_not_red.length);
      setTotalBlue(res.data.total_flag_blue);
      setTotalYellow(res.data.total_flag_yellow);
      setTotalNotRed(res.data.data_not_red);
      setExcelExport(res.data.data_not_red.map((i, index)=>({
        stt: index + 1,
        hoten: i.hoten,
        donvidangcongtac: i.donvidangcongtac,
        blue: i.blue,
        yellow: i.yellow,
      })));

      // console.log(res.data.data_not_red)
      setDataBase(res.data.data_not_red);
      setDoiSearch({ label: "Tất cả", value: "" })
      setDoiList([{ label: "Tất cả", value: "" }].concat(res.data.list_doi_option))
      handleLoading(false)
    } catch (error) {
      console.log(error)
    }
  };

  //debounced input search
  useEffect(() => {
    let data = [...dataBase];
    if (data.length > 0) {
      const timer = setTimeout(() => {
        let dataDisplay = data.filter(i => i.hoten.toLowerCase().includes(search.toLowerCase()) && i.id_donvidangcongtac.includes(doiSearch.value));
        setTotalNotRed(dataDisplay)
      }, 500);
      return () => clearTimeout(timer)
    }
  }, [search, doiSearch]);

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Thống kê, theo dõi kết quả thi đua tháng của cán bộ, chiến sĩ theo khoảng thời gian</h4>
      </div>

      <div className='shadow-gray-400  shadow-md p-4 rounded-sm'>
        <div className='my-2 mt-4 flex justify-center flex-wrap'>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1 w-full'>
            <label className='underline font-semibold'>Từ ngày: </label>
            <input {...register("tungay")} type="date" className='outline-none my-4 border rounded-md px-2 py-1 border-neutral-300
                  focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1 w-full'>
            <label className='underline font-semibold'>Đến ngày: </label>
            <input {...register("denngay")} type="date" className='outline-none my-4 border rounded-md px-2 py-1 border-neutral-300
                  focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col px-1 flex items-end justify-center'>
            <Button variant='contained' onClick={() => handleFetchData()} style={{ width: "200px" }} color='primary'><BarChartIcon /> Thống kê dữ liệu</Button>
          </div>
        </div>
        <div className='flex-col md:basis-1/3 flex px-1'>
          <label className='font-semibold'>Đơn vị: </label>
          <SettingSendUser
            onSubmit={handleChangeGroupAccount}
            list={accounts}
            resetCheckbox={resetCheckbox}
          />
        </div>
      </div>

      <div className='flex mb-8 mt-12 shadow-lg shadow-slate-300 py-8'>
        <RectangleChart text={"Tổng số cán bộ, chiến sĩ"} number={totalCB} color={'bg-red-600'} />
        <RectangleChart text={"Tổng số cán bộ, chiến sĩ thi đua cờ xanh, cờ vàng"} number={totalCBNotRed} color={'bg-cyan-600'} />
        <RectangleChart text={"Tổng số lượt cờ xanh"} number={totalBlue} color={'bg-blue-600'} />
        <RectangleChart text={"Tổng số lượt cờ vàng"} number={totalYellow} color={'bg-yellow-600'} />
      </div>

      <div className='mt-4'>
        <p className='text-center text-lg mt-8 font-semibold'>Danh sách cán bộ, chiến sĩ xếp loại thi đua tháng cờ xanh, cờ vàng</p>
        <h3 className='text-center italic'>(từ ngày {dayjs(from).format('DD/MM/YYYY')} đến ngày {dayjs(to).format('DD/MM/YYYY')})</h3>
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
              placeholder="Đơn vị công tác tính đến ngày xếp loại cờ xanh, vàng"
              onChange={(e) => setDoiSearch(e)}
            />
          </div>
        </div>

         <div className='mt-4 text-end mb-2 md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
                  <Button variant='contained' color='success' size='small'>
                    <CSVLink data={excelExport} headers={headers} filename={`danhsachcoxanhcovang_${watch('tungay')}_${watch('denngay')}`}>
                      <FileDownloadIcon />
                      <span className='text-sm ml-1 text-white'>Xuất file excel</span>
                    </CSVLink>
                  </Button>
                </div>
        <TableChitietThiduathangTonghop list={totalNotRed} denngay={to} />
      </div>
    </div>
  )
};

export default TonghopThiduathang