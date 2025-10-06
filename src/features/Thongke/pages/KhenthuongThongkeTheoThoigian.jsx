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
import dayjs from 'dayjs';
import TableKhenthuongThongke from '../components/TableKhenthuongThongke';
import TableChitietTapthe from '../components/TableChitietTapthe';
import TableChitietCanhan from '../components/TableChitietCanhan';
import { CSVLink } from "react-csv";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
let headers = [
  { label: "STT", key: "stt" },
  { label: "Số quyết định", key: "soQD" },
  { label: "Hình thức", key: "hinhthuc" },
  { label: "Cấp khen", key: "capkhen" },
  { label: "Người ký", key: "nguoiky" },
  { label: "Tập thể, cá nhân được khen", key: "doituongkhen" },
  { label: "Ngày ký", key: "ngayky" },
  { label: "Nội dung khen", key: "noidung" }
];

let headers_tapthe = [
  { label: "STT", key: "stt" },
  { label: "Tập thể", key: "doituongkhen" },
  { label: "Số lượt được khen thưởng", key: "soluotkhen" }
];

let headers_canhan = [
  { label: "STT", key: "stt" },
  { label: "Họ và tên", key: "doituongkhen" },
  { label: "Số lượt được khen thưởng", key: "soluotkhen" }
];

