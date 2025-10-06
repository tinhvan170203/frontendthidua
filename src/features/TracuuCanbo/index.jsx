import React, { useMemo, useState, useEffect } from 'react'
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import SearchIcon from '@mui/icons-material/Search';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useOutletContext } from "react-router-dom";
import DialogDelete from '../../components/DialogDelete';
import doiApi from '../../api/doiApi';
import TableConganxa from './components/TableConganxa';
import EditModal from './components/EditModal';
import { useSelector } from 'react-redux';
import thongkeApi from '../../api/thongkeApi';
import Select from 'react-select';
const TracuuCanbo = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const vaitro = useSelector(state => state.authReducer.vaitro_theodoithidua);
  const [dois, setDois] = useState([]);
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const navigate = useNavigate();

  const [donviList, setDonviList] = useState([]);
  const [doiList, setDoiList] = useState([]);
  const [doiChangeList, setDoiChangeList] = useState([]);

  //open dialog edit
  const handleOpenDialogEdit = (item) => {
    setOpenDialogEdit({
      item,
      status: true,
    });
  };

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
      hoten: "",
      donvi: {label: "Tất cả", value: ""}
    },
  });


  useEffect(() => {
    const getData = async () => {
      try {
        let res3 = await thongkeApi.getDonviDois({ vaitro })
        // console.log(res3)
        if (vaitro === "Quản trị thông thường") {
          setDonviList(res3.data.data_donvi.slice(0, 1));
          setValue('donvi', res3.data.data_donvi.slice(0, 1)[0]);
        } else {
          setDonviList(res3.data.data_donvi);
        }
        setDoiList(res3.data.data_doi);
        setDoiChangeList(res3.data.data_doi.slice(1));
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


  useEffect(() => {
    let checked = watch('donvi').value;
    let arr = [...doiList];

    if (checked === "") {
      setDoiChangeList(arr.slice(1));
      setValue('doi', { label: "Tất cả", value: "" })
    } else {
      let newList = arr.filter(i => i.donvi === checked);
      let newArr = [{ label: "Tất cả", value: "" }].concat(newList);
      setDoiChangeList(newArr);
      setValue('doi', { label: "Tất cả", value: "" })
    }
  }, [watch('donvi')])


  //handle submit 
  const onSubmit = async (values) => {
    let data = { ...values };
    handleLoading(true);
    try {
      let res = await thongkeApi.searchCanbo(data);
      setDois(res.data)
      handleLoading(false);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
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
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleLoading(false);
    }
  };

  // const roles = useSelector((state) => state.authReducer.roles_theodoithidua);
  const id_user = useSelector((state) => state.authReducer.id_user);

  return (
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='my-2'>
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Tra cứu cán bộ, chiến sĩ</h4>
      </div>

      <form className='mt-2 flex px-6 flex-wrap py-4 shadow-gray-400 shadow-md' onSubmit={handleSubmit(onSubmit)}>
        <div className='basis-1/3 flex flex-col px-2'>
          <label className='underline font-semibold'> Họ và tên: </label>
          <input {...register("hoten")} type="text" className='outline-none my-4 border rounded-md w-full p-2 py-[8px] border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
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
          <label className='underline font-semibold'>Tổ, đội công tác: </label>
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
        <div className='md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
          <Button type='submit' color="primary" variant='contained'><SearchIcon /> Tìm kiếm dữ liệu</Button>
        </div>
      </form>

      <div className='mt-6 shadow-black shadow-sm px-2'>
        <p className='text-center text-lg my-8 font-semibold mb-8'>Danh sách kết quả cán bộ, chiến sĩ tìm thấy trong hệ thống phần mềm</p>
        <TableConganxa
          list={dois} />
      </div>

    </div>
  )
}

export default TracuuCanbo
