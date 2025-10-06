import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useEffect } from "react";

const BodyTableThiduathang = ({
    row,
    page,
    rowsPerPage,
    index,
    onHandleChangeItem,
    onHandleChangeText
    // all
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = useState('null');
    const [text, setText] = useState('');

    // const roles = useSelector((state) => state.authReducer.roles_x01);
    useEffect(()=>{
        if(row){
            setValue(row.thiduathang.result);
            setText(row.thiduathang.ghichu)
        };
    },[row]);


    const handleChange = (e)=> {
        setValue(e.target.value);
        onHandleChangeItem(row, e.target.value)
    };

    const handleChangeText = (e) => {
        setText(e.target.value);
        onHandleChangeText(row, e.target.value)
    };

    return (
        <TableRow key={row._id}>
            <TableCell
                className="border-r border-slate-300"
                align="center"
                style={{ fontWeight: "bold", padding: '2px 2px' }}
            >
                {page * rowsPerPage + index}
            </TableCell>
            <TableCell
                className="border-r border-slate-300"
                align="left"
                style={{ fontWeight: "bold", padding: '2px 2px' }}
            >
                {row.hoten}
            </TableCell>
            <TableCell className="border-r border-slate-300" align="left" style={{ padding: '2px 2px' }}>
                {row.bachamPopulate[0].bacham}
            </TableCell>
            <TableCell className="border-r border-slate-300" align="left" style={{ padding: '2px 2px' }}>
                <p className="truncate">{row.donviPopulate[0].tendoi}</p>
            </TableCell>
            <TableCell className="border-r border-slate-300" align="left"  style={{ fontWeight: "bold", padding: '2px 2px' }}>
                <select className="outline-none px-2 w-full" onChange={(e)=>handleChange(e)} value={value}>
                    <option value='null'>Chưa phân loại</option>
                    <option value="red">Cờ đỏ</option>
                    <option value="blue">Cờ xanh</option>
                    <option value="yellow">Cờ vàng</option>
                </select>
            </TableCell>
            <TableCell className="border-r border-slate-300" align="left" style={{padding: '2px 2px' }}>
                <input type="text" className="w-full outline-none border rounded-md px-2 py-[6px] border-neutral-300
                   focus:border-blue-500 focus:border-2"
                    value={text} onChange={(e)=>handleChangeText(e)}
                />
            </TableCell>
        </TableRow>
    );
};

export default BodyTableThiduathang;
