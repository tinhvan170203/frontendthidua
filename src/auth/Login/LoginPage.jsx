import React, { useState } from "react";
import PropTypes from "prop-types";
import { InputField } from "../../components/form-control/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, LinearProgress } from "@mui/material";
import { PasswordField } from "../../components/form-control/PasswordField";
import axiosConfig from "./../../api/axiosConfig";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import RedoIcon from "@mui/icons-material/Redo";
import { useDispatch } from "react-redux";
import { loginAccount } from "../authSlice";
import { useSnackbar } from "notistack";
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const schema = yup
  .object({
    tentaikhoan: yup.string().required("Vui lòng nhập tên tài khoản"),
    matkhau: yup.string().required("Vui lòng nhập mật khẩu"),
  })
  .required();

function LoginPage(props) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const form = useForm({
    defaultValues: {
      tentaikhoan: "",
      matkhau: "",
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitForm = async (values) => {
    const action = loginAccount(values);
    try {
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);
      enqueueSnackbar("Đăng nhập tài khoản thành công!", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        variant: "success",
      });

      Cookies.remove("refreshToken_theodoithidua");
      Cookies.set("refreshToken_theodoithidua", data.refreshToken, {
        expires: 7,
        secure: true,
      });
      // navigate("/admin/danh-sach-cau-hoi");
    } catch (error) {
      setError("Sai tên tài khoản hoặc mật khẩu");
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="bg-gray-300 h-[100vh] flex justify-center items-center">
      <div className="w-[90%] bg-white py-8 px-2 rounded-md shadow-lg flex space-x-2 items-center">
        <div className="md:basis-1/2 sm:basis-0 lg:basis-2/3 basis-0">
          <img
            src="/loginimage.png"
            className="rounded-md md:p-8 sm:p-0 w-full shadow-md"
          />
        </div>

        <div className="md:basis-1/2 sm:basis-full lg:basis-1/3 p-4">
          {isSubmitting && <LinearProgress />}
          <div className="flex flex-col items-center">
            <img
              src="/cong-an-hieu.png"
              alt="conganhieu"
              className="w-[100px]"
            />
            <p className="font-bold text-center">
              Hệ thống thi trắc nghiệm trên nền tảng số Công an tỉnh Hưng Yên
            </p>
          </div>
          <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            <InputField
              name="tentaikhoan"
              label="Tên tài khoản"
              form={form}
              disabled={false}
            />

            <PasswordField
              name="matkhau"
              label="Mật khẩu"
              form={form}
              disabled={false}
            />

            {error && (
              <p className="text-md text-center m-2 text-red-800">{error}</p>
            )}

            <div>
              <Button
                type="submit"
                variant="contained"
                startIcon={<LoginIcon />}
                fullWidth
                style={{ margin: "8px auto" }}
              >
                Đăng nhập
              </Button>
            </div>

            <Link to="/doimatkhau">
              <p className="my-2 text-end underline font-semibold text-red-800">
                Đổi mật khẩu
              </p>
            </Link>
          </form>
          {/* <p className="text-center text-slate-500 mt-2 text-sm md:text-md">Bản quyền thuộc đội Công nghệ thông tin - PV01</p> */}
          <p className="text-center text-slate-500 mt-2 text-sm">
              Công trình thanh niên của chi đoàn Phòng Tham mưu
            </p>
            <p className="text-center text-slate-500 text-sm md:text-md">@2023 - Design by Vu Van Tinh</p>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {};

export default LoginPage;
