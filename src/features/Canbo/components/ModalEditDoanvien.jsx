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



export default function ModalEditDoanvien({
  open,
  item,
  onCloseDialogEdit,
  onSubmit,
}) {
  const [dangvien, setDangvien] = useState(true);

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
      hoten: "",
      ngaysinh: "",
      quequan: "",
      sohieuCAND: "",
    },
  });


  useEffect(() => {
      setDangvien(watch('dangvien')?.value)
  }, [watch('dangvien')])

  useEffect(() => {
    if (item) {
      setValue("hoten", item.hoten, { shouldValidate: true });
      setValue("ngaysinh", item.ngaysinh, { shouldValidate: true });
      setValue("CCCD", item.CCCD, { shouldValidate: true });
      setValue("gioitinh", { value: item.gioitinh, label: item.gioitinh }, { shouldValidate: true });
      setValue("quequan", item.quequan, { shouldValidate: true });
      setValue("sohieuCAND", item.sohieuCAND, { shouldValidate: true });
      setValue("trinhdo", { value: item.trinhdo, label: item.trinhdo }, { shouldValidate: true });
      setValue("lyluanchinhtri", { value: item.lyluanchinhtri, label: item.lyluanchinhtri }, { shouldValidate: true });
      setValue('dangvien', { value: item.dangvien, label: item.dangvien === true ? "Có" : "Không" })
      setValue('ngayvaodang', item.ngayvaodang)
      setDangvien(item.dangvien)
    }
  }, [item]);

  const onSubmitForm = async (values) => {
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
            backgroundColor: "#03528f",
            margin: "0px",
          }}
        >
          <AutoAwesomeMotionIcon style={{ color: "white", fontSize: "24px", marginRight: "8px" }} />
          <span className="text-white text-[18px]">
            Chỉnh sửa thông tin của cán bộ, chiến sĩ
          </span>
          <CancelButton onClick={() => onCloseDialogEdit()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <form className='mt-2 mx-8' onSubmit={handleSubmit(onSubmitForm)}>
              <div className='flex space-x-2 items-start'>
                <div className='flex flex-wrap xl:flex-row flex-col flex-1 p-2 rounded-md'>
                  <div className='flex-col flex md:basis-1/3 flex-1 px-1'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Họ và tên: </label>
                    <input {...register("hoten", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                  </div>
                  <div className='flex-col flex flex-1 md:basis-1/6 px-1'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Giới tính:</label>
                    <Controller
                      control={control}
                      name="gioitinh"
                      render={({ field }) => (
                        <Select
                          options={[
                            { value: "Nam", label: "Nam" },
                            { value: "Nữ", label: "Nữ" }
                          ]}
                          className="basic-multi-select my-4 p-1"
                          classNamePrefix="select"
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div className='flex-col flex md:basis-1/6 flex-1 px-1'>
                    <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày sinh: </label>
                    <input {...register("ngaysinh")} placeholder="dd-mm-yyyy" type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400' required />
                  </div>
                
                  <div className='flex-col flex flex-1 md:basis-1/6 px-1'>
                    <label className='underline font-semibold'>Là đảng viên:</label>
                    <Controller
                      control={control}
                      name="dangvien"
                      render={({ field }) => (
                        <Select
                          options={[
                            { value: true, label: "Có" },
                            { value: false, label: "Không" }
                          ]}
                          className="basic-multi-select my-4 p-1"
                          classNamePrefix="select"
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {dangvien === true ?
                    (<div className='flex-col flex md:basis-1/4 flex-1 px-1'>
                      <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày kết nạp vào đảng: </label>
                      <input {...register("ngayvaodang")} placeholder="dd-mm-yyyy" type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                    </div>) : ""}
                </div>
              </div>
              <div className='md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center mt-4'>
                <Button type='submit' color="primary" variant='contained'><AddIcon /> Cập nhật</Button>
              </div>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
