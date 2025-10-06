import * as React from "react";
import Slide from "@mui/material/Slide";
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
import authApi from "../../../api/authApi";

export default function SettingSendUser({
  onSubmit,
  list,
  resetCheckbox
}) {
// console.log(list)
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


  let roleListTemp = [];
  // checkbox
  const handleChangeRoleList = (checkedFilter, unCheckedFilter) => {
    roleListTemp = [...roleList];
    if (unCheckedFilter.length > 0) {
      unCheckedFilter.forEach(e => {
        let index = roleListTemp.findIndex((el) => el.value === e.value);
        if (index !== -1) {
          roleListTemp.splice(index, 1)
        };
      });
    };

    roleListTemp = roleListTemp.concat(checkedFilter)
    roleListTemp = Array.from(new Map(roleListTemp.map(item => [item.value, item])).values()); //loại bỏ các phần tử giống nhau trong array
    setRoleList(roleListTemp)
    onSubmit(roleListTemp)
  };

  return (
    <>
      <div className='flex flex-col md:flex-row flex-wrap'>
        {list.length > 0 && list.map(item => {
          if (item.accounts.length > 0) {
            return (
              <RoleItem
                key={item.khoi}
                label={item.khoi}
                values={item.accounts}
                onChangeRoleList={handleChangeRoleList}
                roleNow={roleList}
                resetCheckbox={resetCheckbox}
              />
            )
          } else {
            return
          }
        })}
      </div>
    </>
  );
}
