import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useSelector } from "react-redux";
import dayjs from "dayjs";


const BodyTableKhencanhan = ({
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
        <span className="font-bold">{row.soQD}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.hinhthuc.hinhthuckhen}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.capkhen.capkhen}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.nguoiky}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {dayjs(row.ngayky).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.noidung}
      </TableCell>
      <TableCell
        align="right"
        className="bg-gray-300 flex justify-center items-center space-x-1 hover:bg-slate-500 transition duration-300"
        // style={{
        //   position: "absolute",
        //   right: "8px",
        //   height: "53px",
        //   width: "300px",
        //   display: "flex",
        //   flexDirection: "unset",
        // }}
      >

          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => onClickOpenDialogEdit(row)}
          >
            <EditIcon style={{ fontSize: "20px" }} />
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
      </TableCell>
    </TableRow>
  );
};

export default BodyTableKhencanhan;
