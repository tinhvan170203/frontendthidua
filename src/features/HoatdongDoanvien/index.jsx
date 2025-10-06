import React, { useMemo, useState, useEffect } from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import notificationApi from '../../api/notificationApi';
import ModalLoading from '../../components/ModalLoading';
import { toast } from 'react-toastify';
import EditModal from './components/EditModal';
import { useOutletContext } from "react-router-dom";
import DialogDelete from '../../components/DialogDelete';
import khoiApi from '../../api/khoiApi';
import TableKhoi from './components/TableKhoi';
import { useSelector } from 'react-redux';
import hoatdongApi from '../../api/hoatdongApi';

const Hoatdongdoanvien = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const [khois, setKhois] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openSearch, setOpenSearchAdd] = useState(false);

    const [handleChangeNotifications, handleLoading] = useOutletContext();
    const navigate = useNavigate();
    const [openDialogEdit, setOpenDialogEdit] = useState({
        status: false,
        item: null,
    });

    const handleCloseDialogEdit = () => {
        setOpenDialogEdit({
            ...openDialogEdit,
            status: false,
        });
    };

    //open dialog edit
    const handleOpenDialogEdit = (item) => {
        setOpenDialogEdit({
            item,
            status: true,
        });
    };

    //state mở hộp thoại delete
    const [openDialogDelete, setOpenDialogDelete] = useState({
        status: false,
        id_Delete: null,
    });

    //open dialog delete
    const handleOpenDialogDelete = (id) => {
        setOpenDialogDelete({
            status: true,
            id_Delete: id,
        });
    };

    const handleCancelDelete = () => {
        setOpenDialogDelete({
            ...openDialogDelete,
            status: false,
        });
    };

    const handleCloseDialogDelete = () => {
        setOpenDialogDelete({
            ...openDialogDelete,
            status: false,
        });
    };


    const {
        register,
        handleSubmit,
        control,
        resetField,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
        },
    });

    const form1 = useForm();
    const register1 =form1.register;
    const handleSubmitSearch = form1.handleSubmit;


    //fetch notifications
    useEffect(() => {
        const fetchData = async () => {
            try {
                handleLoading(true);
                let res = await hoatdongApi.getHoatdongs();
                setKhois(res.data);

                setTimeout(() => {
                    handleLoading(false);
                }, 400);
            } catch (error) {
                if (
                    error.message ===
                    "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại"
                ) {
                    navigate("/login");
                    handleLoading(false);
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

            }
        };

        fetchData();
    }, []);

    //handle submit add notification
    const onSubmit = async (values) => {
        let data = { ...values };
        handleLoading(true);
        try {
            let res = await hoatdongApi.addHoatdong(data);
            setKhois(res.data.khois)
            setTimeout(() => {
                handleLoading(false);
            }, 400)
            resetField('noidung');
            resetField("ghichu");
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

    //handle submit edit notification
    const handleSubmitEdit = async (values) => {
        let data = { ...values };
        handleLoading(true);
        try {
            let res = await hoatdongApi.editHoatdong(data);
            setKhois(res.data.khois)

            setTimeout(() => {
                handleLoading(false);
            }, 400);
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

    // handle delete notification
    const handleConfirmDelete = async () => {
        handleLoading(true);
        try {
            let res = await hoatdongApi.deleteHoatdong(openDialogDelete.id_Delete);

            setKhois(res.data.khois)

            setTimeout(() => {
                handleLoading(false);
            }, 400);

            setOpenDialogDelete({
                ...openDialogDelete,
                status: false
            })
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
            setOpenDialogDelete({
                ...openDialogDelete,
                status: false
            });
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

    const handleSearchHoatdongs = async (values) => {
        try {
            let res = await hoatdongApi.searchHoatdongs(values);
            setKhois(res.data)
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
        }
    }

    return (
        <div className='pr-2' data-aos="fade-left" data-aos-once="true">
            <div className='flex items-center space-x-1'>
                <GridViewIcon color='primary' fontSize="large" />
                <h4 className='font-bold text-gray-800 text-lg'>Quản lý hoạt động đoàn</h4>
            </div>

            <div className='px-4 flex space-x-2 mt-2 items-end'>
                <Button variant='contained' onClick={() => setOpenAdd(true)}>Thêm mới hoạt động đoàn</Button>
                <Button variant='contained' onClick={() => setOpenSearchAdd(true)}>Tìm kiếm hoạt động</Button>
            </div>
{openAdd && (
            <form className='mt-2 mx-8' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Nội dung hoạt động đoàn: </label>
                    <input {...register("noidung")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ghi chú: </label>
                    <input {...register("ghichu")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Địa điểm: </label>
                    <input {...register("diadiem")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Đoàn viên tham gia, thực hiện: </label>
                    <input {...register("doanvien")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày: </label>
                    <input {...register("ngay", { required: true })} type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
                    <Button type='submit' sx={{ width: "220px", backgroundColor: "gray" }} color="primary" variant='contained'><AddIcon /> Thêm mới</Button>
                </div>
            </form>
)}

            {
                openSearch && (
                    <form className='mt-4 mx-8' onSubmit={handleSubmitSearch(handleSearchHoatdongs)}>
                        <h4 className='font-bold'>Tìm kiếm hoạt động đoàn</h4>
                        <div className='flex flex-wrap'>
                            <div className='flex-col flex md:basis-full px-2'>
                                <label className='underline font-semibold'>Nội dung hoạt động đoàn: </label>
                                <input {...register1("noidung_search")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                            focus:ring-2 focus:border-blue-400'/>
                            </div>
                            <div className='flex-col flex md:basis-1/2 px-2'>
                                <label className='underline font-semibold'> Địa điểm: </label>
                                <input {...register1("diadiem_search")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                            focus:ring-2 focus:border-blue-400'/>
                            </div>
                            <div className='flex-col flex md:basis-1/2 px-2'>
                                <label className='underline font-semibold'> Ghi chú: </label>
                                <input {...register1("ghichu_search")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                            focus:ring-2 focus:border-blue-400'/>
                            </div>
                            <div className='flex-col flex md:basis-1/3 px-2'>
                                <label className='underline font-semibold'> Đoàn viên tham gia, thực hiện: </label>
                                <input {...register1("doanvien_search")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                            focus:ring-2 focus:border-blue-400'/>
                            </div>
                            <div className='flex-col flex md:basis-1/3 px-2'>
                                <label className='underline font-semibold'> Từ ngày: </label>
                                <input {...register1("tungay_search")} type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                            focus:ring-2 focus:border-blue-400'/>
                            </div>
                            <div className='flex-col flex md:basis-1/3 px-2'>
                                <label className='underline font-semibold'> Đến ngày: </label>
                                <input {...register1("denngay_search")} type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                            focus:ring-2 focus:border-blue-400'/>
                            </div>
                        </div>
                        <div className='text-center'>
                            <Button type='submit' color="primary" variant='contained'><SearchIcon /> Tìm kiếm</Button>
                        </div>
                    </form>
                )
            }
            {/* table data  */}
            <div className='mt-6 mx-8'>
                <TableKhoi
                    list={khois}
                    onClickOpenDialogDelete={handleOpenDialogDelete}
                    onClickOpenDialogEdit={handleOpenDialogEdit} />
            </div>

            <EditModal
                open={openDialogEdit.status}
                item={openDialogEdit.item}
                onCloseDialogEdit={handleCloseDialogEdit}
                onSubmit={handleSubmitEdit}
            />

            <DialogDelete
                open={openDialogDelete.status}
                onCloseDialogDelete={handleCloseDialogDelete}
                onConfirmDelete={handleConfirmDelete}
                onCancelDelete={handleCancelDelete}
            />

        </div>
    )
}

export default Hoatdongdoanvien
