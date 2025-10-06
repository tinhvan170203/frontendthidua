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
  khois
}) {

  const {
    register,
    handleSubmit,
    control,
    resetField,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tendonvi: "",
      kyhieu: "",
      khoi: "",
      thutu: 1,
      trangthai: true,
      status: true
    },
  });

  useEffect(() => {
    if (item) {
      setValue("tendonvi", item.tendonvi, { shouldValidate: true });
      setValue("kyhieu", item.kyhieu, { shouldValidate: true });
      setValue("thutu", item.thutu, { shouldValidate: true });
      setValue("status", item.status, { shouldValidate: true });
      setValue("trangthai", item.trangthai, { shouldValidate: true });
      setValue("khoi", {value: item.khoi._id, label: item.khoi.tenkhoi}, { shouldValidate: true });
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
            backgroundColor: "#03528f",
            margin: "0px",
          }}
        >
          <AutoAwesomeMotionIcon style={{ color: "white", fontSize: "24px", marginRight: "8px" }} />
          <span className="text-white text-[18px]">
            Chỉnh sửa khối, hệ, lực lượng
          </span>
          <CancelButton onClick={() => onCloseDialogEdit()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>

              <form className='mt-2 mx-8' onSubmit={handleSubmit(handleFormSubmit)}>
              <div className='flex-col flex'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên đơn vị: </label>
          <input {...register("tendonvi", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
        </div>
        <div className='flex-col flex'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ký hiệu đơn vị: </label>
          <input {...register("kyhieu", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
        </div>
        <div className='flex space-x-2'>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Thứ tự: </label>
            <input {...register("thutu", { required: true })} type="number" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col flex md:basis-1/4'>
            <label className='underline font-semibold'>Đơn vị trực thuộc Công an tỉnh:</label>
            <Controller
              name="status"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch
                  checked={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className='flex-col flex md:basis-1/4'>
            <label className='underline font-semibold'>Trạng thái:</label>
            <Controller
              name="trangthai"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch
                  checked={value}
                  onChange={onChange}
                />
              )}
            />
          </div>


        </div>
          <div className='flex-col flex'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Khối, hệ, lực lượng: </label>
            <Controller
              control={control}
              name="khoi"
              render={({ field }) => (
                <Select
                  // defaultValue={item?.khoi._id}
                  required={true}
                  name="khoi"
                  options={khois}
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
