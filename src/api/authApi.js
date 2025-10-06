import axiosCommon from "./axiosCommon";
import axiosConfig from "./axiosConfig";
import axiosMulter from "./axiosMulter";

const authApi = {
    login(data){
        const url = '/auth/login';
        return axiosConfig.post(url, data)
    }, 
    logout(){
        const url = `/auth/logout`;
        return axiosConfig.get(url)
    },
    getUsers(params){
        const url = `/auth/user/fetch`;
        return axiosConfig.get(url, {params})
    },
    addUser(data){
        const url = "/auth/user/add";
        return axiosConfig.post(url, data)
    },
    editUser(data){
        const url =`/auth/user/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteUser(id, params){
        const url = `/auth/user/delete/${id}`;
        return axiosConfig.delete(url,{params})
    },
    changePass(data){
        const url = '/auth/change-pass';
        return axiosConfig.post(url, data)
    },
    getListDonviTiepnhan(params){
        const url = `/auth/user/tiep-nhan/fetch`;
        return axiosConfig.get(url, {params})
    },
    getUserOfKhoi(params){
        const url = `/auth/user/get-danh-sach-user-theo-khoi`;
        return axiosConfig.get(url, {params})
    },
    
    //upload
    getImg(params){
        const url = `/auth/img/fetch`;
        return axiosConfig.get(url, {params})
    },
     getImgActive(params){
        const url = `/auth/img-active/fetch`;
        return axiosConfig.get(url, {params})
    },
     saveImg(data){
        const url = "/auth/save-img";
        return axiosMulter.post(url, data)
    },
       editImg(data,id){
        const url = `/auth/edit-img/${id}`;
        return axiosConfig.put(url, data)
    },
       deleteImg(id){
        const url = `/auth/delete-img/${id}`;
        return axiosConfig.delete(url)
    },
    checkImport(data){
        const url = "/auth/check-import";
        return axiosConfig.post(url, data)
    },
};

export default authApi;