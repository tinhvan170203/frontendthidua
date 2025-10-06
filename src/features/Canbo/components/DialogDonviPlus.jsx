import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CancelIcon from "@mui/icons-material/Cancel";
import Select from 'react-select';
import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  styled,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import dayjs from "dayjs";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useState } from "react";
import chucvuApi from '../../../api/chucvuApi';
import canboApi from '../../../api/canboApi';
import donviApi from '../../../api/donviApi';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import EditIcon from "@mui/icons-material/Edit";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { toast } from 'react-toastify';
import { useOutletContext } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DialogDelete from "../../../components/DialogDelete";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CancelButton = styled(IconButton)({
  position: "absolute",
  right: "16px",
  top: "4px",
});


export default function DialogDonviPlus({
  open,
  item,
  onCloseDialogDonviPlus,
  onSubmit
}) {

  const form = useForm({
    defaultValues: {
    id_item: null,
    ghichu: "",
    ngayvedonvi: '',
    }
  });

  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const [donvis, setDonvis] = useState([]);
  const [dois, setDois] = useState([]);
  const [donviList, setDonviList] = useState([]);

  const setValue = form.setValue;
  const watch = form.watch;

  const roles = useSelector((state) => state.authReducer.roles_quanlydoanvien);

    //state mở hộp thoại delete
    const [openDialogDelete, setOpenDialogDelete] = useState({
      status: false,
      id_Delete: null
    });

  const handleCancelDelete = () => {
    setOpenDialogDelete({
      ...openDialogDelete,
      status: false,
    });
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete({
      ...openDialogDelete,
      status: false,
    });
  };

    //open dialog delete
    const handleOpenDialogDelete = (id1) => {
      setOpenDialogDelete({
        status: true,
        id_Delete: id1,
      });
    };

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      handleLoading(true)
      const data = { ...values, id: item._id };
      try {
        let res = await canboApi.changeDonviPlus(data)
        setDonviList(res.data.data);
        await onSubmit();
        form.reset()
        handleLoading(false)
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onCloseDialogDonviPlus();
      } catch (error) {
        console.log(error.message)
      }
    }
  };

  const onClickEditItem = (row) => {
    setValue('id_item', row._id)
    setValue('ghichu', row.ghichu)
    setValue('ngayvedonvi', row.tungay)
    setValue('donvi', { label: row.donvi.tendonvi, value: row.donvi._id })
    setValue('doi', { label: row.doi.tendoi, value: row.doi._id })
  };


  const handleConfirmDelete = async () => {
    if (onSubmit) {
      handleLoading(true)
      try {
        let res = await canboApi.deleteDonviPlus(item._id, openDialogDelete.id_Delete)
        setDonviList(res.data.data);
        await onSubmit();
        handleLoading(false)
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setOpenDialogDelete({
          ...openDialogDelete,
          status: false
        });
      } catch (error) {
        console.log(error.message)
      }
    }
  };

  const { isSubmitting } = form.formState;
  const { register } = form;

  return (
    <>
      <Dialog
        maxWidth="xl"
        fullWidth={true}
        disableEscapeKeyDown={true}
        onClose={(event, reason) => {
          // bỏ click ở nền đen mà mất dialog
          if (reason !== "backdropClick") {
            onCloseDialogDonviPlus(event, reason);
          }
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{
            display: "flex",
            borderBottom: "1px solid #ccc",
            backgroundColor: "#03528f",
            margin: "0px",
          }}
        >
          <AutoAwesomeMotionIcon style={{ color: "white", fontSize: "24px", marginRight: "8px" }} />
          <span className="text-white text-[18px]">
            Quản trị đơn vị công tác nâng cao đối với đồng chí "{item?.hoten}" 
          </span>
          <CancelButton onClick={() => onCloseDialogDonviPlus()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              style={{ width: "100%" }}
            >
              <div className='flex flex-wrap xl:flex-row flex-wrapp flex-col flex-1 p-2'>
                <div className='flex-col md:basis-1/2 flex flex-1 px-1'>
                  <label className='underline font-semibold'>Đơn vị chỉnh sửa:</label>
                  <Controller
                    control={form.control}
                    name="donvi"
                    render={({ field }) => (
                      <Select
                        options={donvis}
                        className="basic-multi-select my-4 p-1"
                        classNamePrefix="select"
                        placeholder="Vui lòng chọn đơn vị"
                        required
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className='flex-col md:basis-1/2 flex flex-1 px-1'>
                <label className='underline font-semibold'>Đội, công an xã, phường:</label>
                  <Controller
                control={form.control}
                name="doi"
                render={({ field }) => (
                  <Select
                  options={dois}
                  className="basic-multi-select my-4 p-1"
                  classNamePrefix="select"
                  placeholder="Vui lòng chọn đội công tác, ca xã"
                  required
                    {...field}
                  />
                )}
              />
                </div>
                <div className='flex-col flex md:basis-1/2 flex-1 px-1'>
                  <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày chuyển đến đơn vị: </label>
                  <input {...register("ngayvedonvi")} placeholder="dd-mm-yyyy" type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400' required />
                </div>
                <div className='flex-col flex md:basis-1/2 flex-1 px-1'>
                  <label className='underline font-semibold'> Ghi chú: </label>
                  <input {...register("ghichu")} placeholder="Ghi chú" type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                </div>
              </div>

              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={!watch('id_item')}
                  type="submit"
                  style={{ margin: "4px auto" }}
                >
                  <ThumbUpAltIcon />
                  <span>Lưu dữ liệu</span>
                </Button>
              </DialogActions>
            </form>
          </Box>

          <div>
            <h3 className="text-center my-4 text-lg font-bold text-blue-500">Quá trình công tác qua các đơn vị</h3>
          </div>
          <TableContainer style={{ overflowX: "scroll" }}>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{
                      fontSize: "14px",
                      color: "#fff",
                      padding: "8px 8px",
                      backgroundColor: "#03528f"
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
                      backgroundColor: "#03528f",
                      minWidth: "100px",
                    }}
                  >
                    Đơn vị công tác
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontSize: "14px",
                      color: "#fff",
                      padding: "8px 8px",
                      backgroundColor: "#03528f",
                      minWidth: "100px",
                    }}
                  >
                    Đội, công an xã
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontSize: "14px",
                      color: "#fff",
                      padding: "8px 8px",
                      backgroundColor: "#03528f",
                      minWidth: "150px",
                    }}
                  >
                    Ngày về đơn vị
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontSize: "14px",
                      color: "#fff",
                      padding: "8px 8px",
                      backgroundColor: "#03528f",
                      minWidth: "150px",
                    }}
                  >
                    Ghi chú
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontSize: "14px",
                      color: "#fff",
                      padding: "8px 8px",
                      backgroundColor: "#03528f",
                      // minWidth: "150px",
                    }}
                  >
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donviList.length > 0 ?
                  donviList.map((i, index) => (
                    <TableRow key={i._id}>
                      <TableCell>
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        {i.donvi.tendonvi}
                      </TableCell>
                      <TableCell>
                        {i.doi.tendoi}
                      </TableCell>
                      <TableCell>
                        {dayjs(i.tungay).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {i.ghichu}
                      </TableCell>
                      <TableCell align="right"
                        className="bg-gray-300 flex justify-center items-center space-x-1 hover:bg-slate-500 transition duration-300"
                        style={{ width: "180px", }}>
           
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => onClickEditItem(i)}
                        >
                          <EditIcon style={{ fontSize: "20px" }} />
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          style={{ marginLeft: "4px" }}
                          onClick={() => handleOpenDialogDelete(i._id)}
                        >
                          <DeleteOutlineIcon style={{ fontSize: "20px" }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                  : (
                    <TableRow>
                      <TableCell>
                        Không có dữ liệu trong hệ thống
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>

          <DialogDelete 
        open={openDialogDelete.status}
        onCloseDialogDelete={handleCloseDialogDelete}
        onConfirmDelete={handleConfirmDelete}
        onCancelDelete={handleCancelDelete}
      />
        </DialogContent>
      </Dialog>
    </>
  );
}
