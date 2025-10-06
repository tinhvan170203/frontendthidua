import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import { toast } from 'react-toastify';
import Select from 'react-select';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { Button, IconButton, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import authApi from '../../api/authApi';
import TableComponents from './components/TableAccount';
import fileDownload from 'js-file-download';
import { Document, Packer, Paragraph, convertInchesToTwip, WidthType, TextRun, AlignmentType, PageOrientation, Table, TableCell, TableRow, VerticalAlign, TextDirection, HeadingLevel } from "docx"

import BackupIcon from '@mui/icons-material/Backup';
import * as XLSX from 'xlsx';
// import updateCaicachApi from '../../api/updatecaicach';
import khoiApi from '../../api/khoiApi';
import canboApi from '../../api/canboApi';


const CanboDangYeucauChuyendi = () => {

    let vaitro = useSelector((state) => state.authReducer.vaitro_theodoithidua);
    const navigate = useNavigate();
    if (vaitro !== "Quản trị thông thường") {
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
    const [accounts, setAccounts] = useState([]);
    const [accountsBase, setAccountsBase] = useState([]);
    const [handleChangeNotifications, handleLoading, handleCountListTiepnhan, handleCountListTuchoi, handleCountListDangDoiTiepnhan] = useOutletContext();
    const [tentaikhoan, setTentaikhoan] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            handleLoading(true);
            try {
                let res = await canboApi.fetchCanboDangDoiChuyenCongtac();
                handleCountListDangDoiTiepnhan();
                setAccounts(res.data);
                setAccountsBase(res.data);
                handleLoading(false);
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
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                }
                handleLoading(false);
                console.log(error.message)
            }
        };

        fetchData();
    }, []);



    const handleSearch = (e) => {
        e.preventDefault();
        let arr = [...accountsBase];
        arr = arr.filter(i => i.hoten.toUpperCase().includes(tentaikhoan.toUpperCase()));
        setAccounts(arr)
    };


    return (
        <div data-aos="fade-left" data-aos-once="true">
            <div className='my-2'>
                <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản trị cán bộ, chiến sĩ đang đợi xác nhận chuyển công tác đến đơn vị khác</h4>
            </div>

            <div className='mt-6'>
                <div className='shadow-md shadow-gray-400 mr-2'>
                    <form className='mt-2 px-4 py-4 bg-slate-200 rounded-md md:bg-white' onSubmit={(e) => handleSearch(e)}>
                        <h5 className='font-bold'><SearchIcon /> Tra cứu cán bộ, chiến sĩ</h5>
                        <div className='flex flex-col md:flex-row md:items-center flex-wrap'>
                            <div className='flex-col flex flex-1 px-2'>
                                <label className='text-[14px] font-semibold'> Họ và tên: </label>
                                <input value={tentaikhoan} name='tentaikhoanSearch' onChange={(e) => setTentaikhoan(e.target.value)} type="text" className='outline-none my-2 border rounded-md p-2 px-3 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                            </div>
                        </div>
                        <div className='md:space-x-2  ml-2  space-y-2 mt-2 md:space-y-0 md:block flex flex-col items-center'>
                            <Button type='submit' size='small' sx={{ width: "220px" }} variant='contained'><SearchIcon /> Tìm kiếm</Button>
                        </div>
                    </form>
                </div>

                <div className='shadow-md shadow-gray-400 mr-2'>
                    <p className='text-center text-lg mt-8 font-semibold mb-8'>Danh sách cán bộ, chiến sĩ đang đợi xác nhận chuyển công tác đến đơn vị khác</p>
                    <div className='px-2'>
                        <TableComponents
                            list={accounts}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CanboDangYeucauChuyendi