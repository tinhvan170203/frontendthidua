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
import authApi from "../../../api/authApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CancelButton = styled(IconButton)({
  position: "absolute",
  right: "16px",
  top: "4px",
});

export default function ModalEditComponent({
  open,
  item,
  onCloseDialogEdit,
  onSubmit,
  khois
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
    },
  });


  useEffect(() => {
    if (item) {
      setValue("tentaikhoan", item.tentaikhoan, { shouldValidate: true });
      setValue("madonvi", item.madonvi, { shouldValidate: true });
      setValue("captaikhoan", item.captaikhoan, { shouldValidate: true });
      setValue("tenhienthi", item.tenhienthi, { shouldValidate: true });
      setValue("matkhau", item.matkhau, { shouldValidate: true });
      setValue("thutu", item.thutu, { shouldValidate: true });
      setValue("trangthai", item.trangthai, { shouldValidate: true });
      setValue("thutu", item.thutu, { shouldValidate: true });
      setValue("khoi", item.khoi._id, { shouldValidate: true });
      setValue("vaitro", item.vaitro, { shouldValidate: true });
    }
  }, [open]);


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
        maxWidth="xl"
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
            backgroundColor: "#03528f",
            margin: "0px",
          }}
        >
          <AutoAwesomeMotionIcon style={{ color: "white", fontSize: "24px", marginRight: "8px" }} />
          <span className="text-white text-[16px]">
            Chỉnh sửa tài khoản người dùng {item?.tenhienthi}
          </span>
          <CancelButton onClick={() => onCloseDialogEdit()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <form className='flex flex-col  mt-2 mx-8 ' onSubmit={handleSubmit(handleFormSubmit)}>
              <div className='flex flex-col md:flex-row md:flex-wrap'>
                    <div className='flex-col flex md:basis-1/3 p-1'>
                        <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Mã đơn vị: </label>
                        <input {...register("madonvi", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                    </div>
                <div className='flex-col flex md:basis-1/3 p-1'>
                  <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên tài khoản: </label>
                  <input {...register("tentaikhoan", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex md:basis-1/3 p-1'>
                  <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên hiển thị: </label>
                  <input {...register("tenhienthi", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex md:basis-1/3 p-1'>
                  <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Khối: </label>
                  <select disabled defaultValue="" {...register("khoi", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'>
                    <option value="" disabled>Vui lòng chọn khối của tài khoản</option>
                    {khois.map(i => <option key={i._id} value={i._id}>{i.tenkhoi}</option>)}
                  </select>
                </div>
                <div className='flex-col flex md:basis-1/3 p-1'>
                  <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Thứ tự xuất hiện: </label>
                  <input {...register("thutu", { required: true })} autoComplete='on' type="number" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400' min={1} />
                </div>
                <div className='flex items-center space-x-2 md:basis-1/3 p-1'>
                  <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Trạng thái sử dụng: </label>
                  <input {...register("trangthai")} type="checkbox" autoComplete='on' className='outline-none my-4 border rounded-md p-2 w-4 h-4 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex md:flex-1 p-1'>
                  <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Cấp tài khoản: </label>
                  <select {...register("captaikhoan", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'>
         <option value="Cấp Phòng">Cấp Phòng</option>
                            <option value="Cấp Xã">Cấp Xã</option>
                  </select>
                </div>
                        <div className='flex-col flex md:basis-1/3 p-1'>
                        <label className='text-[14px] font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Vai trò tài khoản: </label>
                        <select {...register("vaitro", { required: true })} type="text" className='outline-none my-2 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'>
                            <option value="Quản trị thông thường">Quản trị thông thường</option>
                            <option value="Quản trị hệ thống">Quản trị hệ thống</option>
                            <option value="Theo dõi, thống kê">Theo dõi, thống kê</option>
                        </select>
                    </div>
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
