import axiosConfig from "./axiosConfig";

const roleApi = {
    getRoles(params){
        const url = `/role/fetch`;
        return axiosConfig.get(url, {params})
    },
    addRole(data){
        const url = "/role/add";
        return axiosConfig.post(url, data)
    },
    editRole(data){
        const url =`/role/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteRole(id, params){
        const url = `/role/delete/${id}`;
        return axiosConfig.delete(url,{params})
    }
};

export default roleApi;