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



export default function DialogAddKiluatcanhan({
  open,
  onCloseDialogAdd,
  onSubmit
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

  const [roleList, setRoleList] = useState([]);
  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      const data = { ...values};
      await onSubmit(data);
      resetField('soQD');
      resetField('noidung');
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
            onCloseDialogAdd(event, reason);
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
            Thêm mới kỉ luật cá nhân
          </span>
          <CancelButton onClick={() => onCloseDialogAdd()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>

            <form className='mt-2 mx-8' onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='flex flex-wrap xl:flex-row flex-col flex-1 p-2'>
              <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Số QĐ kỉ luật: </label>
                <input {...register("soQD", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
              </div>
              <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày ký: </label>
                <input {...register("ngayky", { required: true })} type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
              </div>
              <div className='flex-col md:basis-1/3 flex flex-1 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Người ký: </label>
                <input {...register("nguoiky", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
              </div>
              <div className='flex-col md:basis-full flex flex-1 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Nội dung kỉ luật: </label>
                <input {...register("noidung", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
              </div>
              <div className='flex-col md:basis-full flex flex-1 px-1'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Hình thức kỉ luật: </label>
                <Controller
              control={control}
              name="hinhthuc"
              render={({ field }) => (
                <Select
                  options={[
                    { label: "Khiển trách", value: "Khiển trách" },
                    { label: "Cảnh cáo", value: "Cảnh cáo" },
                    { label: "Hạ cấp bậc hàm", value: "Hạ cấp bậc hàm" },
                    { label: "Tước quân tịch CAND", value: "Tước quân tịch CAND" },
                    
                  ]}
                  className="basic-multi-select my-4 p-1"
                  classNamePrefix="select"
                  placeholder="Vui lòng chọn hình thức"
                  required
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
                  <span>Thêm mới</span>
                </Button>
              </DialogActions>
              </div>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
