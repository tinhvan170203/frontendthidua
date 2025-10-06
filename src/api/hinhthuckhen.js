import axiosConfig from "./axiosConfig";

const hinhthuckhenApi = {
    getHinhthuckhens(params){
        const url = `/hinhthuckhen/fetch`;
        return axiosConfig.get(url, {params})
    },
    addHinhthuckhen(data){
        const url = "/hinhthuckhen/add";
        return axiosConfig.post(url, data)
    },
    editHinhthuckhen(data){
        const url =`/hinhthuckhen/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteHinhthuckhen(id, params){
        const url = `/hinhthuckhen/delete/${id}`;
        return axiosConfig.delete(url,{params})
    }
};

export default hinhthuckhenApi;