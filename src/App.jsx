import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingComponent from "./components/LoadingComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import NotFound from "./components/NotFound";
import Chuyentrang from "./components/Chuyentrang.jsx";
// import Hoatdongdoanvien from "./features/HoatdongDoanvien/index.jsx";
// import UserSystem from "./features/Users/index.jsx";
// import QuanlyYeucauTiepnhanCanbo from "./features/Canbo/pages/QuanlyYeucauTiepnhanCanbo.jsx";
// import QuanlyYeucauTuchoiCanbo from "./features/Canbo/pages/QuanlyYeucauTuchoi.jsx";
// import CapkhenthuongComponent from "./features/Capkhenthuong/index.jsx";
// import HinhthuckhenComponent from "./features/Hinhthuckhen/index.jsx";
// import Danhhieuthidua from "./features/Danhhieuthidua/pages/Danhhieuthidua.jsx";
// import Xeploaidangvien from "./features/Thidua/pages/Xeploaidangvien.jsx";
// import TonghopThiduathang from "./features/Thongke/pages/TonghopThiduathang.jsx";
// import KhenthuongThongkeTheoThoigian from "./features/Thongke/pages/KhenthuongThongkeTheoThoigian.jsx";
// import TonghopThiduanam from "./features/Thongke/pages/TonghopThiduanam.jsx";
// import ThiduanamDangvienThongke from "./features/Thongke/pages/ThiduanamDangvienThongke.jsx";
// import TonghopXeploaiDangvien from "./features/Thongke/pages/TonghopXeploaiDangvien.jsx";
// import DanhhieuthiduaThongke from "./features/Thongke/pages/DanhhieuthiduaThongke.jsx";
// import ImagePage from "./features/Image/index.jsx";
// import SlidesComponent from "./features/Slides/index.jsx";
// import CanboDatungCongtac from "./features/CanboDatungCongtac/index.jsx";
// import CanboDangYeucauChuyendi from "./features/CanboDangYeucauChuyendi/index.jsx";
// import Home from "./features/Home/index.jsx";
// import HisorySystem from "./features/HistorySystem/index.jsx";
// import ReportChuaSaveThiduathang from "./features/ReportChuaSaveThiduathang/index.jsx";
// import TracuuCanbo from "./features/TracuuCanbo/index.jsx";

