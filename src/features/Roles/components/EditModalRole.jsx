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
import { useEffect, useState } from "react";
import RoleItem from './RoleItem';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CancelButton = styled(IconButton)({
  position: "absolute",
  right: "16px",
  top: "4px",
});



export default function EditModalRole({
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
      tennhom: "",
      mota: "",
      thutu: 1,
      status: true
    },
  });

  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    if (item) {
      setValue("tennhom", item.tennhom, { shouldValidate: true });
      setValue("mota", item.mota, { shouldValidate: true });
      setValue("thutu", item.thutu, { shouldValidate: true });
      setValue("status", item.status, { shouldValidate: true });
      if (item) {
        setRoleList(item.roles)
      }
    }
  }, [item]);

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      const data = { ...values, id_edit: item._id, roles: roleList };
      await onSubmit(data);
      onCloseDialogEdit();
    }
  };

  let roleListTemp = [];
  // checkbox
  const handleChangeRoleList = (checkedFilter, unCheckedFilter) => {
    roleListTemp = roleList;

    if (unCheckedFilter.length > 0) {
      unCheckedFilter.forEach(e => {
        let index = roleListTemp.findIndex((el) => el === e);
        if (index !== -1) {
          roleListTemp.splice(index, 1)
        };
      });
    };
    roleListTemp = roleListTemp.concat(checkedFilter)
    roleListTemp = Array.from(new Set(roleListTemp)) //loại bỏ các phần tử giống nhau trong array
    setRoleList(roleListTemp)
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
            Chỉnh sửa nhóm quyền
          </span>
          <CancelButton onClick={() => onCloseDialogEdit()}>
            <CancelIcon style={{ color: "white" }} />
          </CancelButton>
        </DialogTitle>
        <DialogContent>
          <Box>

            <form className='mt-2 mx-8' onSubmit={handleSubmit(handleFormSubmit)}>
              <div className='flex-col flex'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên nhóm quyền: </label>
                <input {...register("tennhom", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
              </div>
              <div className='flex-col flex'>
                <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Mô tả nhóm quyền: </label>
                <input {...register("mota", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
              </div>
              <div className='flex space-x-2'>
                <div className='flex-col flex md:basis-1/2'>
                  <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Thứ tự xuất hiện: </label>
                  <input {...register("thutu", { required: true })} type="number" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
                </div>
                <div className='flex-col flex md:basis-1/2'>
                  <label className='underline font-semibold'>Trạng thái hiển thị:</label>
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
              </div>

              <div>
                <div className='flex flex-col lg:flex-row flex-wrap'>
                <RoleItem
              label="Quản trị tài khoản"
              values={[{ name: 'xem tài khoản' },{ name: 'thêm tài khoản' }, { name: 'sửa tài khoản' }, { name: 'xóa tài khoản' }]}
              onChangeRoleList={handleChangeRoleList} 
              roleNow={roleList}
            />
            <RoleItem
              label="Quản trị nhóm quyền"
              values={[{ name: 'xem nhóm quyền' },{ name: 'thêm nhóm quyền' }, { name: 'sửa nhóm quyền' }, { name: 'xóa nhóm quyền' }]}
              onChangeRoleList={handleChangeRoleList} 
              roleNow={roleList}
            />
            <RoleItem
              label="Quản trị mô hình tổ chức"
              values={[{ name: 'xem mô hình tổ chức' },{ name: 'thêm mô hình tổ chức' }, { name: 'sửa mô hình tổ chức' }, { name: 'xóa mô hình tổ chức' }]}
              onChangeRoleList={handleChangeRoleList} 
              roleNow={roleList}
            />
            <RoleItem
              label="Quản trị chức vụ"
              values={[{ name: 'xem chức vụ' },{ name: 'thêm chức vụ' }, { name: 'sửa chức vụ' }, { name: 'xóa chức vụ' }]}
              onChangeRoleList={handleChangeRoleList} 
              roleNow={roleList}
            />
            <RoleItem
              label="Quản trị bậc hàm"
              values={[{ name: 'xem bậc hàm' },{ name: 'thêm bậc hàm' }, { name: 'sửa bậc hàm' }, { name: 'xóa bậc hàm' }]}
              onChangeRoleList={handleChangeRoleList} 
              roleNow={roleList}
            />
            <RoleItem
              label="Quản trị thông báo"
              values={[{ name: 'xem thông báo' },{ name: 'thêm thông báo' }, { name: 'sửa thông báo' }, { name: 'xóa thông báo' }]}
              onChangeRoleList={handleChangeRoleList} 
              roleNow={roleList}
            />
            <RoleItem
              label="Quản trị đoàn viên"
              values={[{ name: 'xem đoàn viên' },{ name: 'thêm đoàn viên' }, { name: 'sửa đoàn viên' }, { name: 'xóa đoàn viên' }, {name: "thay-doi-truong-thanh-doan"}]}
              onChangeRoleList={handleChangeRoleList} 
              roleNow={roleList}
            />
            <RoleItem
              label="Quản trị khen thưởng, kỉ luật"
              values={[{ name: 'xem khen thưởng, kỉ luật' },{ name: 'thêm khen thưởng, kỉ luật' }, { name: 'sửa khen thưởng, kỉ luật' }, { name: 'xóa khen thưởng, kỉ luật' },{ name: 'thêm thi đua' }]}
              onChangeRoleList={handleChangeRoleList} 
              roleNow={roleList}
            />
            <RoleItem
              label="Thống kê, báo cáo"
              values={[{ name: 'xem thống kê' },{ name: 'thống kê khen thưởng' },{ name: 'thống kê thi đua' },{ name: 'thống kê trưởng thành đoàn' }]}
              onChangeRoleList={handleChangeRoleList} 
              roleNow={roleList}
            />
            <RoleItem
              label="Quản trị nâng cao"
              values={[{ name: 'xem nâng cao' },{ name: 'thêm nâng cao' },{ name: 'sửa nâng cao' },{ name: 'xóa nâng cao' }, {name: "xem phân hệ admin"}]}
              onChangeRoleList={handleChangeRoleList} 
              roleNow={roleList}
            />
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