const KhenthuongThongkeTheoThoigian = () => {
  const vaitro = useSelector(state => state.authReducer.vaitro_theodoithidua)

  const [khenthuongs, setKhenthuongs] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [resetCheckbox, setResetCheckbox] = useState(false)
  const [accounts_send, setAccountsSend] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const [search, setSearch] = useState('');
  let [excelExport, setExcelExport] = useState([]);
  let [excelTaptheExport, setExcelTaptheExport] = useState([]);
  let [excelCanhanExport, setExcelCanhanExport] = useState([]);
  const [khenTapthes, setKhenTapthes] = useState([]);
  const [khenCanhans, setKhenCanhans] = useState([]);
  const [khenCanhansDisplay, setKhenCanhansDisplay] = useState([]);
  const [luotkhenTapthes, setLuotKhenTapthes] = useState([]);
  const [luotkhenCanhans, setLuotKhenCanhans] = useState([]);

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
      let res = await thongkeApi.getKhenkhenthuongsTheothoigian({ donvis: accounts_send, tungay: watch('tungay'), denngay: watch('denngay') });
      // console.log(res.data)
      setKhenthuongs(res.data.data);
      setExcelExport(res.data.data.map((i, index) => ({
        stt: index + 1,
        soQD: i.soQD,
        ngayky: i.ngayky,
        noidung: i.noidung,
        nguoiky: i.nguoiky,
        hinhthuc: i.hinhthuc.hinhthuckhen,
        capkhen: i.capkhen.capkhen,
        doituongkhen: i.doituongkhen
      })));
      setExcelTaptheExport(res.data.taptheduockhen.map((i, index) => ({
        stt: index + 1,
        doituongkhen: i.doituongkhen,
        soluotkhen: i.soluotkhen,
      })));
      setExcelCanhanExport(res.data.canhanduockhen.map((i, index) => ({
        stt: index + 1,
        doituongkhen: i.doituongkhen,
        soluotkhen: i.soluotkhen,
      })));


      setFrom(watch('tungay'));
      setTo(watch('denngay'))

      setKhenTapthes(res.data.taptheduockhen);
      setKhenCanhans(res.data.canhanduockhen);
      setKhenCanhansDisplay(res.data.canhanduockhen);

      let count = 0;
      res.data.taptheduockhen.forEach(i => count += i.soluotkhen);
      setLuotKhenTapthes(count);

      let count_1 = 0;
      res.data.canhanduockhen.forEach(i => count_1 += i.soluotkhen);
      setLuotKhenCanhans(count_1)

      // setDoiList([{ label: "Tất cả", value: "" }].concat(res.data.list_doi_option))
      handleLoading(false)
    } catch (error) {
      console.log(error)
    }
  };

  // //debounced input search
  useEffect(() => {
    let data = [...khenCanhans];
    if (data.length > 0) {
      const timer = setTimeout(() => {
        let dataDisplay = data.filter(i => i.doituongkhen.toLowerCase().includes(search.toLowerCase()))
        setKhenCanhansDisplay(dataDisplay)
      }, 500);
      return () => clearTimeout(timer)
    }
  }, [search]);

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Thống kê, theo dõi kết quả khen thưởng theo khoảng thời gian</h4>
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
        <RectangleChart text={"Tổng số lượt khen thưởng"} number={khenthuongs.length} color={'bg-red-600'} />
        <RectangleChart text={"Tổng số tập thể được khen"} number={khenTapthes.length} color={'bg-cyan-600'} />
        <RectangleChart text={"Tổng số cá nhân được khen"} number={khenCanhans.length} color={'bg-blue-600'} />
        <RectangleChart text={"Tổng số lượt khen tập thể"} number={luotkhenTapthes} color={'bg-pink-600'} />
        <RectangleChart text={"Tổng số lượt khen cá nhân"} number={luotkhenCanhans} color={'bg-yellow-600'} />
      </div>

      <div className='mt-4'>
        <p className='text-center text-lg mt-8 font-semibold'>Danh sách các quyết định khen thưởng của tập thể và cá nhân</p>
        <h3 className='text-center italic mb-4'>(từ ngày {dayjs(from).format('DD/MM/YYYY')} đến ngày {dayjs(to).format('DD/MM/YYYY')})</h3>
        <div className='mt-4 text-end md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
          <Button variant='contained' color='success' size='small'>
            <CSVLink data={excelExport} headers={headers} filename={`danhsachkhenthuong_${watch('tungay')}_${watch('denngay')}`}>
              <FileDownloadIcon />
              <span className='text-sm ml-1 text-white'>Xuất file excel</span>
            </CSVLink>
          </Button>
        </div>
        <p className='mb-4 text-end'>Tổng số: <span className='text-2xl text-red-600 font-bold'>{khenthuongs.length}</span> quyết định khen thưởng</p>
        <TableKhenthuongThongke
          list={khenthuongs}
        />

        <div className='my-4'>
          <div className='my-4'>
            <p className='text-center text-lg mt-8 font-semibold'>Danh sách tập thể và số lượt khen thưởng của tập thể</p>
            <h3 className='text-center italic mb-4'>(từ ngày {dayjs(from).format('DD/MM/YYYY')} đến ngày {dayjs(to).format('DD/MM/YYYY')})</h3>
            <div className='mt-4 text-end md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
              <Button variant='contained' color='success' size='small'>
                <CSVLink data={excelTaptheExport} headers={headers_tapthe} filename={`danhsachkhenthuongtapthe_${watch('tungay')}_${watch('denngay')}`}>
                  <FileDownloadIcon />
                  <span className='text-sm ml-1 text-white'>Xuất file excel</span>
                </CSVLink>
              </Button>
            </div>
            <p className='my-2 px-4 text-end'>Tổng số: <span className='font-semibold text-2xl text-red-600'>{khenTapthes.length}</span> tập thể được khen thưởng</p>
            <TableChitietTapthe list={khenTapthes} />
          </div>
          <div className='my-4'>
            <p className='text-center text-lg mt-8 font-semibold'>Danh sách cá nhân và số lượt khen thưởng của cá nhân</p>
            <h3 className='text-center italic mb-4'>(từ ngày {dayjs(from).format('DD/MM/YYYY')} đến ngày {dayjs(to).format('DD/MM/YYYY')})</h3>
            <div className='mt-4 text-end md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
              <Button variant='contained' color='success' size='small'>
                <CSVLink data={excelCanhanExport} headers={headers_canhan} filename={`danhsachkhenthuongcanhan_${watch('tungay')}_${watch('denngay')}`}>
                  <FileDownloadIcon />
                  <span className='text-sm ml-1 text-white'>Xuất file excel</span>
                </CSVLink>
              </Button>
            </div>
            <p className='mt-2 px-4 text-end'>Tổng số: <span className='font-semibold text-2xl text-red-600'>{khenCanhans.length}</span> cá nhân được khen thưởng</p>
             <div className='px-1 text-end'>
            <input value={search} placeholder='Tìm kiếm cán bộ, chiến sĩ' name="search" onChange={(e) => setSearch(e.target.value)} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-300
                    focus:border-blue-500 focus:border-2'/>
          </div>
            <TableChitietCanhan list={khenCanhansDisplay} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default KhenthuongThongkeTheoThoigian