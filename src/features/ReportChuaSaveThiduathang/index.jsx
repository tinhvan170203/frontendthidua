import React, { useMemo, useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton, Paper } from '@mui/material';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import { useOutletContext, useSearchParams, useNavigate, Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Select from 'react-select';

import { useSelector } from 'react-redux';
import canboApi from '../../api/canboApi';
import thongkeApi from '../../api/thongkeApi';
import TableKhoi from './components/TableKhoi';

const ReportChuaSaveThiduathang = () => {
  let vaitro = useSelector((state) => state.authReducer.vaitro_theodoithidua);
  const navigate = useNavigate();
  if (vaitro !== "Quản trị hệ thống") {
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
  const [monthDisplay, setMonthDisplay] = useState(1)
  const [yearDisplay, setYearDisplay] = useState(1)
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2022);
  const [optionYear, setOptionYear] = useState([]);
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const [list, setList] = useState([])
  const [search, setSearch] = useState('');


  useEffect(() => {
    const fetchYear = async () => {
      try {
        let res = await canboApi.fetchYearMonth();
        setMonth(res.data.month);
        setMonthDisplay(res.data.month)
        setYear(res.data.year);
        setYearDisplay(res.data.year);
        let arr = [];
        for (let i = res.data.year; i >= 2020; i--) {
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

  const handleFetchThiduathang = async () => {
    try {
      handleLoading(true);
      let res = await thongkeApi.fetchReportChuaSaveThiduathang({ month, year });
      setList(res.data)
      setMonthDisplay(month)
      setYearDisplay(year);
      handleLoading(false);
    } catch (error) {
      console.log(error.message)
    }
  };
  //debounced input search
  useEffect(() => {
    const timer = setTimeout(() => {
      let arr = [...doanviens];
      let newArr = arr.filter(i => i.hoten.toLowerCase().includes(search.toLowerCase()));
      setDoanviensDisplay(newArr)
    }, 500);
    return () => clearTimeout(timer)
  }, [search]);

  const roles = useSelector((state) => state.authReducer.roles_theodoithidua);

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Thống kê đơn vị chưa cập nhật kết quả thi đua tháng</h4>
      </div>


      <div className='space-x-2 flex justify-center shadow-gray-400 shadow-md p-4 rounded-sm'>
        <div className='flex-col flex md:basis-1/6'>
          <label className='font-semibold'>Tháng:</label>
          <Select
            value={{ label: month, value: month }}
            required={true}
            name="thang"
            options={[
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: 4, value: 4 },
              { label: 5, value: 5 },
              { label: 6, value: 6 },
              { label: 7, value: 7 },
              { label: 8, value: 8 },
              { label: 9, value: 9 },
              { label: 10, value: 10 },
              { label: 11, value: 11 },
              { label: 12, value: 12 }
            ]}
            className="basic-multi-select my-4"
            classNamePrefix="select"
            onChange={(e) => setMonth(e.value)}
          />
        </div>
        <div className='flex-col flex md:basis-1/6'>
          <label className='font-semibold'>Năm:</label>
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
        <div className='flex-col flex md:basis-1/6'>
          <Button
            onClick={() => handleFetchThiduathang()} color="primary" variant='contained'><SearchIcon /> Thống kê danh sách</Button>
        </div>

      </div>
      <div className='mt-4 shadow-md shadow-gray-400'>
        <p className='text-center text-lg font-semibold'>Danh sách các đơn vị chưa cập nhật kết quả thi đua tháng</p>
        <p className='text-center italic'>(Tháng {monthDisplay} Năm {yearDisplay})</p>
        <div className='mt-8 px-2'>
          <p className='text-end my-2 x-2'>Tổng số: <span className='text-red-600 font-bold text-2xl'>{list.length}</span> đơn vị chưa cập nhật kết quả thi đua tháng</p>
          <div className=''>
            <TableKhoi list={list} />
          </div>
        </div>
      </div>



    </div>
  )
}

export default ReportChuaSaveThiduathang