import React, { useMemo, useState, useEffect } from 'react'
import GridView from '@mui/icons-material/GridView'
import chidoanApi from '../../../api/chidoanApi';
import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton, Paper } from '@mui/material';

import { useForm, Controller } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { useOutletContext, useSearchParams, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import Select from 'react-select';
import { CSVLink } from "react-csv";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import thongkeApi from '../../../api/thongkeApi';
import TableKiluatThongke from '../components/TableKiluatThongke';
import TableChitietKiluat from '../components/TableChitietKiluat';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

let headers = [
    { label: "STT", key: "stt" },
    { label: "Số quyết định", key: "soQD" },
    { label: "Hình thức", key: "hinhthuc" },
    { label: "Người ký", key: "nguoiky" },
    { label: "Cá nhân bị kỷ luật", key: "canhanbikiluat" },
    { label: "Ngày ký", key: "ngayky" },
    { label: "Nội dung", key: "noidung" }
];

const KiluatThongke = () => {
    const [kiluats, setKiluats] = useState([]);
    let [excelExport, setExcelExport] = useState([]);
    const [handleChangeNotifications, handleLoading] = useOutletContext();
    const [kiluatCanhans, setKiluatCanhans] = useState([]);
    const navigate = useNavigate()

    const [donviList, setDonviList] = useState([]);
    const vaitro = useSelector(state => state.authReducer.vaitro_theodoithidua)
    // get danh sách chi đoàn thuộc quyền quản lý của tài khoản
    useEffect(() => {
        const getData = async () => {
            try {
                let res3 = await thongkeApi.getDonviDois({ vaitro })
                setDonviList(res3.data.data_donvi);
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
            donvi: { label: "Tất cả", value: "" },
            tungay: "",
            denngay: "",
            soQD: "",
            noidung: "",
            nguoiky: "",
        },
    });
    // handle submit search
    const handleFormSearchSubmit = async (values) => {
        let params = {
            ...values, hinhthuc: values.hinhthuc.value,
            donvi: values.donvi.value, vaitro
        };

        handleLoading(true);
        try {
            let res = await thongkeApi.getKiluats(params);
            setKiluats(res.data.data);
            setExcelExport(res.data.data.map((i, index) => ({
                stt: index + 1,
                soQD: i.soQD,
                ngayky: dayjs(i.ngayky).format('DD/MM/YYYY'),
                noidung: i.noidung,
                nguoiky: i.nguoiky,
                hinhthuc: i.hinhthuc,
                canhanbikiluat: i.doituongkhen,
            })));
            setKiluatCanhans(res.data.canhanbikiluats)
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


    return (
        <div className='pr-2' data-aos="fade-left" data-aos-once="true">
            <div className='my-2'>
                <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Thống kê, theo dõi kết quả kỉ luật cá nhân trong đơn vị</h4>
            </div>

            <form onSubmit={handleSubmit(handleFormSearchSubmit)} className='my-2 mt-4 shadow-gray-400 shadow-md p-4 rounded-lg'>
                <div className='flex justify-between'>
                    <h5 className='text-[18px] font-semibold'>Tra cứu kỷ luật cá nhân</h5>
                </div>
                <div className='flex flex-wrap xl:flex-row flex-col flex-1 p-2'>
                    <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
                        <label className='underline font-semibold'>Số QĐ kỷ luật: </label>
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
                        <label className='underline font-semibold'>Nội dung kỷ luật: </label>
                        <input {...register("noidung")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                    </div>
                    <div className='flex-col flex flex-1 px-1'>
                        <label className='underline font-semibold'>Hình thức kỷ luật: </label>
                        <Controller
                            control={control}
                            name="hinhthuc"
                            render={({ field }) => (
                                <Select
                                    options={[
                                        { label: "Tất cả", value: "" },
                                        { label: "Khiển trách", value: "Khiển trách" },
                                        { label: "Cảnh cáo", value: "Cảnh cáo" },
                                        { label: "Hạ cấp bậc hàm", value: "Hạ cấp bậc hàm" },
                                        { label: "Tước quân tịch CAND", value: "Tước quân tịch CAND" },
                                    ]}
                                    className="basic-multi-select my-4 p-1"
                                    classNamePrefix="select"
                                    placeholder="Vui lòng chọn hình thức"
                                    {...field}
                                />
                            )}
                        />
                    </div>

                    <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
                        <label className='underline font-semibold'>Đơn vị công tác: </label>
                        <Controller
                            control={control}
                            name="donvi"
                            render={({ field }) => (
                                <Select
                                    options={donviList}
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

            <div className='mt-6'>
                <p className='text-center text-lg mt-8 font-semibold'>Danh sách cá nhân vi phạm kỷ luật cá nhân trong đơn vị</p>
                <div className='my-4'>
                    <h4 className='text-end'>Tổng số: <span className='font-bold text-xl'>{kiluatCanhans.length}</span> cá nhân bị kỷ luật</h4>
                    <div className='my-4'>
                        <TableChitietKiluat list={kiluatCanhans} />
                    </div>
                </div>

                <div className='my-8 px-2 shadow-md shadow-gray-500 rounded-md'>
                    <p className='text-center text-lg my-8 font-semibold'>Danh sách quyết định kỷ luật của cá nhân trong đơn vị</p>
                    <div className='mt-4 text-end md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
                        <Button variant='contained' color='success' size='small'>
                            <CSVLink data={excelExport} headers={headers} filename={`danhsachkiluat_${watch('tungay')}_${watch('denngay')}`}>
                                <FileDownloadIcon />
                                <span className='text-sm ml-1 text-white'>Xuất file excel</span>
                            </CSVLink>
                        </Button>
                    </div>
                    <h4 className='mb-4 text-end'>Tổng số: <span className='font-bold text-xl'>{kiluats.length}</span> quyết định kỷ luật</h4>
                    <TableKiluatThongke list={kiluats} />
                </div>
            </div>
        </div>
    )
}

export default KiluatThongke
