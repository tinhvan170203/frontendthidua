import axiosConfig from "./axiosConfig";

const khenthuongApi = {
    getKhentapthes(params){
        const url = `/khen-thuong/tap-the/fetch`;
        return axiosConfig.get(url, {params})
    },
    addKhentapthe(data){
        const url = "/khen-thuong/tap-the/add";
        return axiosConfig.post(url, data)
    },
    editKhentapthe(data){
        const url =`/khen-thuong/tap-the/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteKhentapthe(id, params){
        const url = `/khen-thuong/tap-the/delete/${id}`;
        return axiosConfig.delete(url, { params})
    },
    getKhencanhans(id){
        const url = `/khen-thuong/ca-nhan/${id}/fetch`;
        return axiosConfig.get(url)
    },
    addKhencanhan(data){
        const url = `/khen-thuong/ca-nhan/add`;
        return axiosConfig.post(url, data)
    },
    editKhencanhan(data){
        const url =`/khen-thuong/ca-nhan/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteKhencanhan(id, params){
        const url = `/khen-thuong/ca-nhan/delete/${id}`;
        return axiosConfig.delete(url, {params})
    },
    searchKhencanhans(id, params){
        const url = `/khen-thuong/ca-nhan/${id}/search`;
        return axiosConfig.get(url, {params})
    },

    // danh hiệu thi đua
    getDanhhieuthiduas(params){
        const url = `/khen-thuong/danh-hieu-thi-dua/fetch`;
        return axiosConfig.get(url, {params})
    },
    addDanhhieuthidua(data){
        const url = "/khen-thuong/danh-hieu-thi-dua/add";
        return axiosConfig.post(url, data)
    },
    editDanhhieuthidua(data){
        const url =`/khen-thuong/danh-hieu-thi-dua/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteDanhhieuthidua(id, params){
        const url = `/khen-thuong/danh-hieu-thi-dua/delete/${id}`;
        return axiosConfig.delete(url, { params})
    },
};

export default khenthuongApi;