import GridView from '@mui/icons-material/GridView'
import React, { useState, useEffect, useMemo } from 'react'
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate, Navigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { useOutletContext } from "react-router-dom";
import DialogDelete from '../../components/DialogDelete';
import ModalEditChucvu from './components/ModalEditChucvu';
import chucvuApi from '../../api/chucvuApi';
import TableChucvus from './components/TableChucvu';
import { useSelector } from 'react-redux';
import authApi from '../../api/authApi';
import { useRef } from 'react';

const ImagePage = () => {
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
    const [chucvus, setChucvus] = useState([]);

    const [handleChangeNotifications, handleLoading] = useOutletContext();
    const ref = useRef();
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
            noidung: "",
            thutu: 1,
            trangthai: true
        },
    });

    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    //fetch chuc vu
    useEffect(() => {
        const fetchData = async () => {
            handleLoading(true);
            try {
                let res = await authApi.getImg();

                setChucvus(res.data);
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
                console.log(error.message)
            }
        };

        fetchData();
    }, []);
    //handle submit add bac ham group
    const onSubmit = async (values) => {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('noidung', values.noidung);
        formData.append('thutu', values.thutu);
        formData.append('status', values.trangthai);


        handleLoading(true);
        try {
            let res = await authApi.saveImg(formData);
            let res1 = await authApi.getImg();
            setChucvus(res1.data);
            ref.current.value = ""

            handleLoading(false);

            resetField('noidung');
            resetField("thutu");
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

    //handle submit edit bac hàm
    const handleSubmitEdit = async (values) => {
        let data = { ...values };
        handleLoading(true);
        try {
            let res = await authApi.editImg(data, data.id_edit);
            let res1 = await authApi.getImg();
            setChucvus(res1.data);
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

    // hanle delete chucvus 
    const handleConfirmDelete = async () => {
        handleLoading(true);
        try {
            let res = await authApi.deleteImg(openDialogDelete.id_Delete);
            let res1 = await authApi.getImg();
            setChucvus(res1.data);
            handleLoading(false);
            setOpenDialogDelete({
                ...openDialogDelete,
                status: false
            });

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

    const roles = useSelector((state) => state.authReducer.roles_theodoithidua);

    return (
        <div className='pr-2' data-aos="fade-left" data-aos-once="true">

            <div className='my-2'>
                <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản lý thư viện ảnh trình chiếu các hoạt động nổi bật</h4>
            </div>
            <form className='mt-2 px-6 py-4 shadow-gray-400 shadow-md' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Nội dung ảnh: </label>
                    <input {...register("noidung", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                </div>
                <div className='flex-col flex md:basis-1/2'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Thứ tự: </label>
                    <input {...register("thutu", { required: true })} type="number" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                </div>
                <div className='space-x-3 items-center flex md:basis-1/6 p-1'>
                    <label className='underline  font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Trạng thái sử dụng: </label>
                    <input {...register("trangthai")} type="checkbox" autoComplete='on' className='outline-none my-4 border rounded-md p-2 w-6 h-6 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                </div>
                <div className='my-2'>
                    <input ref={ref} required className='mt-4' accept='.img, .png, .jpg,.jpeg' type="file" onChange={(e) => handleFileChange(e)} />
                </div>
                <div className='md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
                    <Button type='submit' color="primary" variant='contained'><AddIcon /> Thêm mới</Button>
                </div>
            </form>

            <div className='mt-6 shadow-black shadow-sm px-2'>
                <h4 className='text-center font-semibold text-blue-600 py-4 uppercase'>Danh sách hình ảnh nổi bật trong Công an đơn vị</h4>
                <TableChucvus
                    list={chucvus}
                    onClickOpenDialogDelete={handleOpenDialogDelete}
                    onClickOpenDialogEdit={handleOpenDialogEdit} />
            </div>

            <ModalEditChucvu
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

export default ImagePage
