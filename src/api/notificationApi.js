import axiosConfig from "./axiosConfig";

const notificationApi = {
    getNotifications(params){
        const url = `/notification/fetch`;
        return axiosConfig.get(url, {params})
    },
    addNotification(data){
        const url = "/notification/add";
        return axiosConfig.post(url, data)
    },
    editNotification(data){
        const url =`/notification/edit/${data.id_edit}`;
        return axiosConfig.put(url, data)
    },
    deleteNotification(id, params){
        const url = `/notification/delete/${id}`;
        return axiosConfig.delete(url,{params})
    }
};

export default notificationApi;