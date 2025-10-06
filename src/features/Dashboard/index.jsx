import React, { useState, useEffect } from 'react'
import MenuParent from './components/MenuParent';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FolderIcon from '@mui/icons-material/Folder';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PixIcon from '@mui/icons-material/Pix';
import Person3Icon from '@mui/icons-material/Person3';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import StarIcon from '@mui/icons-material/Star';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Person4Icon from '@mui/icons-material/Person4';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Marquee from "react-fast-marquee";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssistantIcon from '@mui/icons-material/Assistant';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';
import LanIcon from '@mui/icons-material/Lan';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ModalLoading from '../../components/ModalLoading';
import notificationApi from '../../api/notificationApi';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import FlagIcon from '@mui/icons-material/Flag';
import WindowIcon from '@mui/icons-material/Window';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuBook from '@mui/icons-material/MenuBook';
import ManIcon from '@mui/icons-material/Man';
import WarningIcon from '@mui/icons-material/Warning';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import SpokeIcon from '@mui/icons-material/Spoke';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ReviewsIcon from '@mui/icons-material/Reviews';
import BarChartIcon from '@mui/icons-material/BarChart';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { logoutAccount } from '../../auth/authSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import DialogChangePassword from './components/DialogChangePassword';
import authApi from '../../api/authApi';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import './index.css'
import CoPresentIcon from '@mui/icons-material/CoPresent';
import ElevatorIcon from '@mui/icons-material/Elevator';
import canboApi from '../../api/canboApi';

