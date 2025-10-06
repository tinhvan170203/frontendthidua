import React, { useEffect, useState } from "react";

const RoleItem = ({ label, values, onChangeRoleList, roleNow,resetCheckbox }) => {
    const [roles, setRoles] = useState([]);
    const [rolesDisplay, setRolesDisplay] = useState([]);
    const [text, setText] = useState("");
    // console.log(roleNow)
    useEffect(() => {
        setRoles(values);
        setRolesDisplay(values);
    }, [values]);

    useEffect(()=>{
        if(resetCheckbox){
            setRoles(values);
            setRolesDisplay(values);
        }
    },[resetCheckbox])

      useEffect(()=>{
        if(roles.length > 0){
            const timer = setTimeout(()=>{
              let arr = [...roles];
              let newArr = arr.filter(i=>i.name.toLowerCase().includes(text.toLowerCase()));
              setRolesDisplay(newArr)
            }, 500);
            return ()=> clearTimeout(timer)
        }
      },[text]);

    useEffect(() => {
        if (roleNow) {
            let newState = [];
            values.forEach(i => {
                if(roleNow.findIndex((e=>e.value === i.value)) !== -1) {
                    newState.push({
                        value: i.value,
                        name: i.name,
                        isChecked: true
                    })
                } else {
                    newState.push({
                        value: i.value,
                        name: i.name,
                        isChecked: false
                    })
                }
            });
            setRoles(newState)
                let newArr = newState.filter(i=>i.name.toLowerCase().includes(text.toLowerCase()));
                setRolesDisplay(newArr)
        } else {
            setRoles(values)
            let newArr = values.filter(i=>i.name.toLowerCase().includes(text.toLowerCase()));
            setRolesDisplay(newArr)
        }
    }, [roleNow, values]);

    //function change checkbox
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        // console.log(checked)
        if (name === "allSelect") {// khi check all, kiểm tra xem rolesDisplay đang có những phần tử nào
            // thì check theo giá trị của checkall sau đó cập nhập roles các phần tử trùng với rolesDisplay
            let tempRolesDisplay = rolesDisplay.map(role => {
                return { ...role, isChecked: checked }
            }
            );
            // console.log(tempRolesDisplay)
            setRolesDisplay(tempRolesDisplay);

            let tempRoles = roles.map(role => {
                let index = tempRolesDisplay.findIndex(e=> e.value.includes(role.value));
                if(index !== -1){
                    return {...role, isChecked: tempRolesDisplay[index].isChecked}
                }
                return role
            });
            setRoles(tempRoles);

            let checkedFilter = [];
            let unCheckedFilter = [];

            tempRoles.forEach(i => {
                if (i.isChecked === true) {
                    checkedFilter.push({value: i.value, name: i.name})
                } else {
                    unCheckedFilter.push({value: i.value, name: i.name})
                }
            });

            onChangeRoleList(checkedFilter, unCheckedFilter)
        } else {
            let tempRole = roles.map(role =>
                role.value === value ? { ...role, isChecked: checked } : role
            );

            let tempRolesDisplay = rolesDisplay.map(role =>
                role.value === value ? { ...role, isChecked: checked } : role
            );

            setRolesDisplay(tempRolesDisplay);
            setRoles(tempRole);
            let checkedFilter = [];
            let unCheckedFilter = [];

            tempRole.forEach(i => {
                if (i.isChecked === true) {
                    checkedFilter.push({value: i.value, name: i.name})
                } else {
                    unCheckedFilter.push({value: i.value, name: i.name})
                }
            })
            onChangeRoleList(checkedFilter, unCheckedFilter)
        }
    };

    const handleChangeText  = (e) => {
        setText(e.target.value)
    };

    return (
        <div className="my-2 md:basis-1/4 h-[300px] overflow-y-scroll hide-scrollbar">
            <div className="flex items-center space-x-2">
                <span className=""><span className=" font-semibold uppercase text-red-600">{label}</span></span>
                <input
                    className="w-4 h-4"
                    type="checkbox"
                    checked={rolesDisplay.filter(role => role?.isChecked === true).length === rolesDisplay.length && rolesDisplay.length !== 0}
                    name="allSelect"
                    value="allSelect"
                    onChange={handleChange}
                    disabled={rolesDisplay.length === 0}
                />
            </div>
            <div>
                <input  disabled={roles.length === 0} onChange={(e)=>handleChangeText(e)} type="text" 
                className={roles.length === 0 ? "hidden": ""+ 'outline-none border w-full my-2 rounded-md text-sm px-2 text-red-600'} 
                    placeholder={`Tìm kiếm trong ${label}`}
                />
            </div>
            {rolesDisplay && rolesDisplay.map((role, index) => (
                <div className="flex items-center space-x-2 ml-2" key={role.name}>
                    <input
                        className="w-4 h-4"
                        type="checkbox"
                        checked={role?.isChecked}
                        name={role.name}
                        value={role.value}
                        onChange={handleChange}
                    />
                    <label>{role.name}</label>
                </div>
            ))}
        </div>
    );
}

export default RoleItem;
