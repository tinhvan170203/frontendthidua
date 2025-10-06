import * as React from "react";
import { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import BodyTableDangvien from "./BodyTableDangvien";


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

export default function TableDangvien({
  list,
  onClickOpenDialogDelete,
  onClickOpenDialogEdit,
  onClickOpenDialogChangeBacHam,
  onClickOpenDialogChangeChucvu,
  onClickOpenDialogChucvuPlus,
  onClickOpenDialogBachamPlus,
  onClickOpenDialogDonviPlus,
  onClickOpenDialogChuyenCongtackhactinh,
  onClickOpenDialogChuyenCongtac,
  onClickOpenDialogChuyenCongtacTrongCoquan,
  onClickOpenDialogTruongthanhdoan,
  onChangeCheckList
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

  const [recevices, setRecevices] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(list);
    let arr = list.map(i => ({ value: i._id, isChecked: false }));
    setRecevices(arr);
  }, [list]);

  const handleChangeAllSelect = (e) => {
    const { name, value, checked } = e.target;
    let arr = [...data];
    let arr1 = [...recevices];

    arr = arr.map(i => i._id);
    for (let i of arr) {
      let index = arr1.findIndex(e => e.value.toString() === i.toString());
      arr1[index].isChecked = checked
    };

    setRecevices(arr1);
    onChangeCheckList(arr1)
  };

  const onChangeCheckBoxRow = (item) => {
    let { value, checked } = item;
    let arr = [...recevices];
    let index = arr.findIndex(i => i.value === value);
    arr[index].isChecked = checked;
    setRecevices(arr);
    onChangeCheckList(arr)
  };

  const [checkedAll, setCheckedAll] = useState(false)

  useEffect(() => {
    let arr = [...data];
    let arr1 = [...recevices];
    arr = arr.map(i => i._id);

    let total_checked = 0;
    for (let i of arr) {
      let index = arr1.findIndex(e => e.value.toString() === i.toString());
      if (index === -1) return;
      if (arr1[index].isChecked === true) {
        total_checked += 1;
      }
    };
    if (arr.length === total_checked) {
      setCheckedAll(true)
    } else {
      setCheckedAll(false)
    }

  }, [data, onChangeCheckBoxRow]);

  // const roles = useSelector((state) => state.authReducer.roles_x01);
  return (
    <>
      <TableContainer component={Paper} style={{ overflowX: "scroll" }}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px"
                }}
                className="border-r border-slate-300"
              >
                <input type="checkbox" name="all" value={""} onChange={handleChangeAllSelect}
                  checked={checkedAll}
                  className="w-4 h-4"
                />
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                  // minWidth: "250px",
                }}
              >
                #
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "250px",
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
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "120px",
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
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "120px",
                }}
              >
                Bậc hàm
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "300px",
                }}
              >
                Chức vụ
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "400px",
                }}
              >
                Đội, tổ công tác
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "100px",
                }}
              >
                Đảng viên
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "100px",
                }}
              >
                Giới tính
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "150px",
                }}
              >
                Ngày vào đảng
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "150px",
                }}
              >
                Ngày lên hàm
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "150px",
                }}
              >
                Ngày giữ chức vụ
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "250px",
                }}
              >
                Ngày nhận công tác về đơn vị
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  backgroundColor: "rgb(143 1 1)",
                  minWidth: "300px",
                }}
              ></TableCell>
              <TableCell
                align="center"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  backgroundColor: "rgb(64, 64, 64)",
                  minWidth: "300px",
                  position: "absolute",
                  right: "8px",
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
            ).map((row, index) => (
              <BodyTableDangvien
                row={row}
                key={row._id}
                page={page}
                rowsPerPage={rowsPerPage}
                index={index + 1}
                onClickOpenDialogEdit={onClickOpenDialogEdit}
                onClickOpenDialogDelete={onClickOpenDialogDelete}
                onClickOpenDialogChuyenCongtac={onClickOpenDialogChuyenCongtac}
                onClickOpenDialogChuyenCongtacTrongCoquan={onClickOpenDialogChuyenCongtacTrongCoquan}
                onClickOpenDialogChuyenCongtackhactinh={onClickOpenDialogChuyenCongtackhactinh}
                onClickOpenDialogChangeBacHam={onClickOpenDialogChangeBacHam}
                onClickOpenDialogChangeChucvu={onClickOpenDialogChangeChucvu}
                onClickOpenDialogChucvuPlus={onClickOpenDialogChucvuPlus}
                onClickOpenDialogBachamPlus={onClickOpenDialogBachamPlus}
                onClickOpenDialogDonviPlus={onClickOpenDialogDonviPlus}
                onClickOpenDialogTruongthanhdoan={onClickOpenDialogTruongthanhdoan}
                onChangeCheckBox={onChangeCheckBoxRow}
                recevices={recevices}
              />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
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
          labelRowsPerPage="Số cán bộ hiển thị trên mỗi trang"
          labelDisplayedRows={function defaultLabelDisplayedRows({
            from,
            to,
            count,
          }) {
            return `hiển thị ${from} đến ${to} cán bộ trong tổng số ${count !== -1 ? count : `more than ${to}`
              } cán bộ`;
          }}
        />
      </div>
    </>
  );
}
