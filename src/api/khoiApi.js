import axiosConfig from "./axiosConfig";

const khoiApi = {
    getKhois(params){
        const url = `/khoi/fetch`;
        return axiosConfig.get(url, {params})
    },
    addKhoi(data){
        const url = "/khoi/add";
        return axiosConfig.post(url, data)
    },
    editKhoi(data){
        const url =`/khoi/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteKhoi(id, params){
        const url = `/khoi/delete/${id}`;
        return axiosConfig.delete(url,{params})
    }
};

export default khoiApi;