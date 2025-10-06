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
  const [check, setCheck]= React.useState(false)
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
        {row.yeucauChuyencongtac.target.tenhienthi}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.yeucauChuyencongtac.ghichu}
      </TableCell>
      <TableCell
        align="right"
        className=" flex justify-center items-center space-x-1 transition duration-300"
        style={{width: "120px",}}
      >

           <span className="text-center p-2 hover:cursor-pointer hover:opacity-60" title="Xem trang cá nhân"
          //  onClick={() => onClickOpenDialogEdit(row)}
         >
           <EditIcon style={{ fontSize: "24px", color: "red" }} />
         </span>

      </TableCell>
    </TableRow>
  );
};

export default BodyTableComponent;
