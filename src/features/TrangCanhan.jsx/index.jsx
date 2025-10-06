import React, { useMemo, useState, useEffect } from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import TableKhenthuong from './components/TableKhenthuong';
import TableKiluat from './components/TableKiluat';
import TableThidua from './components/TableThiduanam';
import canboApi from '../../api/canboApi';
import dayjs from 'dayjs';
import StepComponent from './components/StepComponent';
import "./index.css"
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
const TrangCanhan = () => {
    const [handleChangeNotifications, handleLoading] = useOutletContext();
    let { id } = useParams();

    const [doanvien, setDoanvien] = useState(null);
    const [khenthuongs, setKhenthuongs] = useState([]);
    const [kiluats, setKiluats] = useState([]);
    const [thiduas, setThiduas] = useState([]);
    const [quatrinhcongtacs, setQuatrinhcongtacs] = useState([]);
    const [quatrinhbachams, setQuatrinhBachams] = useState([]);
    const [quatrinhchucvus, setQuatrinhchucvus] = useState([]);
    const navigate = useNavigate();
    //fetch notifications
    useEffect(() => {
        const fetchData = async () => {
            try {
                handleLoading(true)
                let res = await canboApi.detailDoanvien(id);
                handleLoading(false)
                setDoanvien(res.data.doanvien[0]);
                setKhenthuongs(res.data.khenthuongs);
                setQuatrinhBachams(res.data.quatrinhlenham.map(i => ({
                    date: dayjs(i.tungay).format('DD/MM/YYYY'),
                    label: i.bacham.bacham,
                    ghichu: i.ghichu
                })))
                setQuatrinhcongtacs(res.data.quatrinhcongtac.map(i => ({
                    date: dayjs(i.tungay).format('DD/MM/YYYY'),
                    label: i.donvi.tendoi + " - " + i.donvi.donvi.tenhienthi,
                    ghichu: i.ghichu
                })))
                setQuatrinhchucvus(res.data.quatrinhchucvu.map(i => ({
                    date: dayjs(i.tungay).format('DD/MM/YYYY'),
                    label: i.chucvu.chucvu,
                    ghichu: i.ghichu
                })))
                setKiluats(res.data.kiluats);
                setThiduas(res.data.thiduas);
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

        fetchData();
    }, [id]);

    const roles = useSelector((state) => state.authReducer.roles_theodoithidua);

    return (
        <div data-aos="fade-left" data-aos-once="true">
            <div className='my-2'>
                <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Thông tin chi tiết cá nhân của cán bộ, chiến sĩ</h4>
            </div>
            <div className='flex items-start shadow-gray-400 shadow-md py-2'>
                <ul className='p-4 flex flex-col flex-1 '>
                    <li className='md:basis-1/3 my-1 flex space-x-4 pr-8 border-r-slate-100'><span className='font-semibold'>Họ tên:</span> <span>{doanvien?.hoten}</span></li>
                    <li className='md:basis-1/3 my-1 flex space-x-4 pr-8 border-r-slate-100'><span className='font-semibold'>Ngày sinh:</span> <span>{dayjs(doanvien?.ngaysinh).format('DD/MM/YYYY')}</span></li>
                    <li className='md:basis-1/3 my-1 flex space-x-4 pr-8 border-r-slate-100'><span className='font-semibold'>Đảng viên:</span> <span>{doanvien?.dangvien === true ? "Là đảng viên" : "Chưa kết nạp đảng"}</span></li>
                    <li className='md:basis-1/3 my-1 flex space-x-4 pr-8 border-r-slate-100'><span className='font-semibold'>Cấp bậc hàm:</span> <span>{doanvien?.bachamPopulate[0].bacham}</span></li>
                    {doanvien?.nghihuu === false && (<>
                        <li className='md:basis-1/3 my-1 flex space-x-4 pr-8 border-r-slate-100'><span className='font-semibold'>Chức vụ:</span> <span>{doanvien?.chucvuPopulate[0].chucvu}</span></li>
                        <li className='md:basis-1/3 my-1 flex space-x-4 pr-8 border-r-slate-100'><span className='font-semibold'>Đơn vị đang công tác:</span> <span>{doanvien?.chuyencongtacngoaitinh === true ? doanvien?.donvidiaphuongkhac.tenkhoi : <span>{doanvien?.donviPopulate[0].tendoi} - {doanvien?.donviPopulate[0].donvi.tenhienthi}</span>}</span></li>

                    </>)}
                    {doanvien?.dangvien === true && (
                        <li className='md:basis-1/3 my-1 flex space-x-4 pr-8 border-r-slate-100'><span className='font-semibold'>Ngày vào đảng:</span> <span>{dayjs(doanvien?.ngayvaodang).format('DD/MM/YYYY')}</span></li>
                    )}
                    {doanvien?.nghihuu === true && (
                        <li className='md:basis-1/3 my-1 flex space-x-4 pr-8 border-r-slate-100'><span className='font-semibold'>Nghỉ hưu (xuất ngũ) ngày:</span> <span>{dayjs(doanvien?.ngaynghihuu).format('DD/MM/YYYY')}</span></li>
                    )}
                    <li className='md:basis-1/3 my-1 flex space-x-4 pr-8 border-r-slate-100'><span className='font-semibold'>Tổng số lượt được khen thưởng:</span> <span>{khenthuongs.length} lượt</span></li>
                    <li className='md:basis-1/3 my-1 flex space-x-4 pr-8 border-r-slate-100'><span className='font-semibold'>Tổng số lượt bị kỉ luật:</span> <span>{kiluats.length} lượt</span></li>
                </ul>
                <div>
                    <img src={doanvien?.gioitinh === "Nam" ? "/namcongan.png" : "/anhnucongan.png"} alt="avatar" className='shadow-md shadow-gray-500' />
                </div>
            </div>

            <div className='mt-8 shadow-md shadow-gray-400'>
                <div className='px-4 flex items-center space-x-1'>
                    <MilitaryTechIcon style={{ color: "red", fontSize: "32px" }} />
                    <h5 className='font-semibold'>Quá trình thay đổi cấp bậc quân hàm</h5>
                </div>
                <StepComponent array={quatrinhbachams} />
                <div className='px-4 flex items-center space-x-1'>
                    <LocalActivityIcon style={{ color: "red", fontSize: "32px" }} />
                    <h5 className='font-semibold'>Quá trình thay đổi chức vụ công tác</h5>
                </div>
                <StepComponent array={quatrinhchucvus} />

                <div className='px-4 flex items-center space-x-1'>
                    <TransferWithinAStationIcon style={{ color: "red", fontSize: "32px" }} />
                    <h5 className='font-semibold'>Quá trình thay đổi đơn vị công tác</h5>
                </div>
                <StepComponent array={quatrinhcongtacs} />
            </div>

            {khenthuongs.length > 0 && (
                <div className='px-2 my-8'>
                    <h4 className='my-2 text-center text-blue-600 text-lg'>Danh sách khen thưởng của cá nhân</h4>
                    <TableKhenthuong list={khenthuongs} />
                </div>
            )}

            {kiluats.length > 0 && (
                <div className='px-2 my-8'>
                    <h4 className='my-2 text-center text-blue-600 text-lg'>Danh sách kết quả kỉ luật cá nhân</h4>
                    <TableKiluat list={kiluats} />
                </div>
            )}
            {thiduas.length > 0 && (

                <div className='px-2 my-8' data-aos="fade-left" data-aos-once="true">
                    <h4 className='my-2 text-center text-blue-600 text-lg'>Bảng theo dõi xếp loại thi đua qua các năm</h4>
                    <TableThidua list={thiduas} dangvien={doanvien.dangvien} />
                </div>
            )}


        </div>
    )
}

export default TrangCanhan
