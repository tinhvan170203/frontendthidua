import axiosConfig from "./axiosConfig";

const donviApi = {
    getDonvis(params){
        const url = `/don-vi/fetch`;
        return axiosConfig.get(url, {params})
    },
    addDonvi(data){
        const url = "/don-vi/add";
        return axiosConfig.post(url, data)
    },
    editDonvi(data){
        const url =`/don-vi/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteDonvi(id, params){
        const url = `/don-vi/delete/${id}`;
        return axiosConfig.delete(url,{params})
    }
};

export default donviApi;