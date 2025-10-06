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
import KeyIcon from '@mui/icons-material/Key';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CancelButton = styled(IconButton)({
  position: "absolute",
  right: "16px",
  top: "4px",
});



export default function DialogChangePassword({
  open,
  onCloseDialogChangePass,
  onSubmit,
}) {

  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm({
    defaultValues: {
      matkhaucu: "",
      matkhaumoi: "",
    },
  });


  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      const data = { ...values };
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
            onCloseDialogChangePass(event, reason);
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
          <KeyIcon style={{ color: "white", fontSize: "24px", marginRight: "8px" }} />
          <span className="text-white">
            Thay đổi mật khẩu đăng nhập
          </span>
          <CancelButton onClick={() => onCloseDialogChangePass()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>

              <form className='mt-2 mx-8' onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='flex-col flex'>
                  <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Mật khẩu cũ: </label>
                  <input {...register("matkhaucu", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex'>
                  <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Mật khẩu mới: </label>
                  <input {...register("matkhaumoi", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                </div>
              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  style={{ margin: "4px auto" }}
                >
                  <KeyIcon />
                  <span>Đổi mật khẩu</span>
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
