import React, { useEffect, useState } from "react";
import { TableRow, TableCell } from '@mui/material';

const RoleItem = ({ label, values, onChangeRoleList, roleNow }) => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        setRoles(values)
    }, [])

    useEffect(() => {
        if (roleNow) {
            let newState = []
            values.forEach(i => {
                if (roleNow.includes(i.name)) {
                    newState.push({
                        name: i.name,
                        isChecked: true
                    })
                } else {
                    newState.push({
                        name: i.name,
                        isChecked: false
                    })
                }
            })
            setRoles(newState)
        } else {
            setRoles(values)
        }
    }, [roleNow])
    //function change checkbox
    const handleChange = (e) => {
        const { name, checked } = e.target;

        if (name === "allSelect") {
            let tempRole = roles.map(role => {
                return { ...role, isChecked: checked }
            }
            );
            setRoles(tempRole)
            let checkedFilter = [];
            let unCheckedFilter = [];

            tempRole.forEach(i => {
                if (i.isChecked === true) {
                    checkedFilter.push(i.name)
                } else {
                    unCheckedFilter.push(i.name)
                }
            });

            onChangeRoleList(checkedFilter, unCheckedFilter)
        } else {
            let tempRole = roles.map(role =>
                role.name === name ? { ...role, isChecked: checked } : role
            );
            setRoles(tempRole);
            let checkedFilter = [];
            let unCheckedFilter = [];

            tempRole.forEach(i => {
                if (i.isChecked === true) {
                    checkedFilter.push(i.name)
                } else {
                    unCheckedFilter.push(i.name)
                }
            })
            onChangeRoleList(checkedFilter, unCheckedFilter)
        }
    };


    return (
        <div className="my-2 lg:basis-1/2">
            <div className="flex items-center space-x-2">
                <span className="">Nhóm chức năng: <span className=" font-semibold">{label}</span></span>
                <input
                    className="w-5 h-5"
                    type="checkbox"
                    checked={roles.filter(role => role?.isChecked !== true).length < 1}
                    name="allSelect"
                    value="allSelect"
                    onChange={handleChange}
                />
            </div>
            {roles && roles.map((role, index) => (
                <div className="flex items-center space-x-2 ml-2" key={role.name}>
                    <input
                        className="w-4 h-4"
                        type="checkbox"
                        checked={role?.isChecked || false}
                        name={role.name}
                        onChange={handleChange}
                    />
                    <label>{role.name}</label>
                </div>
            ))}
        </div>
    );
}

export default RoleItem;
