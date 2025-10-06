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

const BodyTable = ({
  row,
  onClickOpenDialogEdit,
  onClickOpenDialogDelete,
  page,
  rowsPerPage, 
  index,
    onChangeCheckBox,
  recevices
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
  const roles = useSelector((state) => state.authReducer.roles_theodoithidua);
// console.log(row)
useEffect(()=>{
  if(row._id){
    let index = recevices.findIndex(e=>e.value.toString() === row._id.toString());
    if(index === -1) return;
    setCheck(recevices[index].isChecked)
  }
},[recevices])
const handleChange = (e)=>{
  const {value, checked} = e.target;
  onChangeCheckBox({value, checked})
};
  return (
    <TableRow key={row._id}>
         <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <input className="w-4 h-4" type="checkbox" onChange={handleChange} checked={check} value={row._id}/> 
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
        {row.chucvu[0].chucvu}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        <p className="truncate">{row.donvi.tenhienthi}</p>
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">{row.yeucauChuyencongtac.ghichu}</TableCell>
      {/* <TableCell
        align="right"
        className=" flex justify-center items-center space-x-1"
        style={{
          // width: "300px",
        }}
      >

          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => onClickOpenDialogEdit(row)}
          >
            Tiếp nhận
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            style={{ marginLeft: "4px" }}
            onClick={() => onClickOpenDialogDelete(row._id)}
          >
            Từ chối
          </Button>
      </TableCell> */}
    </TableRow>
  );
};

export default BodyTable;
