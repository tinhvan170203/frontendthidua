import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from 'dayjs'
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

  return (
    <TableRow key={row._id} className="hover:bg-slate-200 transition duration-300">
      <TableCell
        className="border-r border-slate-300"
        align="left"
        style={{ fontWeight: "bold",fontSize: "13px"}}
      >
   {dayjs(row.createdAt).format('DD/MM/YYYY lúc hh:mm')}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
        style={{fontSize: "13px", minWidth: "350px"}}
      >
        {row.user.tenhienthi}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
        style={{fontSize: "13px"}}
      >
        {row.action}
      </TableCell>
    </TableRow>
  );
};

export default BodyTable;
