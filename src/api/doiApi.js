import axiosConfig from "./axiosConfig";

const doiApi = {
    getDois(params){
        const url = `/doi/fetch`;
        return axiosConfig.get(url, {params})
    },
    addDoi(data){
        const url = "/doi/add";
        return axiosConfig.post(url, data)
    },
    editDoi(data){
        const url =`/doi/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteDoi(id, params){
        const url = `/doi/delete/${id}`;
        return axiosConfig.delete(url,{params})
    }
};

export default doiApi;