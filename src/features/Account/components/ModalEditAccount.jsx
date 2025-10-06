import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  IconButton,
  styled,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form"
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import Select from 'react-select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CancelButton = styled(IconButton)({
  position: "absolute",
  right: "16px",
  top: "4px",
});



export default function ModalEditAccount({
  open,
  item,
  onCloseDialogEdit,
  onSubmit,
  roles,
  donvis, 
  chidoans
}) {
  
  const {
    register,
    handleSubmit,
    control,
    resetField,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
        tentaikhoan: "",
        matkhau: "",
        roles: "",
        quantrinhomchidoan: "",
        quantrinhomdonvi: ''
    },
  });


  useEffect(() => {
    if (item) {
      setValue("tentaikhoan", item.tentaikhoan, { shouldValidate: true });
      setValue("matkhau", item.matkhau, { shouldValidate: true });
      setValue("roles", item.roles.map(i=>({value: i._id, label: i.tennhom})), { shouldValidate: true });
      setValue("quantrinhomdonvi", item.quantrinhomdonvi.map(i=>({value: i._id, label: i.tendonvi})), { shouldValidate: true });
      setValue("quantrinhomchidoan", item.quantrinhomchidoan.map(i=>({value: i._id, label: i.tenchidoan})), { shouldValidate: true });
    }
  }, [item]);

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      const data = { ...values, id_edit: item._id};
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
            Chỉnh sửa tài khoản người dùng
          </span>
          <CancelButton onClick={() => onCloseDialogEdit()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>

            <form className='mt-2 mx-8' onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='flex-col flex'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên tài khoản: </label>
          <input {...register("tentaikhoan", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
        </div>
        <div className='flex-col flex'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Mật khẩu: </label>
          <input {...register("matkhau", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
        </div>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Nhóm quyền: </label>
            <Controller 
              control={control}
              name="roles"
              render={({ field }) => (
                <Select
                    isMulti
                    options={roles}
                    className="basic-multi-select my-4"
                    classNamePrefix="select"
                    {...field}
                    required
                />
              )}
            />
        </div>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Quản trị nhóm đơn vị: </label>
            <Controller 
              control={control}
              name="quantrinhomdonvi"
              render={({ field }) => (
                <Select
                    isMulti
                    options={donvis}
                    className="basic-multi-select my-4"
                    classNamePrefix="select"
                    {...field}
                    required
                />
              )}
            />
        </div>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Quản trị nhóm chi đoàn: </label>
            <Controller 
              control={control}
              name="quantrinhomchidoan"
              render={({ field }) => (
                <Select
                    required
                    isMulti
                    options={chidoans}
                    className="basic-multi-select my-4"
                    classNamePrefix="select"
                    {...field}
                />
              )}
            />
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
