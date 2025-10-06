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
import TableDanhhieuthidua from '../components/TableDanhhieuthidua';
const DanhhieuthiduaThongke = () => {
  const vaitro = useSelector(state => state.authReducer.vaitro_theodoithidua);
  const [year, setYear] = useState(0);
  const [yearDisplay, setYearDisplay] = useState('');
  const [donviList, setDonviList] = useState([]);
  const [optionYear, setOptionYear] = useState([]);
  const [dataBang, setDataBang] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]);
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
      cap: { label: "Cấp Phòng", value: "Cấp Phòng" }
    },
  });


  useEffect(() => {
    const fetchYear = async () => {
      try {
        let res = await canboApi.fetchYearMonth();
        let res3 = await thongkeApi.getDonviDois({ vaitro });
        setDonviList(res3.data.data_donvi);

        setYear(res.data.year);
        setYearDisplay(res.data.year);
        let arr = [];
        for (let i = (res.data.year); i >= 2022; i--) {
          arr.push({
            label: i, value: i
          })
        };
        setOptionYear(arr);
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

  const handleFetchDanhhieuThidua = async () => {
    handleLoading(true);
    try {
      let res = await thongkeApi.getDanhhieuThiduaNam({ nam: year, cap: watch('cap').value })
      setYearDisplay(year)
      setDataBang(res.data)
      setDataDisplay(res.data)
      handleLoading(false)
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
        handleLoading(false)
      }
      console.log(error.message)
      handleLoading(false)
    }
  };

  useEffect(() => {
    const handleFetchDanhhieuThidua = async () => {
      handleLoading(true);
      try {
        let x = (new Date()).getFullYear()
        let res = await thongkeApi.getDanhhieuThiduaNam({ nam: x, cap: watch('cap').value })
        setYearDisplay(year)
        setDataBang(res.data)
        setDataDisplay(res.data)
        handleLoading(false)
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
          handleLoading(false)
        }
        console.log(error.message)
        handleLoading(false)
      }
    };

    handleFetchDanhhieuThidua()
  }, [])

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Thống kê, theo dõi kết quả danh hiệu thi đua năm của các đơn vị</h4>
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
          <label className='font-semibold'>Khối đơn vị: </label>
          <Controller
            control={control}
            name="cap"
            render={({ field }) => (
              <Select
                options={[
                  { label: "Cấp Phòng", value: "Cấp Phòng" },
                  { label: "Cấp Xã", value: "Cấp Xã" }
                ]}
                className="basic-multi-select my-3 p-1"
                classNamePrefix="select"
                {...field}
              />
            )}
          />
        </div>
        <div className='flex-col px-1 flex items-end justify-center'>
          <Button variant='contained' onClick={() => handleFetchDanhhieuThidua()} style={{ width: "200px" }} color='primary'><BarChartIcon /> Thống kê dữ liệu</Button>
        </div>
      </div>

      <div className='mt-2 shadow-md shadow-gray-500 rounded-md'>
        <p className='text-center text-lg mt-8 font-semibold'>Danh sách thống kê danh hiệu thi đua năm {yearDisplay} của các tập thể</p>
        <span className='font-semibold p-4'>Tổng số: <span className='text-2xl text-red-600 font-semibold'>{dataDisplay.length}</span> tập thể đạt danh hiệu thi đua năm {yearDisplay}</span>
        <div className='px-2 mt-4 '>
          <TableDanhhieuthidua list={dataDisplay} />
        </div>
      </div>
    </div>
  )
}

export default DanhhieuthiduaThongke