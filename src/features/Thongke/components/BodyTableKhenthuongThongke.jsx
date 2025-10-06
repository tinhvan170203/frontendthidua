import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useSelector } from "react-redux";
import dayjs from "dayjs";


const BodyTableKhenthuongThongke = ({
  row,
  page,
  rowsPerPage, 
  index,
}) => {
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
        {row.doituongkhen}
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
        style={{width: "180px",}}
      >
        {row.id_canhan  && (
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={()=> window.open(`/dashboard/chi-tiet/${row.doituongkhen.id_canhan}`, "_blank", "noreferrer")}
          >
            Trang cá nhân
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default BodyTableKhenthuongThongke;