const renderMenu = (vaitro, count1, count2, count3) => {
  if (vaitro === "Quản trị hệ thống") {
    return (
      <>
        <li className='rounded-md'>
          <MenuParent groupName="Quản trị hệ thống" iconGroup={<ManageAccountsIcon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
            options={[
              { name: "Quản lý tài khoản hệ thống", icon: <SupervisorAccountIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/users" },
              { name: "Quản lý khối, hệ, lực lượng", icon: <FolderIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/khoi" },
              { name: "Quản lý hình ảnh nổi bật", icon: <VpnKeyIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/anh-noi-bat" },
              { name: "Quản lý thông báo", icon: <NotificationsIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/notification" },
              { name: "Quản lý cấp khen thưởng", icon: <VolunteerActivismIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/cap-khen-thuong" },
              { name: "Quản lý hình thức khen", icon: <PivotTableChartIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/hinh-thuc-khen" },
              { name: "Quản lý bậc hàm", icon: <MilitaryTechIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bac-ham" },
              { name: "Quản lý chức vụ", icon: <LocalActivityIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/chuc-vu" },
              { name: "QL cán bộ bị xóa mức 1", icon: <VerifiedUserIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/delete-doan-vien" },
              { name: "QL cán bộ chuyển tỉnh khác", icon: <CoPresentIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/doan-vien-chuyen-cong-tac-dia-phuong-khac" },
              { name: "Lịch sử hệ thống phần mềm", icon: <CoPresentIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/lich-su-he-thong" },
            ]}
          />
        </li>
        <li className='rounded-md'>
          <MenuParent groupName="Thống kê, báo cáo" iconGroup={<LeaderboardIcon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
            options={[
              { name: "Trang chủ", icon: <MilitaryTechIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/home" },
              { name: "Tra cứu cán bộ, chiến sĩ", icon: <SearchIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/tra-cuu-can-bo" },
              { name: "Đơn vị chưa cập nhật thi đua tháng", icon: <CoronavirusIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/don-vi-chua-cap-nhat-thi-dua-thang" },
              { name: "Danh hiệu thi đua tập thể", icon: <EmojiEmotionsIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/danh-hieu-thi-dua" },
              { name: "Khen thưởng cán bộ đang công tác", icon: <BarChartIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/khen-thuong" },
              { name: "Khen thưởng theo khoảng thời gian", icon: <MicrosoftIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/khen-thuong-theo-thoi-gian" },
              { name: "Vi phạm kỉ luật", icon: <ReviewsIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/ki-luat" },
              { name: "Thi đua tháng cán bộ đang công tác", icon: <SchoolIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-thang" },
              { name: "Tổng hợp kết quả thi đua tháng", icon: <SpokeIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-thang-theo-thoi-gian" },
              { name: "Thi đua năm cán bộ đang công tác", icon: <ViewInArIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-nam" },
              { name: "Tổng hợp kết quả thi đua năm", icon: <MenuBookIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-nam-theo-nam" },
              { name: "Xếp loại đảng viên đang công tác", icon: <MoveDownIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/xep-loai-dang-vien" },
              { name: "Tổng hợp xếp loại đảng viên năm", icon: <PixIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/xep-loai-dang-vien-cac-nam" }
            ]}
          />
        </li>
      </>
    )
  } else if (vaitro === "Quản trị thông thường") {
    return (
      <>
        <li className='rounded-md'>
          <MenuParent groupName="Quản lý cán bộ, chiến sĩ" iconGroup={<Person3Icon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
            options={[
              { name: "Quản lý tổ, đội", icon: <DashboardIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/doi" },
              { name: "Thêm mới cán bộ, chiến sĩ", icon: <PersonAddIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/them-moi-can-bo" },
              { name: "Quản lý cán bộ, chiến sĩ", icon: <RecentActorsIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/quan-tri-can-bo" },
              { name: "Yêu cầu tiếp nhận cán bộ", quanlity: count1, icon: <AssistantIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/yeu-cau-tiep-nhan" },
              { name: "Danh sách cán bộ bị từ chối", quanlity: count2, icon: <DoNotDisturbOffIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/list/yeu-cau-bi-tu-choi" },
              { name: "Cán bộ từng công tác tại đơn vị", icon: <ElevatorIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/can-bo-tung-cong-tac-da-chuyen-di" },
              { name: "Cán bộ đang đợi xác nhận", quanlity: count3, icon: <DonutSmallIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/list-can-bo-dang-cho-chuyen-di" },
            ]}
          />
        </li>
        <li className='rounded-md'>
          <MenuParent groupName="Quản lý khen thưởng, kỉ luật" iconGroup={<WidgetsIcon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
            options={[
              { name: "Khen thưởng tập thể", icon: <MenuBook sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/khen-thuong-tap-the" },
              { name: "khen thưởng cá nhân", icon: <ManIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/khen-thuong-ca-nhan" },
              { name: "Kỉ luật cá nhân", icon: <WarningIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/ki-luat-ca-nhan" },
            ]}
          />
        </li>
        <li className='rounded-md'>
          <MenuParent groupName="Quản lý thi đua" iconGroup={<FlagIcon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
            options={[
              { name: "Danh hiệu thi đua tập thể", icon: <FlagIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/danh-hieu-thi-dua" },
              { name: "Thi đua tháng", icon: <FlagIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/thi-dua-thang" },
              { name: "Thi đua năm", icon: <WindowIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/thi-dua-nam" },
              { name: "Xếp loại đảng viên", icon: <LanIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/xep-loai-dang-vien" }
            ]}
          />
        </li>
        <li className='rounded-md'>
          <MenuParent groupName="Thống kê, báo cáo" iconGroup={<LeaderboardIcon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
            options={[
              { name: "Trang chủ", icon: <MilitaryTechIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/home" },
              { name: "Tra cứu cán bộ, chiến sĩ", icon: <SearchIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/tra-cuu-can-bo" },
              { name: "Khen thưởng cán bộ đang công tác", icon: <BarChartIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/khen-thuong" },
              { name: "Khen thưởng theo khoảng thời gian", icon: <MicrosoftIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/khen-thuong-theo-thoi-gian" },
              { name: "Vi phạm kỉ luật", icon: <ReviewsIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/ki-luat" },
              { name: "Thi đua tháng cán bộ đang công tác", icon: <SchoolIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-thang" },
              { name: "Tổng hợp kết quả thi đua tháng", icon: <SpokeIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-thang-theo-thoi-gian" },
              { name: "Thi đua năm cán bộ đang công tác", icon: <ViewInArIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-nam" },
              { name: "Tổng hợp kết quả thi đua năm", icon: <MenuBookIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-nam-theo-nam" },
              { name: "Xếp loại đảng viên đang công tác", icon: <MoveDownIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/xep-loai-dang-vien" },
              { name: "Tổng hợp xếp loại đảng viên năm", icon: <PixIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/xep-loai-dang-vien-cac-nam" }
            ]}
          />
        </li>
      </>
    )
  } else if (vaitro === "Theo dõi, thống kê") {
    return (
      <>
        <li className='rounded-md'>
          <MenuParent groupName="Thống kê, báo cáo" iconGroup={<LeaderboardIcon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
            options={[
              { name: "Trang chủ", icon: <MilitaryTechIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/home" },
              { name: "Tra cứu cán bộ, chiến sĩ", icon: <SearchIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/tra-cuu-can-bo" },
              // { name: "Đơn vị chưa cập nhật thi đua tháng", icon: <CoronavirusIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/don-vi-chua-cap-nhat-thi-dua-thang" },
              // { name: "Danh hiệu thi đua tập thể", icon: <EmojiEmotionsIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/danh-hieu-thi-dua" },
              { name: "Khen thưởng cán bộ đang công tác", icon: <BarChartIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/khen-thuong" },
              { name: "Khen thưởng theo khoảng thời gian", icon: <MicrosoftIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/khen-thuong-theo-thoi-gian" },
              { name: "Vi phạm kỉ luật", icon: <ReviewsIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/ki-luat" },
              { name: "Thi đua tháng cán bộ đang công tác", icon: <SchoolIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-thang" },
              { name: "Tổng hợp kết quả thi đua tháng", icon: <SpokeIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-thang-theo-thoi-gian" },
              { name: "Thi đua năm cán bộ đang công tác", icon: <ViewInArIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-nam" },
              { name: "Tổng hợp kết quả thi đua năm", icon: <MenuBookIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-nam-theo-nam" },
              { name: "Xếp loại đảng viên đang công tác", icon: <MoveDownIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/xep-loai-dang-vien" },
              { name: "Tổng hợp xếp loại đảng viên năm", icon: <PixIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/xep-loai-dang-vien-cac-nam" }
            ]}
          />
        </li>
      </>
    )
  }
}


const Dashboard = ({ user }) => {

  if (!user) {
    return <Navigate to='/login' replace />;
  };

  const vaitro = useSelector(state => state.authReducer.vaitro_theodoithidua)

  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [openChangePass, setOpenChangePass] = useState(false);
  const location = useLocation();

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  useEffect(() => {
    const fetch = async () => {
      // console.log('location')
      try {
        const [res1, res2, res3] = await Promise.all([
          canboApi.fetchCanboYeucauTiepnhan(),
          canboApi.fetchListBiTuchoi(),
          canboApi.fetchCanboDangDoiChuyenCongtac()
        ]);

        let data1 = res1.data.length;
        let data2 = res2.data.length;
        let data3 = res3.data.length;
        // console.log(data1)
        setCount1(data1)
        setCount2(data2)
        setCount3(data3)
      } catch (error) {
        console.log(error);
        toast.error("Lỗi xảy ra khi đăng xuất tài khoản", {
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
    };

    fetch()
  }, [location])
  //fetch notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await notificationApi.getNotifications({ thongbao: '' });

        setNotifications(res.data);
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

      }
    };

    fetchData();
  }, []);

  const handleChangeNotifications = (data) => {
    let items = data.filter(i => i.status === true);
    setNotifications(items)
  };

  const handleLoading = (boolane) => {
    setLoading(boolane)
  };

  const roles = useSelector((state) => state.authReducer.roles_quanlydoanvien);
  const id_user = useSelector((state) => state.authReducer.id_user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const action = logoutAccount();
    try {
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);
      Cookies.remove("refreshToken_quanlydoanvien");
      navigate("/login");
      toast.success("Đăng xuất tài khoản thành công.", {
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
      console.log(error);
      toast.error("Lỗi xảy ra khi đăng xuất tài khoản", {
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
  };

  const handleSubmitChangePass = async (values) => {
    const action = logoutAccount();
    try {
      await authApi.changePass({ ...values, id: id_user });
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);
      Cookies.remove("refreshToken_quanlydoanvien");
      navigate("/login");
      toast.success("Đổi mật khẩu thành công,. Vui lòng đăng nhập lại", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Cookies.remove("refreshToken_quanlydoanvien");
      navigate("/login");
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
  };

  const handleCloseDialogChangePass = () => {
    setOpenChangePass(false)
  };

  const handleCountListTiepnhan = async () => {
    try {
      let res = await canboApi.fetchCanboYeucauTiepnhan();
      setCount1(res.data.length)
    } catch (error) {
      console.log(error.message)
    }
  };
  const handleCountListTuchoi = async () => {
    try {
      let res = await canboApi.fetchListBiTuchoi();
      setCount2(res.data.length)
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleCountListDangDoiTiepnhan = async () => {
    try {
      let res = await canboApi.fetchCanboDangDoiChuyenCongtac();
      setCount3(res.data.length)
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div>
      {/* menu  */}
      <div className='w-[280px] bg-red-600 border-r border-t border-white min-h-screen fixed'>
        <div className='flex justify-between bg-[#750505] items-center px-2 py-2 shadow-sm border-b border-yellow-400'>
          <div className='flex items-center space-x-2'>
            <img src="/cong-an-hieu.png"
              alt="logo" className='w-12' />
            <div className='flex flex-col items-center'>
              <span className='text-white uppercase font-bold text-sm'>Công an tỉnh Hưng Yên</span>
            </div>
          </div>
        </div>
        <ul className='py-2 h-[100vh] overflow-y-scroll no-scrollbar pb-20'>
          {/* <li className='rounded-md'>
            <MenuParent groupName="Quản trị hệ thống" iconGroup={<ManageAccountsIcon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
              options={[
                { name: "Quản lý tài khoản hệ thống", icon: <SupervisorAccountIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/users" },
                { name: "Quản lý khối, hệ, lực lượng", icon: <FolderIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/khoi" },
                { name: "Quản lý hình ảnh nổi bật", icon: <VpnKeyIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/anh-noi-bat" },
                { name: "Quản lý thông báo", icon: <NotificationsIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/notification" },
                { name: "Quản lý cấp khen thưởng", icon: <VolunteerActivismIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/cap-khen-thuong" },
                { name: "Quản lý hình thức khen", icon: <PivotTableChartIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/hinh-thuc-khen" },
                { name: "Quản lý bậc hàm", icon: <MilitaryTechIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bac-ham" },
                { name: "Quản lý chức vụ", icon: <LocalActivityIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/chuc-vu" },
                { name: "QL cán bộ bị xóa mức 1", icon: <VerifiedUserIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/delete-doan-vien" },
                { name: "QL cán bộ chuyển tỉnh khác", icon: <CoPresentIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/doan-vien-chuyen-cong-tac-dia-phuong-khac" },
                { name: "Lịch sử hệ thống phần mềm", icon: <CoPresentIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/lich-su-he-thong" },
              ]}
            />
          </li>
          <li className='rounded-md'>
            <MenuParent groupName="Quản lý cán bộ, chiến sĩ" iconGroup={<Person3Icon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
              options={[
                { name: "Quản lý tổ, đội", icon: <DashboardIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/doi" },
                { name: "Thêm mới cán bộ, chiến sĩ", icon: <PersonAddIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/them-moi-can-bo" },
                { name: "Quản lý cán bộ, chiến sĩ", icon: <RecentActorsIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/quan-tri-can-bo" },
                { name: "Yêu cầu tiếp nhận cán bộ", quanlity: count1, icon: <AssistantIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/yeu-cau-tiep-nhan" },
                { name: "Danh sách cán bộ bị từ chối", quanlity: count2, icon: <DoNotDisturbOffIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/list/yeu-cau-bi-tu-choi" },
                { name: "Cán bộ từng công tác tại đơn vị", icon: <ElevatorIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/can-bo-tung-cong-tac-da-chuyen-di" },
                { name: "Cán bộ đang đợi xác nhận", quanlity: count3, icon: <DonutSmallIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/list-can-bo-dang-cho-chuyen-di" },
              ]}
            />
          </li>
          <li className='rounded-md'>
            <MenuParent groupName="Quản lý khen thưởng, kỉ luật" iconGroup={<WidgetsIcon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
              options={[
                { name: "Khen thưởng tập thể", icon: <MenuBook sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/khen-thuong-tap-the" },
                { name: "khen thưởng cá nhân", icon: <ManIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/khen-thuong-ca-nhan" },
                { name: "Kỉ luật cá nhân", icon: <WarningIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/ki-luat-ca-nhan" },
              ]}
            />
          </li>
          <li className='rounded-md'>
            <MenuParent groupName="Quản lý thi đua" iconGroup={<FlagIcon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
              options={[
                { name: "Danh hiệu thi đua tập thể", icon: <FlagIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/danh-hieu-thi-dua" },
                { name: "Thi đua tháng", icon: <FlagIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/thi-dua-thang" },
                { name: "Thi đua năm", icon: <WindowIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/thi-dua-nam" },
                { name: "Xếp loại đảng viên", icon: <LanIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/xep-loai-dang-vien" }
              ]}
            />
          </li>
          <li className='rounded-md'>
            <MenuParent groupName="Thống kê, báo cáo" iconGroup={<LeaderboardIcon sx={{ color: '#fff', fontSize: '32px', paddingLeft: "4px" }} />}
              options={[
                { name: "Trang chủ", icon: <MilitaryTechIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/home" },
                { name: "Tra cứu cán bộ, chiến sĩ", icon: <SearchIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/tra-cuu-can-bo" },
                { name: "Đơn vị chưa cập nhật thi đua tháng", icon: <CoronavirusIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/don-vi-chua-cap-nhat-thi-dua-thang" },
                { name: "Danh hiệu thi đua tập thể", icon: <EmojiEmotionsIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/danh-hieu-thi-dua" },
                { name: "Khen thưởng cán bộ đang công tác", icon: <BarChartIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/khen-thuong" },
                { name: "Khen thưởng theo khoảng thời gian", icon: <MicrosoftIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/khen-thuong-theo-thoi-gian" },
                { name: "Vi phạm kỉ luật", icon: <ReviewsIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/ki-luat" },
                { name: "Thi đua tháng cán bộ đang công tác", icon: <SchoolIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-thang" },
                { name: "Tổng hợp kết quả thi đua tháng", icon: <SpokeIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-thang-theo-thoi-gian" },
                { name: "Thi đua năm cán bộ đang công tác", icon: <ViewInArIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-nam" },
                { name: "Tổng hợp kết quả thi đua năm", icon: <MenuBookIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/thi-dua-nam-theo-nam" },
                { name: "Xếp loại đảng viên đang công tác", icon: <MoveDownIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/xep-loai-dang-vien" },
                { name: "Tổng hợp xếp loại đảng viên năm", icon: <PixIcon sx={{ color: "white", fontSize: "24px" }} />, link: "/dashboard/bao-cao/xep-loai-dang-vien-cac-nam" }
              ]}
            />
          </li> */}
          {renderMenu(vaitro, count1, count2, count3)}
        </ul>
      </div>
      {/* end menu  */}

      <div className='ml-[286px] relative '>
        <div className='flex justify-between  sticky z-10 top-0 right-0 left-0 bg-[#750505] h-[60px] items-center px-4 space-x-2'>

          <div>
            <StarIcon sx={{ fontSize: "32px", color: "yellow" }} />
          </div>

          <div className='w-0 md:w-[250px] lg:w-[600px] xl:w-[800px] flex items-center py-2 rounded-md'>
            {notifications.length > 0 && (
              <Marquee pauseOnHover={true} speed={100}>
                {notifications.map(notification => (
                  <span key={notification._id} className='ml-[400px] text-lg text-yellow-300 font-bold hover:cursor-default font-arial uppercase'>{notification.thongbao}</span>
                ))}
              </Marquee>
            )}
          </div>

          <div className='flex space-x-3 items-center hover:cursor-pointer'
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            <div className='border w-10 h-10 justify-center items-center flex rounded-full'>
              <Person4Icon sx={{ fontSize: "28px", color: "#fff" }} />
            </div>
            <span className='text-white'><span className='text-lg'>{user.toUpperCase()}</span></span>
          </div>

        </div>

        <ModalLoading open={loading} />
        <div className='pt-[12px] pb-12'>
          <Outlet context={[handleChangeNotifications, handleLoading, handleCountListTiepnhan, handleCountListTuchoi, handleCountListDangDoiTiepnhan]} />
        </div>
      </div>
      <div className='bg-[#992020] fixed right-0 w-[calc(100%_-_286px)] bottom-0 shadow-lg shadow-gray-300 pl-4 py-2'>
        <h4 className='text-[#ffcd38]'>Phần mềm quản lý, theo dõi công tác cán bộ và tổng hợp, theo dõi
          công tác thi đua, khen thưởng, kỉ luật của tập thể và cá nhân theo mô hình tổ chức mới</h4>
        <p className='text-[#ffcd38] text-sm'>@2026 - Bản quyền thuộc về Công an tỉnh Hưng Yên</p>
        <p className='text-[#ffcd38] text-sm'>Nghiên cứu, xây dựng, phát triển phần mềm: Vũ Văn Tính</p>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
          setOpenChangePass(true)
          handleClose()
        }}> <KeyIcon style={{ marginRight: "8px" }} /> Đổi mật khẩu</MenuItem>
        <MenuItem onClick={handleLogout}><LogoutIcon style={{ marginRight: "8px" }} /> Đăng xuất tài khoản</MenuItem>
      </Menu>

      <DialogChangePassword
        open={openChangePass}
        onSubmit={handleSubmitChangePass}
        onCloseDialogChangePass={handleCloseDialogChangePass}
      />
    </div>
  )
}

export default Dashboard
