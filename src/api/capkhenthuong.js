import axiosConfig from "./axiosConfig";

const capkhenthuongApi = {
    getCapkhenthuongs(params){
        const url = `/capkhen/fetch`;
        return axiosConfig.get(url, {params})
    },
    addCapkhenthuong(data){
        const url = "/capkhen/add";
        return axiosConfig.post(url, data)
    },
    editCapkhenthuong(data){
        const url =`/capkhen/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteCapkhenthuong(id, params){
        const url = `/capkhen/delete/${id}`;
        return axiosConfig.delete(url,{params})
    }
};

export default capkhenthuongApi;