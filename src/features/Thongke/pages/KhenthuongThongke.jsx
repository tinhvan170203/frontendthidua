import React, { useMemo, useState, useEffect } from 'react'

import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton, Paper } from '@mui/material';

import { useForm, Controller } from "react-hook-form"

import { useOutletContext, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Select from 'react-select';
import { CSVLink } from "react-csv";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import thongkeApi from '../../../api/thongkeApi';
import TableKhenthuongThongke from '../components/TableKhenthuongThongke';
import TableChitietTapthe from '../components/TableChitietTapthe';
import TableChitietCanhan from '../components/TableChitietCanhan';
import capkhenthuongApi from '../../../api/capkhenthuong';
import hinhthuckhenApi from '../../../api/hinhthuckhen';
import { useSelector } from 'react-redux';
import RectangleChart from '../reactChartComponents/RectangleChart';

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

const KhenthuongThongke = () => {
  const vaitro = useSelector(state => state.authReducer.vaitro_theodoithidua);

  const [khenthuongs, setKhenthuongs] = useState([]);
  let [excelExport, setExcelExport] = useState([]);
  let [excelTaptheExport, setExcelTaptheExport] = useState([]);
  let [excelCanhanExport, setExcelCanhanExport] = useState([]);
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const [khenTapthes, setKhenTapthes] = useState([]);
  const [khenCanhans, setKhenCanhans] = useState([]);
  const [luotkhenTapthes, setLuotKhenTapthes] = useState([]);
  const [luotkhenCanhans, setLuotKhenCanhans] = useState([]);
  const navigate = useNavigate()
  const [capkhenList, setCapkhenList] = useState([]);
  const [capkhenSearchList, setCapkhenSearchList] = useState([]);
  const [hinhthucList, setHinhthucList] = useState([]);
  const [hinhthucSearchList, setHinhthucSearchList] = useState([]);
  const [donviList, setDonviList] = useState([]);
  const [doiList, setDoiList] = useState([]);
  const [doiChangeList, setDoiChangeList] = useState([]);

  // get danh sách chi đoàn thuộc quyền quản lý của tài khoản
  useEffect(() => {
    const getData = async () => {
      try {
        let res1 = await capkhenthuongApi.getCapkhenthuongs();
        let res2 = await hinhthuckhenApi.getHinhthuckhens();
        let res3 = await thongkeApi.getDonviDois({ vaitro })
        // console.log(res3)
        if (vaitro === "Quản trị thông thường") {
          setDonviList(res3.data.data_donvi.slice(0, 1));
          setValue('donvi', res3.data.data_donvi.slice(0, 1)[0]);
        } else {
          setDonviList(res3.data.data_donvi);
        }
        setDoiList(res3.data.data_doi);

        setDoiChangeList(res3.data.data_donvi.concat(res3.data.data_doi.slice(1)));

        setCapkhenList(res1.data.map(i => ({ value: i._id, label: i.capkhen })))
        setCapkhenSearchList([{ label: "Tất cả", value: "" }].concat(res1.data.map(i => ({ value: i._id, label: i.capkhen }))))

        setHinhthucList(res2.data.map(i => ({ value: i._id, label: i.hinhthuckhen })))
        setHinhthucSearchList([{ label: "Tất cả", value: "" }].concat(res2.data.map(i => ({ value: i._id, label: i.hinhthuckhen }))))
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
      hinhthuc: { label: "Tất cả", value: "" },
      capkhen: { label: "Tất cả", value: "" },
      tungay: "",
      denngay: "",
      donvi: { label: "Tất cả", value: "" },
      soQD: "",
      noidung: "",
      nguoiky: "",
      theloai: { label: "Tất cả", value: "" }
    },
  });
  // handle submit search
  const handleFormSearchSubmit = async (values) => {
    let params = {
      ...values, hinhthuc: values.hinhthuc.value,
      capkhen: values.capkhen.value, theloai: values.theloai.value,
      donvi: values.donvi,
      doi: values.doi,
    };

    handleLoading(true);
    let res = await thongkeApi.getKhenkhenthuongs(params);
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

    setKhenTapthes(res.data.taptheduockhen);
    setKhenCanhans(res.data.canhanduockhen);

    let count = 0;
    res.data.taptheduockhen.forEach(i => count += i.soluotkhen);
    setLuotKhenTapthes(count);

    let count_1 = 0;
    res.data.canhanduockhen.forEach(i => count_1 += i.soluotkhen);
    setLuotKhenCanhans(count_1)

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
  };

  useEffect(() => {
    let checked = watch('donvi').value;

    let arr = [...doiList];
    let arr_donvi = [...donviList];

    if (checked === "") {
      setDoiChangeList(arr_donvi.concat(arr.slice(1)));
      setValue('doi', { label: "Tất cả", value: "" })
    } else {
      let newList = arr.filter(i => i.donvi === checked);
      let newArr = [{ label: "Tất cả", value: "" }].concat([watch('donvi')]).concat(newList);
      setDoiChangeList(newArr);
      setValue('doi', { label: "Tất cả", value: "" })
    }
  }, [watch('donvi')])


  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Thống kê, theo dõi kết quả khen thưởng đối với tập thể và cá nhân đang công tác tại đơn vị</h4>
      </div>

      <form onSubmit={handleSubmit(handleFormSearchSubmit)} className='my-2 mt-4 shadow-gray-400 shadow-md p-4 rounded-lg' data-aos="zoom-in-down" data-aos-once="true">
        <div className='flex justify-between'>
          <h5 className='text-[18px] font-semibold'>Tra cứu khen thưởng</h5>
        </div>
        <div className='flex flex-wrap xl:flex-row flex-col flex-1 p-2'>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
            <label className='underline font-semibold'>Số QĐ khen thưởng: </label>
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
            <label className='underline font-semibold'>Nội dung khen thưởng: </label>
            <input {...register("noidung")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
            <label className='underline font-semibold'>Hình thức khen thưởng: </label>
            <Controller
              control={control}
              name="hinhthuc"
              render={({ field }) => (
                <Select
                  options={hinhthucSearchList}
                  className="basic-multi-select my-4 p-1"
                  classNamePrefix="select"
                  placeholder="Vui lòng chọn hình thức khen thưởng"
                  {...field}
                />
              )}
            />
          </div>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
            <label className='underline font-semibold'>Cấp khen thưởng: </label>
            <Controller
              control={control}
              name="capkhen"
              render={({ field }) => (
                <Select
                  options={capkhenSearchList}
                  className="basic-multi-select my-4 p-1"
                  classNamePrefix="select"
                  placeholder="Vui lòng chọn cấp khen thưởng"
                  {...field}
                />
              )}
            />
          </div>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
            <label className='underline font-semibold'>Loại khen thưởng: </label>
            <Controller
              control={control}
              name="theloai"
              render={({ field }) => (
                <Select
                  options={[
                    { label: "Tất cả", value: "" },
                    { label: "Tập thể", value: "Tập thể" },
                    { label: "Cá nhân", value: "Cá nhân" }
                  ]}
                  className="basic-multi-select my-4 p-1"
                  classNamePrefix="select"
                  placeholder="Vui lòng chọn loại khen thưởng"
                  {...field}
                />
              )}
            />
          </div>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
            <label className='underline font-semibold'>Đơn vị: </label>
            <Controller
              control={control}
              name="donvi"
              render={({ field }) => (
                <Select
                  isDisabled={donviList.length === 1}
                  options={donviList}
                  className="basic-multi-select my-4 p-1"
                  classNamePrefix="select"
                  placeholder="Tất cả"
                  {...field}
                />
              )}
            />
          </div>
          <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
            <label className='underline font-semibold'>Tập thể được khen thưởng: </label>
            <Controller
              control={control}
              name="doi"
              render={({ field }) => (
                <Select
                  options={doiChangeList}
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

      <div className='flex mb-8 mt-12 shadow-lg shadow-slate-300 py-8'>
        <RectangleChart text={"Tổng số lượt khen thưởng"} number={khenthuongs.length} color={'bg-red-600'} />
        <RectangleChart text={"Tổng số tập thể được khen"} number={khenTapthes.length} color={'bg-cyan-600'} />
        <RectangleChart text={"Tổng số cá nhân được khen"} number={khenCanhans.length} color={'bg-blue-600'} />
        <RectangleChart text={"Tổng số lượt khen tập thể"} number={luotkhenTapthes} color={'bg-pink-600'} />
        <RectangleChart text={"Tổng số lượt khen cá nhân"} number={luotkhenCanhans} color={'bg-yellow-600'} />
      </div>
      <div className='mt-6'>

        <div className='mt-2 my-8 shadow-md px-2 shadow-gray-500 rounded-md'>
          <p className='text-center text-lg mt-8 pt-4 font-semibold'>Danh sách các quyết định khen thưởng của tập thể và cá nhân</p>
          <div className='mt-4 text-end md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
            <Button variant='contained' color='success' size='small'>
              <CSVLink data={excelExport} headers={headers} filename={`danhsachkhenthuong_${watch('tungay')}_${watch('denngay')}`}>
                <FileDownloadIcon />
                <span className='text-sm ml-1 text-white'>Xuất file excel</span>
              </CSVLink>
            </Button>
          </div>
          <p className='my-2 px-4 text-end'>Tổng số: <span className='font-semibold text-2xl text-red-600'>{khenthuongs.length}</span> lượt khen thưởng</p>
          <TableKhenthuongThongke
            list={khenthuongs}
          />
        </div>
        <div className='my-4'>
          <div className='mt-2 my-8 shadow-md px-2 shadow-gray-500 rounded-md'>
            <p className='text-center text-lg mt-8 pt-4 font-semibold'>Danh sách tập thể và số lượt khen thưởng của tập thể</p>
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
          <div className='mt-2 my-8 shadow-md px-2 shadow-gray-500 rounded-md'>
            <p className='text-center text-lg mt-8 pt-4 font-semibold'>Danh sách cá nhân và số lượt khen thưởng của cá nhân</p>

            <div className='mt-4 text-end md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
              <Button variant='contained' color='success' size='small'>
                <CSVLink data={excelCanhanExport} headers={headers_canhan} filename={`danhsachkhenthuongcanhan_${watch('tungay')}_${watch('denngay')}`}>
                  <FileDownloadIcon />
                  <span className='text-sm ml-1 text-white'>Xuất file excel</span>
                </CSVLink>
              </Button>
            </div>
            <p className='my-2 px-4 text-end'>Tổng số: <span className='font-semibold text-2xl text-red-600'>{khenCanhans.length}</span> cá nhân được khen thưởng</p>
            <TableChitietCanhan list={khenCanhans} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default KhenthuongThongke
