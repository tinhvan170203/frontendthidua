import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch';
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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CancelButton = styled(IconButton)({
  position: "absolute",
  right: "16px",
  top: "4px",
});



export default function EditModal({
  open,
  item,
  onCloseDialogEdit,
  onSubmit,
}) {

  const {
    register,
    handleSubmit,
    control,
    resetField,
    setValue,
    watch,
    formState: { errors},
  } = useForm({
    defaultValues: {
    },
  });


  useEffect(() => {
    if (item) {
      setValue("noidung", item.noidung, { shouldValidate: true });
      setValue("ghichu", item.ghichu, { shouldValidate: true });
      setValue("diadiem", item.diadiem, { shouldValidate: true });
      setValue("doanvien", item.doanvien, { shouldValidate: true });
      setValue("ngay", item.ngay, { shouldValidate: true });
    }
  }, [item]);

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      const data = { ...values, id_edit: item._id };
      await onSubmit(data);
      onCloseDialogEdit();
    }
  };


  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        disableEscapeKeyDown={true}
        onClose={(event, reason) => {
          // bỏ click ở nền đen mà mất dialog
          if (reason !== "backdropClick") {
            onCloseDialogEdit(event, reason);
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
            backgroundColor: "rgb(30, 41, 59 )",
            margin: "0px",
          }}
        >
          <AutoAwesomeMotionIcon style={{ color: "white", fontSize: "24px", marginRight: "8px" }} />
          <span className="text-white text-[18px]">
            Chỉnh sửa hoạt động đoàn
          </span>
          <CancelButton onClick={() => onCloseDialogEdit()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>

              <form className='mt-2 mx-8' onSubmit={handleSubmit(handleFormSubmit)}>
              <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Nội dung hoạt động đoàn: </label>
                    <input {...register("noidung")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ghi chú: </label>
                    <input {...register("ghichu")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Địa điểm: </label>
                    <input {...register("diadiem")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Đoàn viên tham gia, thực hiện: </label>
                    <input {...register("doanvien")} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày: </label>
                    <input {...register("ngay", { required: true })} type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                    focus:ring-2 focus:border-blue-400'/>
                </div>
              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  style={{ margin: "4px auto" }}
                >
                  <AddIcon />
                  <span>Cập nhật</span>
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
