import React, { useEffect, useState } from 'react'
import TableCom from '../componentsTuchoiCanbo/TableCom'
import canboApi from '../../../api/canboApi';
import doiApi from '../../../api/doiApi';
import Button from "@mui/material/Button";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import { array } from 'yup';
import { useSelector } from 'react-redux';


const QuanlyYeucauTuchoiCanbo = () => {
      let vaitro = useSelector((state) => state.authReducer.vaitro_theodoithidua);
    const navigate = useNavigate();
      if (vaitro !== "Quản trị thông thường") {
        toast.error("Tài khoản không có truy cập trang này", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        return <Navigate to='/login' replace />;
      };
    const [handleChangeNotifications, handleLoading, handleCountListTiepnhan,handleCountListTuchoi, handleCountListDangDoiTiepnhan ] = useOutletContext();
    const [list, setList] = useState([]);
    const [checkList, setCheckList] = useState([]);


    useEffect(() => {
        const fetch = async () => {
            try {
                let res = await canboApi.fetchListBiTuchoi();
                setList(res.data)
            } catch (error) {
                console.log(error.message)
            }
        };

        fetch()
    }, []);

    const handleChangeCheckList = (data) => {
        setCheckList(data)
    };

    const handleDongyTiepnhan = async () => {
        let values = [...checkList];
        values = values.filter(e => e.isChecked === true).map(i => i.value)
        //  console.log(values)
        if (values.length === 0) {
            alert("Vui lòng tích chọn cán bộ, chiến sĩ xác nhận thu hồi yêu cầu luân chuyển");
            return
        };

        handleLoading(true);
        try {
            let res = await canboApi.backtoDonvi({ array: values });
            handleCountListTuchoi()
            let newList = [...list];

            newList = newList.filter(i => values.includes(i._id) === false)
            // console.log(newList)
            setList(newList);

            handleLoading(false);
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
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
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            };

            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            handleLoading(false);
        }
    };



    return (
        <div className='pr-2' data-aos="fade-left" data-aos-once="true">
            <div className='my-2'>
                <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản lý yêu cầu điều chuyển cán bộ bị từ chối</h4>
            </div>
            <div className='flex items-center space-x-2 justify-end my-4'>
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleDongyTiepnhan()}
                >
                    Xác nhận thu hồi về đơn vị
                </Button>
            </div>

            <div className='mt-6 mx-0 shadow-md shadow-gray-500 rounded-md'>
                <TableCom
                    list={list}
                    onClickOpenDialogEdit={() => { }}
                    onClickOpenDialogDelete={() => { }}
                    // onClickHandleConfirmNhan={() => handleClickNhan()}
                    onChangeCheckList={handleChangeCheckList}
                />
            </div>

        </div>
    )
}

export default QuanlyYeucauTuchoiCanbo