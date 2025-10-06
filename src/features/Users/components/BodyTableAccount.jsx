import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import { useSelector } from "react-redux";



const BodyTableComponent = ({
  row,
  page,
  rowsPerPage, 
  index,
  onClickOpenDialogEdit,
  onClickOpenDialogDelete,
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
  // const captaikhoan = useSelector((state) => state.authReducer.captaikhoan_chamdiemcaicach);
// console.log(captaikhoan)
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
// console.log(row)
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
        {row.tenhienthi}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.khoi.tenkhoi}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.captaikhoan}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
         <span className="flex items-center justify-between">
        <span className="font-bold">{row.trangthai === true ? <span className="text-blue-600">Đang hoạt động</span> : <span className="text-orange-600">Khóa tài khoản</span>}
        </span>
        <input className="w-4 h-4" type="checkbox" onChange={handleChange} checked={check} value={row._id}/>
         </span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.thutu}
      </TableCell>
      
      <TableCell
        align="right"
        className=" flex justify-center items-center space-x-1 transition duration-300"
        style={{width: "120px",}}
      >
        {/* {roles_account && roles_account.includes("sửa tài khoản") && ( */}
           <span className="text-center p-2 hover:cursor-pointer hover:opacity-60" title="Sửa"
           onClick={() => onClickOpenDialogEdit(row)}
         >
           <EditIcon style={{ fontSize: "24px", color: "red" }} />
         </span>
        {/* )} */}

        {/* {roles_account && roles_account.includes("xóa tài khoản") && ( */}
           <span className="text-center p-2 hover:cursor-pointer hover:opacity-60" title="Thay đổi trạng thái tài khoản"
           onClick={() => onClickOpenDialogDelete(row._id)}
         >
          <DeleteOutlineIcon style={{ fontSize: "24px", color: "blue" }} />
         </span>     
         {/* )} */}
      </TableCell>
    </TableRow>
  );
};

export default BodyTableComponent;
