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
import DoughnutChart from '../reactChartComponents/DoughnutChart';
import TableChitietThiduanamTonghop from '../components/TableChitietThiduanamTonghop';
import { CSVLink } from "react-csv";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
let headers = [
  { label: "STT", key: "stt" },
  { label: "Họ tên", key: "hoten" },
  { label: "Đơn vị đang công tác", key: "donvidangcongtac" },
  { label: "Kết quả xếp loại thi đua năm", key: "xeploai" },
];
const TonghopXeploaiDangvien = () => {
  const vaitro = useSelector(state => state.authReducer.vaitro_theodoithidua)
  const [donviList, setDonviList] = useState([]);

  const [excelExport, setExcelExport] = useState([]);
  const [tunam, setTunam] = useState({ label: 2025, value: 2025 });
  const [dennam, setDennam] = useState({ label: 2025, value: 2025 });
  const [quanity, setQuanity] = useState('')
  const [resetCheckbox, setResetCheckbox] = useState(false);
  const [accounts_send, setAccountsSend] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const [year, setYear] = useState(0);
  const [yearDisplay, setYearDisplay] = useState('');
  const [optionYear, setOptionYear] = useState([]);
  const [doiList, setDoiList] = useState([]);
  const [doiSearch, setDoiSearch] = useState({ label: "", value: "" });
  const [dataBase, setDataBase] = useState([]);
  const [search, setSearch] = useState('');
  const [dataBang, setDataBang] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]);
  const [dataNotValue, setDataNotValue] = useState(0);
  const [dataKHTNV, setDataKHTNV] = useState(0);
  const [dataHTNV, setDataHTNV] = useState(0);
  const [dataHTTNV, setDataHTTNV] = useState(0);
  const [dataHTXSNV, setDataHTXSNV] = useState(0);

  const [xeploaiSearch, setXeploaiSearch] = useState({ label: "Chưa chọn xếp loại tính theo số lượt tối tiểu", value: "" });
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
      nam: "",
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
        setTunam({ label: res.data.year - 1, value: res.data.year - 1 });
        setDennam({ label: res.data.year, value: res.data.year });

        setYear(res.data.year);
        setYearDisplay(res.data.year)
        let arr = [];
        for (let i = (res.data.year); i >= 2022; i--) {
          arr.push({
            label: i, value: i
          })
        };
        setOptionYear(arr)
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
      let res = await thongkeApi.getXeploaidangvienCacNam({ tunam, dennam, donvis: accounts_send });

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
      setXeploaiSearch({ label: "Chưa chọn xếp loại tính theo số lượt tối tiểu", value: "" })
    setExcelExport(res.data.data.map((i, index) => ({
        stt: index + 1,
        hoten: i.hoten,
        donvidangcongtac: i.donvidangcongtac,
        xeploai: i.result.map(e=> `${e.nam}: ${e.result}`),
        ghichu: i.ghichu,
      })));
      handleLoading(false)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (dennam.value < tunam.value) {
      alert('Giá trị đến năm phải lớn hơn hoặc bằng giá trị từ năm');
      setDennam({ label: tunam.label, value: tunam.value })
    }
  }, [dennam, tunam])

  //debounced input search
  useEffect(() => {
    let data = [...dataBang];
    if (data.length > 0) {
      const timer = setTimeout(() => {
        let dataDisplay = data.filter(i => i.hoten.toLowerCase().includes(search.toLowerCase()) && i.id_donvidangcongtac.includes(doiSearch.value));
        setDataDisplay(dataDisplay);
              setExcelExport(dataDisplay.map((i, index) => ({
          stt: index + 1,
          hoten: i.hoten,
          donvidangcongtac: i.donvidangcongtac,
          xeploai: i.result.map(e=> `${e.nam}: ${e.result}`),
        })));
      }, 500);
      return () => clearTimeout(timer)
    }
  }, [search, doiSearch]);


  useEffect(() => {
    let data = [...dataBang];
    if (quanity < 0) {
      alert('Vui lòng chọn giá trị số lượt tối thiểu lớn hơn 0');
      setQuanity('')
      return;
    };

    if (xeploaiSearch.value === "") {
      return;
    };

    if (data.length > 0) {
      const timer = setTimeout(() => {
        let dataDisplay = data.filter(i => i[xeploaiSearch.value] >= quanity);
        setDataDisplay(dataDisplay);
              setExcelExport(dataDisplay.map((i, index) => ({
          stt: index + 1,
          hoten: i.hoten,
          donvidangcongtac: i.donvidangcongtac,
          xeploai: i.result.map(e=> `${e.nam}: ${e.result}`),
        })));
      }, 400);

      return () => clearTimeout(timer);
    };

  }, [quanity, xeploaiSearch])

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Thống kê, theo dõi kết quả xếp loại đảng viên của đảng viên trong khoảng thời gian năm</h4>
      </div>

      <div className='shadow-gray-400  shadow-md p-4 rounded-sm'>
        <div className='my-2 mt-4 flex justify-center flex-wrap'>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1 w-full'>
            <label className='underline font-semibold'>Từ năm: </label>
            <Select
              options={optionYear}
              className="basic-multi-select my-3 p-1"
              classNamePrefix="select"
              placeholder=""
              onChange={(e) => setTunam(e)}
              value={tunam}
            />
          </div>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1 w-full'>
            <label className='underline font-semibold'>Đến năm: </label>
            <Select
              options={optionYear}
              className="basic-multi-select my-3 p-1"
              classNamePrefix="select"
              placeholder=""
              onChange={(e) => setDennam(e)}
              value={dennam}
            />
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

      <p className='text-red-600 font-medium text-center mt-8'>{`Biểu đồ kết quả xếp loại đảng viên từ năm ${tunam.value} đến năm ${dennam.value}`}</p>
      <div className='flex mb-8 mt-2 justify-center items-center shadow-lg shadow-slate-300 py-8'>
        <div className='md:basis-1/4'>
          <DoughnutChart text={`Biểu đồ kết quả đảng viên của đảng viên từ năm ${tunam.value} đến năm ${dennam.value}`}
            dataHTNV={dataHTNV} dataHTTNV={dataHTTNV} dataHTXSNV={dataHTXSNV} dataKHTNV={dataKHTNV} dataNotValue={dataNotValue}
            total={dataHTNV + dataHTTNV + dataHTXSNV + dataKHTNV + dataNotValue} />
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
        <p className='text-center text-lg mt-8 font-semibold'>Danh sách xếp loại đảng viên của đảng viên</p>
        <h3 className='text-center italic'>(từ năm {tunam.value} đến năm {dennam.value})</h3>

        <h3 className='text-end my-4'>Tổng số: <span className='text-xl font-bold text-red-600'>{dataDisplay.length}</span> đảng viên</h3>
        <div className='flex space-x-2 md:flex-row justify-end items-center'>
          <div className='flex-col md:basis-1/3 flex px-1'>
            <input value={search} placeholder='Tìm kiếm cán bộ' name="search" onChange={(e) => setSearch(e.target.value)} type="text" className='outline-none my-4 border rounded-md px-2 py-[6px] border-neutral-300
                    focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col md:basis-1/3 flex px-1'>
            <Select
              value={doiSearch}
              options={doiList}
              className="basic-multi-select my-3 p-1"
              classNamePrefix="select"
              placeholder="Đơn vị công tác tính đến năm đã chọn"
              onChange={(e) => setDoiSearch(e)}
            />
          </div>
          <div className='flex-col md:basis-1/3 flex px-1'>
            <input value={quanity} placeholder='Số lượt tối thiểu đạt xếp loại' min={0} name="luot" onChange={(e) => setQuanity(e.target.value)} type="number" className='outline-none my-4 border rounded-md px-2 py-[6px] border-neutral-300
                    focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col md:basis-1/3 flex px-1'>
            <Select
              value={xeploaiSearch}
              options={[
                // { value: "", label: "Chưa chọn xếp loại tính theo số lượt tối tiểu" },
                { value: "total_htxsnv_canhan", label: "Hoàn thành xuất sắc nhiệm vụ" },
                { value: "total_httnv_canhan", label: "Hoàn thành tốt nhiệm vụ" },
                { value: "total_htnv_canhan", label: "Hoàn thành nhiệm vụ" },
                { value: "total_khtnv_canhan", label: "Không hoàn thành nhiệm vụ" },
                { value: "total_not_value_canhan", label: "Chưa có dữ liệu" },
              ]}
              className="basic-multi-select my-3 p-1"
              classNamePrefix="select"
              placeholder="Xếp loại tính theo số lượt tối tiểu"
              onChange={(e) => setXeploaiSearch(e)}
            />
          </div>
        </div>

        <h3 className='text-center italic my-2'>Có ít nhất {quanity} lần xếp loại <span className='italic text-red-600'>"{xeploaiSearch.label}"</span></h3>
      
       <div className='mt-4 text-end mb-2 md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
                <Button variant='contained' color='success' size='small'>
                  <CSVLink data={excelExport} headers={headers} filename={`xeploaithiduacacnam`}>
                    <FileDownloadIcon />
                    <span className='text-sm ml-1 text-white'>Xuất file excel</span>
                  </CSVLink>
                </Button>
              </div>
          <TableChitietThiduanamTonghop list={dataDisplay} dennam={dennam.value} />
      </div>
    </div>
  )
};

export default TonghopXeploaiDangvien