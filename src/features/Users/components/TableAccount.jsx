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
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import BodyTableAccount from "./BodyTableAccount";

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

export default function TableComponents({
  list,
  onClickOpenDialogEdit,
  onClickOpenDialogDelete,
  onClickHandleConfirmNhan
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [recevices, setRecevices] = useState([]);  // danh sách các tài khoản thay đổi trạng thái hoạt động

  const [data, setData] = useState([]);
  const [madonvi, setMadonvi] = useState('');
  const [tentaikhoan, setTentaikhoan] = useState('');
  React.useEffect(() => {
    // setPage(0)
  }, [list])
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

  useEffect(() => {
    setData(list);
    let arr = list.map(i => ({ value: i._id, isChecked: false }));
      // console.log(arr)
    setRecevices(arr);
    // setCheckedAll(false)
  }, [list, onClickHandleConfirmNhan]);


  const handleChangeAllSelect = (e) => {
    const { name, value, checked } = e.target;
    let arr = [...data];
    let arr1 = [...recevices];

    arr = arr.map(i=>i._id);
    for (let i of arr) {
      let index = arr1.findIndex(e => e.value.toString() === i.toString());
      arr1[index].isChecked = checked
    }
    setRecevices(arr1)
  };

  const onChangeCheckBoxRow = (item) => {
    let { value, checked } = item;
    let arr = [...recevices];
    let index = arr.findIndex(i => i.value === value);
    arr[index].isChecked = checked;
    setRecevices(arr)
  };
  const handleClickNhan = async () => {
    let values = [...recevices];
    values = values.filter(e => e.isChecked === true).map(i => i.value)
    //  console.log(values)
    if (values.length === 0) {
      alert("Vui lòng tích chọn các tài khoản muốn thay đổi trạng thái hoạt động của tài khoản");
      return
    };
    await onClickHandleConfirmNhan(values);
    setCheckedAll(false)
  };

  const [checkedAll, setCheckedAll] = useState(false)

 

  useEffect(()=>{
    let arr = [...data];
      let arr1 = [...recevices];
      arr = arr.map(i=>i._id);
  
        let total_checked = 0;
      for(let i of arr){
        let index = arr1.findIndex(e=>e.value.toString() === i.toString());
        if(index === -1) return;
        if(arr1[index].isChecked === true) {
          total_checked += 1;
        }
      };
      if(arr.length === total_checked){
        setCheckedAll(true)
      }else{
        setCheckedAll(false)
      }

  },[data, onChangeCheckBoxRow]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
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
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                }}
              >
                Tên tài khoản
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                }}
              >
                Mật khẩu
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
                Tên hiển thị
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
                Khối
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
                Cấp tài khoản
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
                Trạng thái
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
                Thứ tự
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                  backgroundColor: "rgb(143 1 1)",
                  width: "100px",
                }}
              >
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                }}
                className="border-r border-slate-300"
              >
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                }}
                className="border-r border-slate-300"
              >
               
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                }}
                className="border-r border-slate-300"
              >
              
              </TableCell>
              <TableCell
                align="left"
                colSpan={4}
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "8px 8px",
                }}
                className="border-r border-slate-300"
              >

              </TableCell>

              <TableCell
                align="left"
                style={{
                  fontSize: "14px",
                  padding: "8px 8px",
                  minWidth: "100px",
                  // display: "flex",
                  // justifyContent: "space-between"
                }}
                className="border-r border-slate-300"
              >
                <span className="flex items-center justify-between">
                  <span className="text-gray-400 hover:cursor-default mr-4">Chọn tất cả</span>
                  <input type="checkbox" name="all" value={""} onChange={handleChangeAllSelect}
                    checked={checkedAll}
                    className="w-4 h-4" />
                </span>
              </TableCell>
              <TableCell
                align="center"
                colSpan={2}
                style={{
                  fontSize: "14px",
                  padding: "8px 8px",
                  maxWidth: "150px",
                }}
                className="border-r border-slate-300"
              >
                <p className="p-1 bg-blue-600 uppercase rounded-lg hover:cursor-pointer text-white text-[12px] hover:opacity-80" onClick={handleClickNhan}>Thay đổi trạng thái</p>
              </TableCell>
            </TableRow>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row, index) => (
              <BodyTableAccount
                row={row}
                key={row._id}
                page={page}
                rowsPerPage={rowsPerPage}
                index={index + 1}
                onClickOpenDialogEdit={onClickOpenDialogEdit}
                onClickOpenDialogDelete={onClickOpenDialogDelete}
                onChangeCheckBox={onChangeCheckBoxRow}
                recevices={recevices}
              />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6}></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100, { label: "Tất cả", value: -1 }]}
          // colSpan={3}
          count={data.length}
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
