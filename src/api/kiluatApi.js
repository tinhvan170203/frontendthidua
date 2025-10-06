import axiosConfig from "./axiosConfig";

const kiluatApi = {
    getKiluatcanhans(id){
        const url = `/ki-luat/ca-nhan/${id}/fetch`;
        return axiosConfig.get(url)
    },
    addKiluatcanhan(data){
        const url = `/ki-luat/ca-nhan/add`;
        return axiosConfig.post(url, data)
    },
    editKiluatcanhan(data){
        const url =`/ki-luat/ca-nhan/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteKiluatcanhan(id){
        const url = `/ki-luat/ca-nhan/delete/${id}`;
        return axiosConfig.delete(url)
    },
    searchKiluatcanhans(id, params){
        const url = `/ki-luat/ca-nhan/${id}/search`;
        return axiosConfig.get(url, {params})
    },
};

export default kiluatApi;