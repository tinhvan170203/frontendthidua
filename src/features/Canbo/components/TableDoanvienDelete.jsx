import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import dayjs from "dayjs";
import FlagIcon from '@mui/icons-material/Flag';
import Tooltip from '@mui/material/Tooltip';



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function TableDoanvienDelete({
  list,
  onChangeStatus,
  onDelete
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty list.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const roles = useSelector((state) => state.authReducer.roles_x01);
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                rowSpan={2}
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                }}
              >
                #
              </TableCell>
              <TableCell
                align="left"
                rowSpan={2}
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                }}
              >
                Họ tên
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  minWidth: "100px",
                  backgroundColor: "rgb(143 1 1)",
                }}
              >
                Ngày sinh
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  minWidth: "100px",
                  backgroundColor: "rgb(143 1 1)",
                }}
              >
                Đơn vị thực hiện xóa
              </TableCell>
              <TableCell
                align="right"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  minWidth: "100px",
                  backgroundColor: "rgb(143 1 1)",
                }}
              >
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : list
            ).map((row, index) => {
              return (
              <TableRow key={row._id} className="hover:bg-slate-200 transition duration-300">
                <TableCell
                  className="border-r border-slate-300"
                  align="left"
                  style={{ fontWeight: "bold" }}
                >
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell
                  className="border-r border-slate-300"
                  align="left"
                >
                  <span className="font-bold">{row.hoten}</span>
                </TableCell>
                <TableCell
                  className="border-r border-slate-300"
                  align="left"
                >
                  {dayjs(row.ngaysinh).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  className="border-r border-slate-300"
                  align="left"
                >
                  <p className="truncate">{row.donviBeforeDelete.tenhienthi}</p>
                </TableCell>
                <TableCell
                  className="border-r border-slate-300"
                  align="right"
                >
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                  onClick={()=> onChangeStatus(row._id)}
                  >
                    {/* <EditIcon style={{ fontSize: "20px" }} /> */}
                    Thay đổi trạng thái active
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    style={{marginLeft: "12px"}}
                    onClick={()=> onDelete(row._id)}
                  >
                    {/* <EditIcon style={{ fontSize: "20px" }} /> */}
                    Xóa đoàn viên khỏi hệ thống vĩnh viễn
                  </Button>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100, { label: "Tất cả", value: -1 }]}
          // colSpan={3}
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          component={"div"}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          labelRowsPerPage="Số bản ghi hiển thị trên mỗi trang"
          labelDisplayedRows={function defaultLabelDisplayedRows({
            from,
            to,
            count,
          }) {
            return `hiển thị ${from} đến ${to} bản ghi trong tổng số ${count !== -1 ? count : `more than ${to}`
              } bản ghi`;
          }}
        />
      </div>
    </>
  );
}
