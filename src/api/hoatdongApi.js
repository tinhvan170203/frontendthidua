import axiosConfig from "./axiosConfig";

const hoatdongApi = {
    getHoatdongs(params){
        const url = `/hoat-dong-doan/fetch`;
        return axiosConfig.get(url, {params})
    },
    searchHoatdongs(params){
        const url = `/hoat-dong-doan/search`;
        return axiosConfig.get(url, {params})
    },
    addHoatdong(data){
        const url = "/hoat-dong-doan/add";
        return axiosConfig.post(url, data)
    },
    editHoatdong(data){
        const url =`/hoat-dong-doan/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteHoatdong(id, params){
        const url = `/hoat-dong-doan/delete/${id}`;
        return axiosConfig.delete(url,{params})
    }
};

export default hoatdongApi;