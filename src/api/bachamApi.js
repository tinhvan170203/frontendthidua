import axiosConfig from "./axiosConfig";

const bachamApi = {
    getBachams(params){
        const url = `/bac-ham/fetch`;
        return axiosConfig.get(url, {params})
    },
    addBacham(data){
        const url = "/bac-ham/add";
        return axiosConfig.post(url, data)
    },
    editBacham(data){
        const url =`/bac-ham/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteBacham(id, params){
        const url = `/bac-ham/delete/${id}`;
        return axiosConfig.delete(url,{params})
    }
};

export default bachamApi;