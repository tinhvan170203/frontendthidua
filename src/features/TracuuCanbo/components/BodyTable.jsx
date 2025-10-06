import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useSelector } from "react-redux";


const BodyTable = ({
  row,
  page,
  rowsPerPage, 
  index,
  onClickOpenDialogEdit,
  onClickOpenDialogDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const roles = useSelector((state) => state.authReducer.roles_quanlydoanvien);

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
        {row.hoten}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.bachamPopulate[0].bacham}
      </TableCell>
           <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.chucvuPopulate[0].chucvu}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.donviPopulate.tendoi} - {row.accounts[0]}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.chuyencongtacngoaitinh === true ? <p>Đã chuyển công tác ngoại tỉnh</p> : (
          <div>
            {row.nghihuu === true ? <p>Đã nghỉ hưu (ra quân)</p> : <p>Đang công tác trong Công an tỉnh</p>}
          </div>)}
      </TableCell>
     
      <TableCell
        align="right"
        className=""
        style={{width: "180px"}}
      >
        <p  onClick={()=> window.open(`/dashboard/chi-tiet-ca-nhan/${row._id}`, "_blank", "noreferrer")}  className="hover:cursor-pointer font-bold hover:underline text-red-600">Trang cá nhân</p>
      </TableCell>
    </TableRow>
  );
};

export default BodyTable;