const Login = lazy(() => import("./features/Login"));
const UserSystem = lazy(() => import("./features/Users/index.jsx"));
const QuanlyYeucauTiepnhanCanbo = lazy(() => import("./features/Canbo/pages/QuanlyYeucauTiepnhanCanbo.jsx"));
const QuanlyYeucauTuchoiCanbo = lazy(() => import("./features/Canbo/pages/QuanlyYeucauTuchoi.jsx"));
const CapkhenthuongComponent = lazy(() => import("./features/Capkhenthuong/index.jsx"));
const HinhthuckhenComponent = lazy(() => import("./features/Hinhthuckhen/index.jsx"));
const Danhhieuthidua = lazy(() => import("./features/Danhhieuthidua/pages/Danhhieuthidua.jsx"));
const Xeploaidangvien = lazy(() => import("./features/Thidua/pages/Xeploaidangvien.jsx"));
const TonghopThiduathang = lazy(() => import("./features/Thongke/pages/TonghopThiduathang.jsx"));
const KhenthuongThongkeTheoThoigian = lazy(() => import("./features/Thongke/pages/KhenthuongThongkeTheoThoigian.jsx"));
const TonghopThiduanam = lazy(() => import("./features/Thongke/pages/TonghopThiduanam.jsx"));
const ThiduanamDangvienThongke = lazy(() => import("./features/Thongke/pages/ThiduanamDangvienThongke.jsx"));
const TonghopXeploaiDangvien = lazy(() => import("./features/Thongke/pages/TonghopXeploaiDangvien.jsx"));
const DanhhieuthiduaThongke = lazy(() => import("./features/Thongke/pages/DanhhieuthiduaThongke.jsx"));
const ImagePage = lazy(() => import("./features/Image/index.jsx"));
const SlidesComponent = lazy(() => import("./features/Slides/index.jsx"));
const CanboDatungCongtac = lazy(() => import("./features/CanboDatungCongtac/index.jsx"));
const CanboDangYeucauChuyendi = lazy(() => import("./features/CanboDangYeucauChuyendi/index.jsx"));
const Home = lazy(() => import("./features/Home/index.jsx"));
const HisorySystem  = lazy(() => import("./features/HistorySystem/index.jsx"));
const ReportChuaSaveThiduathang= lazy(() => import("./features/ReportChuaSaveThiduathang/index.jsx"));
const TracuuCanbo = lazy(() => import("./features/TracuuCanbo/index.jsx"));
const Dashboard = lazy(() => import("./features/Dashboard"));
const NotificationComponent = lazy(() => import("./features/Notifications"));
const Roles = lazy(() => import("./features/Roles"));
const Capbacs = lazy(() => import("./features/Capbac"));
const Chucvus = lazy(() => import("./features/Chucvu"));
const Accounts = lazy(() => import("./features/Account"));
const KhoiComponent = lazy(() => import("./features/Khoi"));
const Donvis = lazy(() => import("./features/Donvi"));
const Conganxas = lazy(() => import("./features/Conganxa"));
const Chidoans = lazy(() => import("./features/Chidoan"));
const Quanlycanbos = lazy(() => import("./features/Canbo/pages/Quanlycanbo"));
const Quantridoanvien = lazy(() => import("./features/Canbo/pages/Quantridoanvien"));
const Khentapthe = lazy(() => import("./features/Khenthuong/pages/Khentapthe"));
const Khencanhan = lazy(() => import("./features/Khenthuong/pages/KhenCanhan"));
const KiluatCanhan = lazy(() => import("./features/Khenthuong/pages/KiluatCanhan"));
const Thiduathang = lazy(() => import("./features/Thidua/pages/Thiduathang"));
const Thiduanam = lazy(() => import("./features/Thidua/pages/Thiduanam"));
const KhenthuongThongke= lazy(() => import("./features/Thongke/pages/KhenthuongThongke"));
const KiluatThongke= lazy(() => import("./features/Thongke/pages/KiluatThongke"));
const ThiduathangThongke= lazy(() => import("./features/Thongke/pages/ThiduathangThongke"));
const ThiduanamThongke= lazy(() => import("./features/Thongke/pages/ThiduanamThongke"));
const TruongthanhdoanThongke= lazy(() => import("./features/Thongke/pages/TruongthanhdoanThongke"));
const DoanvienDelete= lazy(() => import("./features/Canbo/pages/DoanvienDelete"));
const TrangCanhan= lazy(() => import("./features/TrangCanhan.jsx"));
const DoanvienNgoaitinh = lazy(() => import("./features/Doanvienchuyenngoaitinh/index.jsx"));

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const user= useSelector((state) => state.authReducer);

  return (
    <Suspense fallback={<Chuyentrang />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/" element={<Dashboard user={user.user}/>}>
          <Route path="notification" element={<NotificationComponent />} />
          <Route path="users" element={<UserSystem />} />
          <Route path="roles" element={<Roles />} />
          <Route path="bac-ham" element={<Capbacs />} />
          <Route path="chuc-vu" element={<Chucvus />} />
          <Route path="tai-khoan" element={<Accounts />} />
          <Route path="khoi" element={<KhoiComponent />} />
          <Route path="don-vi" element={<Donvis />} />
          <Route path="doi" element={<Conganxas />} />
          <Route path="chi-doan" element={<Chidoans />} />
          <Route path="them-moi-can-bo" element={<Quanlycanbos />} />
          <Route path="quan-tri-can-bo" element={<Quantridoanvien />} />
          <Route path="khen-thuong-tap-the" element={<Khentapthe />} />
          <Route path="khen-thuong-ca-nhan" element={<Khencanhan />} />
          <Route path="ki-luat-ca-nhan" element={<KiluatCanhan />} />
          <Route path="thi-dua-thang" element={<Thiduathang />} />
          <Route path="thi-dua-nam" element={<Thiduanam />} />
          <Route path="bao-cao/khen-thuong" element={<KhenthuongThongke />} />
          <Route path="bao-cao/ki-luat" element={<KiluatThongke />} />
          <Route path="bao-cao/thi-dua-thang" element={<ThiduathangThongke />} />
          <Route path="bao-cao/thi-dua-nam" element={<ThiduanamThongke />} />
          <Route path="bao-cao/truong-thanh-doan" element={<TruongthanhdoanThongke />} />
          <Route path="delete-doan-vien" element={<DoanvienDelete />} />
          <Route path="chi-tiet-ca-nhan/:id" element={<TrangCanhan />} />
          <Route path="doan-vien-chuyen-cong-tac-dia-phuong-khac" element={<DoanvienNgoaitinh />} />
          {/* <Route path="hoat-dong-doan" element={<Hoatdongdoanvien />} /> */}
          <Route path="yeu-cau-tiep-nhan" element={<QuanlyYeucauTiepnhanCanbo />} />
          <Route path="list/yeu-cau-bi-tu-choi" element={<QuanlyYeucauTuchoiCanbo />} />
          <Route path="cap-khen-thuong" element={<CapkhenthuongComponent />} />
          <Route path="hinh-thuc-khen" element={<HinhthuckhenComponent />} />
          <Route path="danh-hieu-thi-dua" element={<Danhhieuthidua />} />
          <Route path="xep-loai-dang-vien" element={<Xeploaidangvien />} />
          <Route path="bao-cao/thi-dua-thang-theo-thoi-gian" element={<TonghopThiduathang />} />
          <Route path="bao-cao/thi-dua-nam-theo-nam" element={<TonghopThiduanam />} />
          <Route path="bao-cao/xep-loai-dang-vien-cac-nam" element={<TonghopXeploaiDangvien />} />
          <Route path="bao-cao/xep-loai-dang-vien" element={<ThiduanamDangvienThongke />} />
          <Route path="bao-cao/khen-thuong-theo-thoi-gian" element={<KhenthuongThongkeTheoThoigian />} />
          <Route path="bao-cao/danh-hieu-thi-dua" element={<DanhhieuthiduaThongke />} />
          <Route path="anh-noi-bat" element={<ImagePage />} />
          <Route path="slides/anh-noi-bat" element={<SlidesComponent />} />
          <Route path="can-bo-tung-cong-tac-da-chuyen-di" element={<CanboDatungCongtac />} />
          <Route path="list-can-bo-dang-cho-chuyen-di" element={<CanboDangYeucauChuyendi />} />
          <Route path="home" element={<Home />} />
          <Route path="lich-su-he-thong" element={<HisorySystem />} />
          <Route path="don-vi-chua-cap-nhat-thi-dua-thang" element={<ReportChuaSaveThiduathang />} />
          <Route path="tra-cuu-can-bo" element={<TracuuCanbo />} />
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <ToastContainer style={{width:'450px'}} />
    </Suspense>
  )
}

export default App
