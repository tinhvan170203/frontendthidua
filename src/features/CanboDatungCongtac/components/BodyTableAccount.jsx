import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const BodyTableComponent = ({
  row,
  page,
  rowsPerPage,
  index,
}) => {
  const [check, setCheck] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //  console.log(row)
  return (
    <TableRow key={row._id} className="hover:bg-slate-200 transition duration-300">
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
      >
        <span className="font-semibold">{row.hoten}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {dayjs(row.ngaysinh).format('DD/MM/YYYY')}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.nghihuu === true ? <span>Đã nghỉ hưu</span> : <span> Đã chuyển công tác khỏi đơn vị</span>}
      </TableCell>


      <TableCell
        align="right"
        className=" flex justify-center items-center space-x-1 transition duration-300"
        style={{ width: "200px", }}
      >
        <p onClick={() => window.open(`/dashboard/chi-tiet-ca-nhan/${row._id}`, "_blank", "noreferrer")} className="hover:cursor-pointer font-bold hover:underline text-red-600">Trang cá nhân</p>
      </TableCell>
    </TableRow>
  );
};

export default BodyTableComponent;
