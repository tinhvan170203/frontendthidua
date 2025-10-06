import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";


const BodyTableDoanvienKiluat = ({
  row,
  onHandleChoiceCanbo,
  page,
  rowsPerPage,
  index
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
    <TableRow key={row._id}>
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
        {dayjs(row.ngaysinh).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {row.bachamPopulate[0].bacham}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {row.chucvuPopulate[0].chucvu}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        <p className="truncate font-semibold">{row.donviPopulate[0].tendoi}</p>
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {row.dangvien === true ? "Đảng viên" : ""}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {row.gioitinh}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {row.ngayvaodang !== ""
          ? dayjs(row.ngayvaodang).format("DD/MM/YYYY")
          : ""}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {dayjs(row.bacham.tungay).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {dayjs(row.chucvu.tungay).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left">
        {dayjs(row.donvi.tungay).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell className="border-r border-slate-300" align="left"></TableCell>
      <TableCell
        align="right"
        className="bg-gray-300 flex justify-center items-center space-x-1"
        style={{
          position: "absolute",
          right: "8px",
          height: "53px",
          width: "300px",
          display: "flex",
          flexDirection: "unset",
        }}
      >
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => onHandleChoiceCanbo(row)}
        >
          <EditIcon style={{ fontSize: "20px" }} />
          Kỉ luật cá nhân
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default BodyTableDoanvienKiluat;
