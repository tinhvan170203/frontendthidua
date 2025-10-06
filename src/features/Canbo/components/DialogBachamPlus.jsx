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
import canboApi from '../../../api/canboApi';
import bachamApi from '../../../api/bachamApi';
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


export default function DialogBachamPlus({
  open,
  item,
  onCloseDialogBachamPlus,
  onSubmit
}) {

  const form = useForm({
    defaultValues: {
      id_item: null,
      ghichu: "",
      ngaylenham: ''
    }
  });

  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const [bachams, setBachams] = useState([]);
  const [bachamList, setBachamList] = useState([]);
  const setValue = form.setValue;
  const watch = form.watch;

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

  useEffect(() => {
    const getBachams = async () => {
      try {
        let res = await bachamApi.getBachams();
        setBachams(res.data.map((i) => ({
          value: i._id,
          label: i.bacham,
        })))
      } catch (error) {
        console.log(error.message)
      }
    };

    getBachams()
  }, []);

  useEffect(() => {
    if (item) {
      setValue('id_item', null);
      setValue('ghichu', '')
      setValue('ngaylenham', '')
      const getData = async () => {
        try {
          let res = await canboApi.getBachamPlus(item._id);
          console.log(res)
          setBachamList(res.data)
        } catch (error) {
          console.log(error.message)
        }
      };

      getData()
    }
  }, [item]);

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      handleLoading(true)
      const data = { ...values, id: item._id };
      try {
        let res = await canboApi.changeBachamPlus(data)
        setBachamList(res.data.data);
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
      } catch (error) {
        console.log(error.message)
      }
      // onCloseDialogChangeChucvu();
    }
  };

  const onClickEditItem = (row) => {
    setValue('id_item', row._id)
    setValue('ghichu', row.ghichu)
    setValue('ngaylenham', row.tungay)
    setValue('bacham', { label: row.bacham.bacham, value: row.bacham._id })
  };

  const handleConfirmDelete = async () => {
    if (onSubmit) {
      handleLoading(true)
      try {
        let res = await canboApi.deleteBachamPlus(item._id, openDialogDelete.id_Delete)
        setBachamList(res.data.data);
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

  const roles = useSelector((state) => state.authReducer.roles_quanlydoanvien);

  return (
    <>
      <Dialog
        maxWidth="xl"
        fullWidth={true}
        disableEscapeKeyDown={true}
        onClose={(event, reason) => {
          // bỏ click ở nền đen mà mất dialog
          if (reason !== "backdropClick") {
            onCloseDialogBachamPlus(event, reason);
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
          <span className="text-white text-[16px]">
            Quản trị bậc hàm nâng cao đối với đồng chí "{item?.bachamPopulate[0]?.bacham} {item?.hoten}
          </span>
          <CancelButton onClick={() => onCloseDialogBachamPlus()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              style={{ width: "100%" }}
            >
              <div className='flex flex-wrap xl:flex-row flex-col flex-1 p-2'>
                <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
                  <label className='underline font-semibold'>Cấp bậc quân hàm chỉnh sửa:</label>
                  <Controller
                    control={form.control}
                    name="bacham"
                    render={({ field }) => (
                      <Select
                        options={bachams}
                        className="basic-multi-select my-4 p-1"
                        classNamePrefix="select"
                        placeholder="Vui lòng chọn bậc hàm"
                        required
                        {...field}
                      />
                    )}
                  />
                </div>

                <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
                  <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày lên hàm: </label>
                  <input {...register("ngaylenham")} placeholder="dd-mm-yyyy" type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400' required />
                </div>
                <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
                  <label className='underline font-semibold'> Ghi chú chỉnh sửa: </label>
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
            <h3 className="text-center my-4 text-lg font-bold text-blue-500">Danh sách các bậc quân hàm đã nhận</h3>
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
                    Bậc hàm
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
                    Ngày lên quân hàm
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
                {bachamList.length > 0 ?
                  bachamList.map((i, index) => (
                    <TableRow key={i._id}>
                      <TableCell>
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        {i.bacham.bacham}
                      </TableCell>
                      <TableCell>
                        {dayjs(i.tungay).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {i.ghichu}
                      </TableCell>
                      <TableCell
                        align="right"
                        className="bg-gray-300 flex justify-center items-center space-x-1 hover:bg-slate-500 transition duration-300"
                        style={{ width: "180px", }}
                      >
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
