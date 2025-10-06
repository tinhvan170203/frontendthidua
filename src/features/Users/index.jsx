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
import ModalEditComponent from './components/ModalEditAccount';
import DialogBlock from '../../components/DialogBlock';
import PrintIcon from '@mui/icons-material/Print';
import fileDownload from 'js-file-download';
import { Document, Packer, Paragraph, convertInchesToTwip, WidthType, TextRun, AlignmentType, PageOrientation, Table, TableCell, TableRow, VerticalAlign, TextDirection, HeadingLevel } from "docx"
import DialogDelete from '../../components/DialogDelete';
import BackupIcon from '@mui/icons-material/Backup';
import * as XLSX from 'xlsx';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import khoiApi from '../../api/khoiApi';
import NotificationsIcon from '@mui/icons-material/Notifications';

const UserSystem = () => {

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
    const [accounts, setAccounts] = useState([]);
    const [accountsBase, setAccountsBase] = useState([]);
    const [handleChangeNotifications, handleLoading] = useOutletContext();
    const [tentaikhoan, setTentaikhoan] = useState('');
    const [khois, setKhois] = useState([]);
    const [taikhoancap, setTaikhoancap] = useState('');
    const [khoi, setKhoi] = useState('');

    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [fileName, setFileName] = useState("");
    const [isImport, setIsImport] = useState(false);
    // Danh sách các field tên cột mong muốn
    const expectedFields = ['madonvi', 'tentaikhoan', 'tenhienthi', 'vaitro', 'thutu', 'captaikhoan']; // Thay thế bằng các tên cột mong muốn của bạn
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;
        setFileName(file.name)
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Lấy tên cột từ hàng đầu tiên
            const columns = jsonData[0];

            // Kiểm tra tên cột
            const isValid = expectedFields.every(field => columns.includes(field));
            
            if (!isValid) {
                setError('Tên cột không đúng! Vui lòng kiểm tra lại nội dung file excel.');
                setSuccess('');
                setData([]);
                setIsImport(false)
            } else {
                setSuccess('Tên cột hợp lệ!');
                setError('');
                setData(XLSX.utils.sheet_to_json(worksheet, { header: 2 }))
                setIsImport(true)
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const importFileExcel = async () => {
        try {
            if(watch('khoi') === ""){
                alert('Vui lòng chọn khối bạn muốn import tài khoản vào hệ thống');
                return;
            }
            handleLoading(true);
            
            let res1 = await authApi.checkImport({ data: data });
            let res = await authApi.getUsers({ id_user });
            setAccounts(res.data);
            setAccountsBase(res.data);
            handleLoading(false);
            toast.success(res1.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log(error)
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
            handleLoading(false);
        }
    }

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
    const [openDialogDelete, setOpenDialogDelete] = useState({
        status: false,
        item: null,
    });

    const handleCloseDialogDelete = () => {
        setOpenDialogDelete({
            ...openDialogDelete,
            status: false,
        });
    };

    //open dialog Delete
    const handleOpenDialogDelete = (item) => {
        setOpenDialogDelete({
            item,
            status: true,
        });
    };

    const handleCancelDelete = () => {
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
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            tentaikhoan: "",
            tenhienthi: "",
            trangthai: true,
            khoi: "",
            captaikhoan: "Cấp Phòng"
        },
    });

    let id_user = useSelector((state) => state.authReducer.id_user);

    useEffect(() => {
        const fetchData = async () => {
            handleLoading(true);
            try {
                let res = await authApi.getUsers({ id_user });
                let res2 = await khoiApi.getKhois({ user_created: id_user });
                setKhois(res2.data);
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

    // handle Add Account
    const onSubmit = async (values) => {
        let data = { ...values, id_user: id_user };
        // console.log(data)
        handleLoading(true);
        try {
            let res = await authApi.addUser(data);
            setAccounts(res.data.users);
            setAccountsBase(res.data.users);
            setValue('thutu', Number(data.thutu) + 1)
            handleLoading(false);
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
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
            handleLoading(false);
        }
    };

    //handle submit edit account
    const handleSubmitEdit = async (values) => {
        let data = { ...values, captaikhoan_user: captaikhoan };
        handleLoading(true);
        try {
            let res = await authApi.editUser(data);
            setAccounts(res.data.users);
            setAccountsBase(res.data.users);
            handleLoading(false);
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });

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
            };

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
            handleLoading(false);
        }
    };

    // hanle delete account 
    const handleConfirmDelete = async () => {
        handleLoading(true);
        try {
            let res = await authApi.deleteUser(openDialogDelete.item, { captaikhoan_user: captaikhoan });
            setAccounts(res.data.users);
            setAccountsBase(res.data.users);
            handleLoading(false);

            setOpenDialogDelete({
                ...openDialogDelete,
                status: false
            });

            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            setOpenDialogDelete({
                ...openDialogDelete,
                status: false
            });
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
            handleLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        let arr = [...accountsBase];
        arr = arr.filter(i => i.tentaikhoan.toUpperCase().includes(tentaikhoan.toUpperCase())
            && i.captaikhoan.toUpperCase().includes(taikhoancap.toUpperCase())
            && i.khoi._id.toString().toUpperCase().includes(khoi.toUpperCase())
        );
        setAccounts(arr)
    };

    const downloadWord = () => {
        let data_print = [];
        data_print = data_print.concat(
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            children: [
                                new TextRun({ text: "STT", size: 26, bold: true })
                            ],
                            alignment: AlignmentType.CENTER
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                        width: {
                            size: 800,
                            type: WidthType.DXA,
                        },
                        margins: {
                            top: 30,
                            bottom: 30,
                        }
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            children: [
                                new TextRun({ text: "Tên tài khoản", size: 26, bold: true })
                            ],
                            alignment: AlignmentType.CENTER
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                        margins: {
                            top: 30,
                            bottom: 30,
                        }
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            children: [
                                new TextRun({ text: "Tên đơn vị", size: 26, bold: true })
                            ],
                            alignment: AlignmentType.CENTER
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                        width: {
                            size: 2000,
                            type: WidthType.DXA,
                        },
                        margins: {
                            top: 30,
                            bottom: 30,
                        }
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            children: [
                                new TextRun({ text: "Mật khẩu", size: 26, bold: true })
                            ],
                            alignment: AlignmentType.CENTER
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                        width: {
                            size: 2000,
                            type: WidthType.DXA,
                        },
                        margins: {
                            top: 30,
                            bottom: 30,
                        }
                    })
                ],
            }),
        );

        let arr = [...accounts];
        // console.log(arr)
        let index = 1;
        for (let item of arr) {
            data_print = data_print.concat(
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                children: [
                                    new TextRun({ text: `${index}`, size: 26, bold: true })
                                ],
                                alignment: AlignmentType.CENTER
                            })],
                            verticalAlign: VerticalAlign.CENTER,
                            width: {
                                size: 1000,
                                type: WidthType.DXA,
                            },
                            margins: {
                                top: 30,
                                bottom: 30,
                            }
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [
                                    new TextRun({ text: item.tentaikhoan, size: 26 })
                                ],
                                //   alignment: AlignmentType.CENTER
                            })],
                            // verticalAlign: VerticalAlign.CENTER,
                            margins: {
                                top: 30,
                                bottom: 30,
                            }
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [
                                    new TextRun({ text: `${item.tenhienthi}`, size: 26 })
                                ],
                                // alignment: AlignmentType.CENTER
                            })],
                            verticalAlign: VerticalAlign.CENTER,
                            // width: {
                            //   size: 1200,
                            //   type: WidthType.DXA,
                            // },
                            margins: {
                                top: 30,
                                bottom: 30,
                            }
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [
                                    new TextRun({ text: `${item.matkhau}`, size: 26 })
                                ],
                                alignment: AlignmentType.CENTER
                            })],
                            verticalAlign: VerticalAlign.CENTER,
                            // width: {
                            //   size: 1200,
                            //   type: WidthType.DXA,
                            // },
                            margins: {
                                top: 30,
                                bottom: 30,
                            }
                        })
                    ],
                }),
            )

            index += 1;
        };
        // console.log('2323',data_print)

        const doc = new Document({
            properties: {
            },
            sections: [{
                properties: {
                    page: {
                        size: {
                            // orientation: PageOrientation.LANDSCAPE,
                        },
                        margin: {
                            top: 700,
                            right: 700,
                            bottom: 700,
                            left: 1000,
                        }
                    },
                },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({ text: "DANH SÁCH TÀI KHOẢN", size: 28 }),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({ text: ``, size: 28 }),
                        ],
                        margins: {
                            top: 50,
                            bottom: 50,
                        }
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({ text: "", size: 28 }),
                        ],
                    }),
                    new Table({
                        rows: data_print,
                        width: {
                            size: 10000,
                            type: WidthType.DXA,
                        },
                        margins: {
                            top: 60
                        }
                    })
                ],
            }]

        });

        Packer.toBlob(doc).then(blob => {
            fileDownload(blob, `danhsachtaikhoan.docx`)
        });
    };

    // thay đổi trạng thái hoạt động của các tài khoản
    const handleConfirmNhan = async (data) => {
        handleLoading(true);
        // console.log(data)
        try {
            let res = await authApi.changeManyStatus({ data, id_user });
            setAccounts(res.data.users);
            setAccountsBase(res.data.users);
            handleLoading(false);
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
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
            };

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
            handleLoading(false);
        }
    };

    return (
        <div data-aos="fade-left" data-aos-once="true">
            <div className='my-2'>
               <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản trị tài khoản người dùng</h4> 
            </div>

                  <div className='mt-2'>
                <div className='flex justify-end space-x-2'>
                    <span>{fileName}</span>
                    <label className='hover:cursor-pointer py-1 px-3 uppercase shadow-md hover:bg-green-800 bg-green-600 rounded-md text-white' htmlFor='file'>Chọn File Excel</label>
                    <input id='file' className='hidden' type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                    <Button disabled={!isImport} variant='contained' onClick={importFileExcel}><BackupIcon style={{ marginRight: "8px" }} /> Import dữ liệu</Button>
                </div>
                {error && <p className='px-8 flex items-center' style={{ color: 'red' }}><NotificationsIcon /> {error}</p>}
                {success && <p className='px-8 flex items-center' style={{ color: 'green' }}><VpnKeyIcon /> {success}</p>}
            </div>

            <form className='px-4 py-4 border mt-3 pb-8 rounded-md shadow-md' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col md:flex-row md:flex-wrap'>
                    <div className='flex-col flex md:basis-1/6 p-1'>
                        <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Mã đơn vị: </label>
                        <input {...register("madonvi", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                    </div>
                    <div className='flex-col flex md:basis-1/4 p-1'>
                        <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên tài khoản: </label>
                        <input {...register("tentaikhoan", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                    </div>
                    <div className='flex-col flex md:basis-1/4 p-1'>
                        <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên hiển thị: </label>
                        <input {...register("tenhienthi", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                    </div>
                                        <div className='flex-col flex md:basis-1/3 p-1'>
                        <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Cấp tài khoản: </label>
                        <select {...register("captaikhoan", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'>
                            <option value="Cấp Phòng">Cấp Phòng</option>
                            <option value="Cấp Xã">Cấp Xã</option>
                        </select>
                    </div>
                    <div className='flex-col flex md:basis-1/3 p-1'>
                        <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Khối: </label>
                        <select  {...register("khoi", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'>
                            <option value="" disabled>Vui lòng chọn khối của tài khoản</option>
                            {khois.map(i => <option key={i._id} value={i._id}>{i.tenkhoi}</option>)}
                        </select>
                    </div>
                    <div className='flex-col flex md:basis-1/6 p-1'>
                        <label className='underline text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Thứ tự xuất hiện: </label>
                        <input {...register("thutu", { required: true })} autoComplete='on' type="number" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2' min={1} />
                    </div>
                    <div className='flex-col flex md:basis-1/6 p-1'>
                        <label className='underline text-sm font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Trạng thái sử dụng: </label>
                        <input {...register("trangthai")} type="checkbox" autoComplete='on' className='outline-none my-4 border rounded-md p-2 w-4 h-4 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                    </div>

                    <div className='flex-col flex md:basis-1/3 p-1'>
                        <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Vai trò tài khoản: </label>
                        <select {...register("vaitro", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'>
                            <option value="Quản trị thông thường">Quản trị thông thường</option>
                            <option value="Quản trị hệ thống">Quản trị hệ thống</option>
                            <option value="Theo dõi, thống kê">Theo dõi, thống kê</option>
                        </select>
                    </div>
                </div>
                <div className='md:space-x-2 space-y-2 md:space-y-0 md:block mt-2 flex flex-col items-center'>
                    <Button type='submit' size='small' sx={{ width: "220px" }} variant='contained'><AddIcon /> Lưu dữ liệu</Button>
                </div>
            </form>

            <div className='mt-6'>
                <div>
                    <form className='mt-2 px-4 py-4 bg-slate-200 rounded-md md:bg-white' onSubmit={(e) => handleSearch(e)}>
                        <h5 className='font-bold'><SearchIcon /> Tra cứu tài khoản</h5>
                        <div className='flex flex-col md:flex-row md:items-center flex-wrap'>
                            <div className='flex-col flex md:basis-1/3 px-2'>
                                <label className='text-[14px] font-semibold'> Tên tài khoản: </label>
                                <input value={tentaikhoan} name='tentaikhoanSearch' onChange={(e) => setTentaikhoan(e.target.value)} type="text" className='outline-none my-2 border rounded-md p-2 px-3 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                            </div>
                            <div className='flex-col flex basis-1/3 px-2'>
                                <label className='text-[14px] font-semibold'> Cấp tài khoản: </label>
                                <select value={taikhoancap} onChange={(e) => setTaikhoancap(e.target.value)} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'>
                                    <option value="">Tất cả</option>
                                    <option value="Cấp Phòng">Cấp Phòng</option>
                                    <option value="Cấp Xã">Cấp Xã</option>
                                </select>
                            </div>
                            <div className='flex-col flex basis-1/3 px-2'>
                                <label className='text-[14px] font-semibold'> Khối: </label>
                                <select value={khoi} onChange={(e) => setKhoi(e.target.value)} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'>
                                    <option value="">Tất cả</option>
                                    {khois.map(i => <option key={i._id} value={i._id}>{i.tenkhoi}</option>)}
                                </select>
                            </div>

                        </div>
                        <div className='md:space-x-2 space-y-2 mt-2 md:space-y-0 md:block flex flex-col items-center'>
                            <Button type='submit' size='small' sx={{ width: "220px" }} variant='contained'><SearchIcon /> Tìm kiếm</Button>
                        </div>
                    </form>
                </div>
                <h4 className='text-center my-4 uppercase'>Danh sách tài khoản người dùng</h4>
                <div className='my-4 text-end'>
                    <Button variant='contained' size='small' onClick={() => downloadWord()}><PrintIcon /> Tải xuống danh sách tài khoản</Button>
                </div>
                <TableComponents
                    list={accounts}
                    onClickOpenDialogDelete={handleOpenDialogDelete}
                    onClickOpenDialogEdit={handleOpenDialogEdit}
                    onClickHandleConfirmNhan={handleConfirmNhan}
                />
            </div>

            <ModalEditComponent
                open={openDialogEdit.status}
                item={openDialogEdit.item}
                onCloseDialogEdit={handleCloseDialogEdit}
                onSubmit={handleSubmitEdit}
                khois={khois}
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

export default UserSystem