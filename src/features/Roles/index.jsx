import GridView from '@mui/icons-material/GridView'
import React, { useState, useEffect, useMemo } from 'react'
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import notificationApi from '../../api/notificationApi';
import { toast } from 'react-toastify';

import { useOutletContext } from "react-router-dom";
import DialogDelete from '../../components/DialogDelete';
import RoleItem from './components/RoleItem';
import roleApi from '../../api/roleApi';
import TableRoles from './components/TableRoles';
import EditModalRole from './components/EditModalRole';
import { useSelector } from 'react-redux';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [handleChangeNotifications, handleLoading] = useOutletContext();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);


  const [openDialogEdit, setOpenDialogEdit] = useState({
    status: false,
    item: null,
  });

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit({
      ...openDialogEdit,
      status: false,
    });
  };

  //open dialog edit
  const handleOpenDialogEdit = (item) => {
    setOpenDialogEdit({
      item,
      status: true,
    });
  };

  //state mở hộp thoại delete
  const [openDialogDelete, setOpenDialogDelete] = useState({
    status: false,
    id_Delete: null,
  });

  //open dialog delete
  const handleOpenDialogDelete = (id) => {
    setOpenDialogDelete({
      status: true,
      id_Delete: id,
    });
  };

  const handleCancelDelete = () => {
    setOpenDialogDelete({
      ...openDialogDelete,
      status: false,
    });
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete({
      ...openDialogDelete,
      status: false,
    });
  };

  let roleListTemp = [];
  const [roleList, setRoleList] = useState([]);

  // checkbox handle change
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


  const {
    register,
    handleSubmit,
    control,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tennhom: "",
      thutu: 1,
      mota: "",
      roles: [],
      status: true
    },
  });



   //fetch roles
   useEffect(() => {
    const fetchData = async () => {
      try {
        handleLoading(true);
        let res = await roleApi.getRoles();
 
        setRoles(res.data);
        setTimeout(() => {
          handleLoading(false);
        }, 400);
      } catch (error) {
        if (
          error.message ===
          "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại"
        ) {
          navigate("/login");
          handleLoading(false);
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        console.log(error.message)
      }
    };

    fetchData();
  }, []);
  //handle submit add role group
  const onSubmit = async (values) => {
    let data = { ...values, roles: roleList };
    handleLoading(true);
    try {
        let res = await roleApi.addRole(data);
        setRoles(res.data.rolesList);
        setTimeout(() => {
          handleLoading(false);
        }, 400);

        resetField('tennhom');
        resetField("mota");
        resetField("status");
        resetField("thutu");
        setRoleList([])
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleLoading(false);
    }
  };

   //handle submit edit role
   const handleSubmitEdit = async (values) => {
    let data = { ...values};
    handleLoading(true);
    try {
      let res = await roleApi.editRole(data);
      setRoles(res.data.rolesList);

      setTimeout(() => {
        handleLoading(false);
      }, 400);

      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleLoading(false);
    }
  };

  // hanle delete roles 
  const handleConfirmDelete = async () => {
    handleLoading(true);
    try {
      let res = await roleApi.deleteRole(openDialogDelete.id_Delete);
      setRoles(res.data.rolesList);

      setTimeout(() => {
        handleLoading(false);
      }, 400);

      setOpenDialogDelete({
        ...openDialogDelete,
        status: false
      });

      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setOpenDialogDelete({
        ...openDialogDelete,
        status: false
      });
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleLoading(false);
    }
  };
  const rolesList = useSelector((state) => state.authReducer.roles_quanlydoanvien);
  return (  
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='flex items-center space-x-1'>
        <GridView color='primary' fontSize="large" />
        <h4 className='font-bold text-gray-800 text-lg'>Quản lý nhóm quyền</h4>
      </div>

      {rolesList && rolesList.includes('thêm nhóm quyền') && (
      <form className='mt-2 mx-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex-col flex'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên nhóm quyền: </label>
          <input {...register("tennhom", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
        </div>
        <div className='flex-col flex'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Mô tả nhóm quyền: </label>
          <input {...register("mota", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
        </div>
        <div className='flex space-x-2'>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Thứ tự xuất hiện: </label>
            <input {...register("thutu", { required: true })} type="number" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:border-blue-500 focus:border-2'/>
          </div>
          <div className='flex-col flex md:basis-1/2'>
            <label className='underline font-semibold'>Trạng thái sử dụng:</label>
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
              values={[{ name: 'xem nâng cao' },{ name: 'thêm nâng cao' },{ name: 'sửa nâng cao' },{ name: 'xóa nâng cao' }]}
              onChangeRoleList={handleChangeRoleList} 
              roleNow={roleList}
            />
          </div>
        </div>

        <div className='md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
          <Button type='submit' sx={{ width: "220px", backgroundColor: "gray" }} color="primary" variant='contained'><AddIcon /> Thêm mới</Button>
        </div>
      </form>
      )}
      
      <div className='mt-6 mx-8'>
      <TableRoles 
        list={roles}
        onClickOpenDialogDelete={handleOpenDialogDelete}
        onClickOpenDialogEdit={handleOpenDialogEdit} />
      </div>
        
        <EditModalRole 
           open={openDialogEdit.status}
           item={openDialogEdit.item}
           onCloseDialogEdit={handleCloseDialogEdit}
           onSubmit={handleSubmitEdit}
        />

      <DialogDelete
         open={openDialogDelete.status}
         onCloseDialogDelete={handleCloseDialogDelete}
         onConfirmDelete={handleConfirmDelete}
         onCancelDelete={handleCancelDelete}
      />  
    </div>
  )
}

export default Roles
