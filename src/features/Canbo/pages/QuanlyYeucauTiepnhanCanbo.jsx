import React, { useEffect, useState } from 'react'
import TableCom from '../componentsTiepnhanCanbo/TableCom'
import canboApi from '../../../api/canboApi';
import doiApi from '../../../api/doiApi';
import Button from "@mui/material/Button";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import { array } from 'yup';
import { useSelector } from 'react-redux';


const QuanlyYeucauTiepnhanCanbo = () => {
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
  const [handleChangeNotifications, handleLoading, handleCountListTiepnhan, handleCountListTuchoi, handleCountListDangDoiTiepnhan] = useOutletContext();
  const [list, setList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [donvis, setDonvis] = useState([]);


  const [donvi, setDonvi] = useState("");
  const [ghichu, setGhichu] = useState("")
  const [ngayvedonvi, setNgayvedonvi] = useState("")
  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await canboApi.fetchCanboYeucauTiepnhan();
        let res1 = await doiApi.getDois({ tendoi: "", donvi: "" });
        setDonvis(res1.data.map(i => ({ label: i.tendoi, value: i._id })))
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
      alert("Vui lòng tích chọn cán bộ, chiến sĩ được tiếp nhận và chọn đội, tổ công tác");
      return
    };

    if (donvi === "") {
      alert("Vui lòng chọn đội, tổ công tác sau khi tiếp nhận cán bộ, chiến sĩ");
      return
    };
    // console.log(donvi)
    if (ngayvedonvi === "") {
      alert("Vui lòng chọn ngày bắt đầu công tác tại đơn vị");
      return
    };

    handleLoading(true);
    try {
      let res = await canboApi.dongyYeucauTiepnhan({ array: values, donvi, ghichu, ngayvedonvi });
      // handleCountListTuchoi()
      handleCountListTiepnhan();
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

  const handleTuchoiTiepnhan = async () => {
    let values = [...checkList];
    values = values.filter(e => e.isChecked === true).map(i => i.value)
    //  console.log(values)
    if (values.length === 0) {
      alert("Vui lòng tích chọn cán bộ, chiến sĩ được tiếp nhận và chọn đội, tổ công tác");
      return
    };

    handleLoading(true);
    try {
      let res = await canboApi.tuchoiYeucauTiepnhan({ array: values, ghichu });
      handleCountListTiepnhan();
      let newList = [...list];

      newList = newList.filter(i => values.includes(i._id) === false)
      // console.log(newList)
      setList(newList);

      handleLoading(false);
      // toast.success(res.data.message, {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: false,
      //   draggable: false,
      //   progress: undefined,
      //   theme: "light",
      // });
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
        <h4 className='uppercase font-bold text-blue-800 text-sm md:text-[18px]'>Quản lý yêu cầu tiếp nhận cán bộ từ đơn vị khác chuyển đến</h4>
      </div>
      <div className='flex items-center space-x-2 justify-end my-4'>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => handleDongyTiepnhan()}
        >
          Tiếp nhận cán bộ
        </Button>

        <Button
          variant="contained"
          color="error"
          size="small"
          style={{ marginLeft: "4px" }}
          onClick={() => handleTuchoiTiepnhan()}
        >
          Từ chối yêu cầu
        </Button>
      </div>

      <div className='flex-col flex md:basis-1/2 flex-1 px-1'>
        <label className='underline font-semibold'>Ghi chú đính kèm: </label>
        <input onChange={(e) => setGhichu(e.target.value)} value={ghichu} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-300
                   focus:border-blue-500 focus:border-2'/>
      </div>

      <div className='shadow-sm shadow-gray-500 rounded-md py-2'>
        <h5 className='italic px-2 py-3 text-red-600'>Các trường thông tin yêu cầu trước khi thực hiện thao tác "Tiếp nhận cán bộ"</h5>
        <div>
          <div className='flex-col flex flex-1 md:basis-1/2 px-1'>
            <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Vui lòng chọn đội nghiệp vụ, tổ công tác khi tiếp nhận cán bộ, chiến sĩ:</label>
            <Select
              options={donvis}
              className="basic-multi-select my-4 rounded-md"
              classNamePrefix="select"
              placeholder="Chọn đội nghiệp vụ, tổ công tác cho cán bộ chiến sĩ"
              required
              onChange={(e) => setDonvi(e.value)}
            />
          </div>
        </div>
        <div className='flex-col flex md:basis-1/2 flex-1 px-1'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ngày nhận công tác tại đơn vị: </label>
          <input onChange={(e) => setNgayvedonvi(e.target.value)} value={ngayvedonvi} type="date" className='outline-none my-4 border rounded-md p-2 border-neutral-300
                   focus:border-blue-500 focus:border-2'/>
        </div>
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

export default QuanlyYeucauTiepnhanCanbo