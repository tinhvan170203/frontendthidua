import axiosConfig from "./axiosConfig";

const chidoanApi = {
    getChidoans(params){
        const url = `/chi-doan/fetch`;
        return axiosConfig.get(url, {params})
    },
    addChidoan(data){
        const url = "/chi-doan/add";
        return axiosConfig.post(url, data)
    },
    editChidoan(data){
        const url =`/chi-doan/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteChidoan(id, params){
        const url = `/chi-doan/delete/${id}`;
        return axiosConfig.delete(url,{params})
    },
    getChidoanOfUser(){
        const url = `/chi-doan/get-chi-doan-of-user`;
        return axiosConfig.get(url)
    }
};

export default chidoanApi;