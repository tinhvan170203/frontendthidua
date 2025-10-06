import React, { useState } from "react";
import PropTypes from "prop-types";
import { InputField } from "../../components/form-control/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mui/material";
import { PasswordField } from "../../components/form-control/PasswordField";
import axiosConfig from "../../api/axiosConfig";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import RedoIcon from "@mui/icons-material/Redo";
import { useSnackbar } from "notistack";
import userApi from "../../api/userApi";

const schema = yup
  .object({
    tentaikhoan: yup.string().required("Vui lòng nhập tên tài khoản"),
    matkhau: yup.string().required("Vui lòng nhập mật khẩu"),
    matkhaumoi: yup.string().required("Vui lòng nhập mật khẩu mới"),
  })
  .required();

function ChangePassPage(props) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const form = useForm({
    defaultValues: {
      tentaikhoan: "",
      matkhau: "",
      matkhaumoi: "",
    },
    resolver: yupResolver(schema),
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitForm = async (values) => {
    try {
      await userApi.changePage(values);
      enqueueSnackbar("Đổi mật khẩu thành công. Vui lòng đăng nhập lại", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-300 h-[100vh] flex justify-center items-center">
      <div className="w-[80%] bg-white py-8 px-2 rounded-md shadow-lg flex space-x-2 items-center">
        <div className="md:basis-1/2 sm:basis-0 lg:basis-2/3 basis-0">
          <img
            src="/loginimage.png"
            className="rounded-md md:p-8 sm:p-0 w-full shadow-md"
          />
        </div>

        <div className="md:basis-1/2 sm:basis-full lg:basis-1/3 p-4">
          <p className="text-md font-bold text-center">
            Đổi mật khẩu tài khoản
          </p>
          <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            <InputField
              name="tentaikhoan"
              label="Tên tài khoản"
              form={form}
              disabled={false}
            />

            <PasswordField
              name="matkhau"
              label="Mật khẩu cũ"
              form={form}
              disabled={false}
            />

            <PasswordField
              name="matkhaumoi"
              label="Mật khẩu mới"
              form={form}
              disabled={false}
            />

            {error && <p className="text-sm text-red-800">{error}</p>}

            <div>
              <Button
                type="submit"
                variant="contained"
                startIcon={<LoginIcon />}
                fullWidth
                style={{ margin: "8px auto" }}
              >
                Đổi mật khẩu
              </Button>
            </div>
            <Link to="/login">
              <p className="my-2 text-end underline font-semibold text-red-800">
                Quay lại đăng nhập
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

ChangePassPage.propTypes = {};

export default ChangePassPage;
