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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CancelButton = styled(IconButton)({
  position: "absolute",
  right: "16px",
  top: "4px",
});



export default function ModalEditChucvu({
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      chucvu: "",
      thutu: 1
    },
  });

  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    if (item) {
      setValue("noidung", item.noidung, { shouldValidate: true });
      setValue("thutu", item.thutu, { shouldValidate: true });
      setValue("trangthai", item.status);
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
            backgroundColor: "#03528f",
            margin: "0px",
          }}
        >
          <AutoAwesomeMotionIcon style={{ color: "white", fontSize: "24px", marginRight: "8px" }} />
          <span className="text-white text-[18px]">
            Chỉnh sửa nội dung ảnh nổi bật
          </span>
          <CancelButton onClick={() => onCloseDialogEdit()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>

            <form className='mt-2 mx-8' onSubmit={handleSubmit(handleFormSubmit)}>
               <div className='flex-col flex'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Nội dung ảnh: </label>
                    <input {...register("noidung", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                </div>
                <div className='flex-col flex md:basis-1/2'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Thứ tự: </label>
                    <input {...register("thutu", { required: true })} type="number" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                </div>
                <div className='space-x-3 items-center flex md:basis-1/6 p-1'>
                    <label className='underline  font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Trạng thái sử dụng: </label>
                    <input {...register("trangthai")} type="checkbox" autoComplete='on' className='outline-none my-4 border rounded-md p-2 w-6 h-6 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
                </div>
              <img className="w-[300px]" src={`/img/${item?.url}`} alt="img" />
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
