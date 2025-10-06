import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useSelector } from "react-redux";


const BodyTableAccount = ({
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

  const roles = useSelector((state) => state.authReducer.roles_quanlydoanvien);

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
        {row.tentaikhoan}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.matkhau}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.roles.map(i=> <span key={i._id}>{i.tennhom}, </span>)}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.quantrinhomdonvi.map(i=> <span key={i._id}>{i.tendonvi}, </span>)}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.quantrinhomchidoan.map(i=> <span key={i._id}>{i.tenchidoan}, </span>)}
      </TableCell>
      
      <TableCell
        align="right"
        className="bg-gray-300 flex justify-center items-center space-x-1 hover:bg-slate-500 transition duration-300"
        style={{width: "180px",}}
      >
        {roles && roles.includes("sửa tài khoản") && (
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => onClickOpenDialogEdit(row)}
          >
            <EditIcon style={{ fontSize: "20px" }} />
          </Button>
        )}

        {roles && roles.includes("xóa tài khoản") && (
          <Button
            variant="contained"
            color="error"
            size="small"
            style={{ marginLeft: "4px" }}
            onClick={() => onClickOpenDialogDelete(row._id)}
          >
            <DeleteOutlineIcon style={{ fontSize: "20px" }} />
          </Button>
         )}
      </TableCell>
    </TableRow>
  );
};

export default BodyTableAccount;
