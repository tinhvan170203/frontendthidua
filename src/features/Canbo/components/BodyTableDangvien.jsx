import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuItemFunc from "./MenuItemFunc";

const BodyTableDangvien = ({
  row,
  onClickOpenDialogEdit,
  onClickOpenDialogDelete,
  onClickOpenDialogChangeBacHam,
  onClickOpenDialogChangeChucvu,
  onClickOpenDialogChucvuPlus,
  onClickOpenDialogBachamPlus,
  onClickOpenDialogChuyenCongtac,
  onClickOpenDialogChuyenCongtacTrongCoquan,
  onClickOpenDialogChuyenCongtackhactinh,
  onClickOpenDialogDonviPlus,
  onClickOpenDialogTruongthanhdoan,
  page,
  rowsPerPage,
  index,
  onChangeCheckBox,
  recevices
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const roles = useSelector((state) => state.authReducer.roles_theodoithidua);
  const [check, setCheck] = React.useState(false)
  // console.log(row)
  useEffect(() => {
    if (row._id) {
      let index = recevices.findIndex(e => e.value.toString() === row._id.toString());
      if (index === -1) return;
      setCheck(recevices[index].isChecked)
    }
  }, [recevices]);
  
  const handleChange = (e) => {
    const { value, checked } = e.target;
    onChangeCheckBox({ value, checked })
  };
  return (
    <TableRow key={row._id}>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <input className="w-4 h-4" type="checkbox" onChange={handleChange} checked={check} value={row._id} />
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
        style={{ fontWeight: "bold" }}
      >
        {page * rowsPerPage + index}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
        style={{ fontWeight: "bold" }}
      >
        {row.hoten}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {dayjs(row.ngaysinh).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {row.bachamPopulate[0].bacham}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {row.chucvuPopulate[0].chucvu}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        <p className="truncate font-semibold">{row.donviPopulate[0].tendoi}</p>
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {row.dangvien === true ? "Đảng viên" : ""}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {row.gioitinh}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {row.ngayvaodang !== ""
          ? dayjs(row.ngayvaodang).format("DD/MM/YYYY")
          : ""}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {dayjs(row.bacham.tungay).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {dayjs(row.chucvu.tungay).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {dayjs(row.donvi.tungay).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left"></TableCell>
      <TableCell
        align="right"
        className="bg-gray-300 flex justify-center items-center space-x-1"
        style={{
          position: "absolute",
          right: "8px",
          height: "53px",
          width: "300px",
          display: "flex",
          flexDirection: "unset",
        }}
      >

        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => onClickOpenDialogEdit(row)}
        >
          <EditIcon style={{ fontSize: "20px" }} />
        </Button>

        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => onClickOpenDialogChuyenCongtac(row)}
        >
          <MoveDownIcon style={{ fontSize: "20px" }} />
        </Button>

        <Button
          variant="contained"
          color="error"
          size="small"
          style={{ marginLeft: "4px" }}
          onClick={() => onClickOpenDialogDelete(row._id)}
        >
          <DeleteOutlineIcon style={{ fontSize: "20px" }} />
        </Button>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertOutlinedIcon color="primary" />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItemFunc
            onClose={handleClose}
            row={row}
            onClickOpenDialogChangeBacHam={onClickOpenDialogChangeBacHam}
            onClickOpenDialogChangeChucvu={onClickOpenDialogChangeChucvu}
            onClickOpenDialogChucvuPlus={onClickOpenDialogChucvuPlus}
            onClickOpenDialogBachamPlus={onClickOpenDialogBachamPlus}
            onClickOpenDialogDonviPlus={onClickOpenDialogDonviPlus}
            onClickOpenDialogChuyenCongtac={onClickOpenDialogChuyenCongtac}
            onClickOpenDialogChuyenCongtackhactinh={onClickOpenDialogChuyenCongtackhactinh}
            onClickOpenDialogTruongthanhdoan={onClickOpenDialogTruongthanhdoan}
            onClickOpenDialogChuyenCongtacTrongCoquan={onClickOpenDialogChuyenCongtacTrongCoquan}
          />
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default BodyTableDangvien;
