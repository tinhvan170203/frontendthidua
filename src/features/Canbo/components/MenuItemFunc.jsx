import { MenuItem } from "@mui/material";
import React from "react";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import SettingsIcon from "@mui/icons-material/Settings";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ViewListIcon from "@mui/icons-material/ViewList";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MenuItemFunc = ({ onClose, row, 
  onClickOpenDialogChangeBacHam,
  onClickOpenDialogChangeChucvu,
  onClickOpenDialogChucvuPlus,
  onClickOpenDialogBachamPlus,
  onClickOpenDialogChuyenCongtac,
  onClickOpenDialogChuyenCongtackhactinh,
  onClickOpenDialogTruongthanhdoan,
  onClickOpenDialogChuyenCongtacTrongCoquan
}) => {

  const roles = useSelector((state) => state.authReducer.roles_quanlydoanvien);

  const handleOpenDialogChangeBacHam = () => {
    onClose();
    onClickOpenDialogChangeBacHam(row);
  };

  const handleOpenDialogChangeChucvu = () => {
    onClose();
    onClickOpenDialogChangeChucvu(row);
  };

  const handleOpenDialogChucvuPlus = () => {
    onClose();
    onClickOpenDialogChucvuPlus(row);
  };
  const handleOpenDialogBachamPlus = () => {
    onClose();
    onClickOpenDialogBachamPlus(row);
  };
  const handleOpenDialogChuyencongtac = () => {
    onClose();
    onClickOpenDialogChuyenCongtac(row);
  };

  const handleOpenDialogTruongthanhdoan = () => {
    onClose();
    onClickOpenDialogTruongthanhdoan(row);
  };
  const handleOpenDialogChuyencongtackhactinh = () => {
    onClose();
    onClickOpenDialogChuyenCongtackhactinh(row);
  };
  const handleOpenDialogChuyencongtacTrongCoquan = () => {
    onClose();
    onClickOpenDialogChuyenCongtacTrongCoquan(row);
  };
// console.log(row)

  const navigate = useNavigate();
  return (
    <>
      <h3 className="text-center p-2 px-4 text-green-800 font-medium">
        Chức năng quản trị mở rộng
      </h3>
      <hr></hr>

        <>
      <MenuItem onClick={() => handleOpenDialogChucvuPlus()}>
        <div className="flex items-center justify-between space-x-4 hover:bg-slate-200 p-1 rounded-md w-full">
          <AdminPanelSettingsIcon color="primary" />
          <span className="text-sm">Quản trị chức vụ nâng cao</span>
        </div>
      </MenuItem>
      <MenuItem onClick={() => handleOpenDialogBachamPlus()}>
        <div className="flex items-center justify-between space-x-4 hover:bg-slate-200 p-1 rounded-md w-full">
          <AdminPanelSettingsIcon color="primary" />
          <span className="text-sm">Quản trị nâng cao cấp bậc hàm</span>
        </div>
      </MenuItem>
      {/* <MenuItem onClick={() => handleOpenDialogDonviPlus()}>
        <div className="flex items-center justify-between space-x-4 hover:bg-slate-200 p-1 rounded-md w-full">
          <AdminPanelSettingsIcon color="primary" />
          <span className="text-sm">Quản trị nâng cao đơn vị công tác</span>
        </div>
      </MenuItem> */}
        </>
      <MenuItem onClick={() => handleOpenDialogChangeChucvu()}>
        <div className="flex items-center justify-between space-x-4 hover:bg-slate-200 p-1 rounded-md w-full">
          <MilitaryTechIcon />
          <span className="text-sm">Thay đổi chức vụ công tác mới</span>
        </div>
      </MenuItem>
      <MenuItem onClick={() => handleOpenDialogChangeBacHam()}>
        <div className="flex items-center justify-between space-x-4 hover:bg-slate-200 p-1 rounded-md w-full">
          <StarBorderPurple500Icon />
          <span className="text-sm">Thay đổi cấp bậc hàm</span>
        </div>
      </MenuItem>
      <MenuItem onClick={() => handleOpenDialogChuyencongtacTrongCoquan()}>
        <div className="flex items-center justify-between space-x-4 hover:bg-slate-200 p-1 rounded-md w-full">
          <ViewListIcon />
          <span className="text-sm">Chuyển trong nội bộ đơn vị</span>
        </div>
      </MenuItem>
      <MenuItem onClick={() => handleOpenDialogChuyencongtackhactinh()}>
        <div className="flex items-center justify-between space-x-4 hover:bg-slate-200 p-1 rounded-md w-full">
          <ViewListIcon />
          <span className="text-sm">Chuyển công tác ngoài tỉnh</span>
        </div>
      </MenuItem>
      <MenuItem onClick={() => handleOpenDialogChuyencongtac()}>
        <div className="flex items-center justify-between space-x-4 hover:bg-slate-200 p-1 rounded-md w-full">
          <ViewListIcon />
          <span className="text-sm">Chuyển đơn vị khác trong công an tỉnh, thành phố</span>
        </div>
      </MenuItem>
      {row.doanvien === true && (
      <MenuItem onClick={() => handleOpenDialogTruongthanhdoan()}>
        <div className="flex items-center justify-between space-x-4 hover:bg-slate-200 p-1 rounded-md w-full">
          <ViewListIcon />
          <span className="text-sm">Nghỉ hưu, ra khỏi nghành</span>
        </div>
      </MenuItem>
      )}
    </>
  );
};

export default MenuItemFunc;
