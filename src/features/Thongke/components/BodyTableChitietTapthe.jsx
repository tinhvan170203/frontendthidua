import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

// import { useSelector } from "react-redux";
// import dayjs from "dayjs";


const BodyTableChitietTapthe = ({
  row,
  page,
  rowsPerPage, 
  index
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
        <span className="font-bold">{row.doituongkhen}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.soluotkhen}
      </TableCell>
    </TableRow>
  );
};

export default BodyTableChitietTapthe;
