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
  IconButton,
  styled,
} from "@mui/material";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import dayjs from "dayjs";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CancelButton = styled(IconButton)({
  position: "absolute",
  right: "16px",
  top: "4px",
});


export default function DialogTruongthanhdoan({
  open,
  item,
  onCloseDialogTruongthanhdoan,
  onSubmit
}) {

  const form = useForm({
    defaultValues: {
      ngaytruongthanhdoan: ''
    }
  });

  const [handleChangeNotifications, handleLoading] = useOutletContext();

  const setValue = form.setValue;
  const watch = form.watch;

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      const data = { ...values };
      try {
        await onSubmit(data);
        onCloseDialogTruongthanhdoan();
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
            onCloseDialogTruongthanhdoan(event, reason);
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
            Quyết định nghỉ hưu (ra khỏi ngành, xuất ngũ) của đồng chí "{item?.bachamPopulate[0]?.bacham} {item?.hoten}"
          </span>
          <CancelButton onClick={() => onCloseDialogTruongthanhdoan()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              style={{ width: "100%" }}
            >
              <div className='flex flex-wrap  flex-col flex-1 p-2'>
                <div className='flex-col flex flex-1 px-1'>
                  <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Quyết định có hiệu lực kể từ ngày: </label>
                  <input {...register("ngaytruongthanhdoan")} placeholder="dd-mm-yyyy" type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400' required />
                </div>
              </div>

              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  style={{ margin: "4px auto" }}
                >
                  <ThumbUpAltIcon />
                  <span>Lưu dữ liệu</span>
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
