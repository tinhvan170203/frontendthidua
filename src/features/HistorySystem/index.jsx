import React, { useMemo, useState, useEffect } from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useOutletContext } from "react-router-dom";
import { useSelector } from 'react-redux';
import TableKhoi from './components/TableLinhvuc';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import thongkeApi from '../../api/thongkeApi';
const animatedComponents = makeAnimated();
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const HisorySystem = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [list, setList] = useState([]);
   
    const navigate = useNavigate();
    const [handleChangeNotifications, handleLoading] = useOutletContext();
    const {
        register,
        handleSubmit,
        control,
        resetField,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            tentaikhoan: "",
            tungay: "",
            denngay: "",
            action: ""
        },
    });

 let id_user = useSelector((state) => state.authReducer.id_user);

    //handle submit add notification
    const onSubmit = async (values) => {
        // console.log(values)
        if(watch('denngay') === ""){
            alert("Vui lòng chọn khoảng thời gian đến ngày cần xem lịch sử hệ thống");
            return;
        };

        let data = {
            ...values,
            id: id_user
        };
        handleLoading(true)
        try {
            let res = await thongkeApi.fetchSystemHistory(data);
            setList(res.data);
            handleLoading(false);
            // console.log(res.data)
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
        } catch (error) {
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
            handleLoading(false);
        }
    };

    return (
        <div>
                     <div className='my-2'>
               <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Lịch sử truy cập hệ thống phần mềm</h4> 
            </div>

                <form className='mt-2 px-4 py-4 shadow-xl' onSubmit={handleSubmit(onSubmit)}>
                    <h5 className='font-bold'>Tìm kiếm lịch sử ghi nhận trên hệ thống</h5>
                    <div className='flex space-x-2'>
                        <div className='flex-col flex md:basis-2/5'>
                            <label className='text-[14px] font-semibold'>Tên tài khoản: </label>
                            <input {...register("tentaikhoan")} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                        </div>
                        <div className='flex-col flex md:basis-1/5'>
                            <label className='text-[14px] font-semibold'>Từ ngày</label>
                            <input {...register("tungay")} type="date" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                        </div>
                        <div className='flex-col flex md:basis-1/5'>
                            <label className='text-[14px] font-semibold'>Đến ngày </label>
                            <input {...register("denngay")}  type="date" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                        </div>
                        <div className='flex-col flex md:basis-1/5'>
                            <label className='text-[14px] font-semibold'>Thao tác hệ thống</label>
                            <input {...register("action")} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                        </div>
                    </div>
                    <div className='text-center'>
                        <Button type='submit' size='small' sx={{ width: "220px" }} variant='contained'><SearchIcon /> Tìm kiếm</Button>
                    </div>
                </form>


            <h3 className='text-center uppercase my-3 text-lg'>Lịch sử thao tác ghi nhận trên hệ thống phần mềm</h3>
            <div className='mt-4'>
                <TableKhoi
                    list={list} 
                />
            </div>
        </div>
    )
}

export default HisorySystem 