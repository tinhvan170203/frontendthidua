import axiosConfig from "./axiosConfig";

const canboApi = {
    getDataForAddPerson(params) {
        const url = `/can-bo/initial`;
        return axiosConfig.get(url, { params })
    },
    getDoiWhenDonviChange(params) {
        const url = `/can-bo/change-doi-of-don-vi`;
        return axiosConfig.get(url, { params })
    },
    addPerson(data) {
        const url = "/can-bo/add";
        return axiosConfig.post(url, data)
    },
    fetchDangvienList(params) {
        const url = `/can-bo/dang-vien-list/fetch`;
        return axiosConfig.get(url, { params })
    },
    editPerson(data) {
        const url = `/can-bo/edit`;
        return axiosConfig.put(url, data)
    },
    chuyenCongtac(data) {
        const url = `/can-bo/chuyen-cong-tac/${data.id}`;
        return axiosConfig.put(url, data)
    },
    changeBacham(data) {
        const url = `/can-bo/change/bac-ham`;
        return axiosConfig.put(url, data)
    },
    changeChucvu(data) {
        const url = `/can-bo/change/chuc-vu`;
        return axiosConfig.put(url, data)
    },
    deletePerson(id, params) {
        const url = `/can-bo/delete/${id}`;
        return axiosConfig.delete(url, { params })
    },
    getChucvuPlus(id) {
        const url = `/can-bo/chuc-vu-nang-cao/${id}`;
        return axiosConfig.get(url)
    },
    changeChucvuPlus(data) {
        const url = `/can-bo/chuc-vu-nang-cao/${data.id}/${data.id_item}`;
        return axiosConfig.put(url, data)
    },
    deleteChucvuPlus(id, id1) {
        const url = `/can-bo/chuc-vu-nang-cao/${id}/${id1}`;
        return axiosConfig.delete(url)
    },
    getBachamPlus(id) {
        const url = `/can-bo/bac-ham-nang-cao/${id}`;
        return axiosConfig.get(url)
    },
    changeBachamPlus(data) {
        const url = `/can-bo/bac-ham-nang-cao/${data.id}/${data.id_item}`;
        return axiosConfig.put(url, data)
    },
    deleteBachamPlus(id, id1) {
        const url = `/can-bo/bac-ham-nang-cao/${id}/${id1}`;
        return axiosConfig.delete(url)
    },
    getDonviPlus(id) {
        const url = `/can-bo/don-vi-nang-cao/${id}`;
        return axiosConfig.get(url)
    },
    changeDonviPlus(data) {
        const url = `/can-bo/don-vi-nang-cao/${data.id}/${data.id_item}`;
        return axiosConfig.put(url, data)
    },
    getDoiPlus(id) {
        const url = `/can-bo/doi-nang-cao/${id}`;
        return axiosConfig.get(url)
    },
    upTruongthanhdoan(data) {
        const url = `/can-bo/truong-thanh-doan/${data.id}`;
        return axiosConfig.put(url, data)
    },
    fetchYearMonth() {
        const url = `/can-bo/fetch/year-month`;
        return axiosConfig.get(url)
    },
    fetchThiduathang(params) {
        const url = `/can-bo/fetch/thi-dua-thang`;
        return axiosConfig.get(url, { params })
    },
    updateThiduathang(data) {
        const url = `/can-bo/update/thi-dua-thang`;
        return axiosConfig.put(url, data)
    },
    fetchThiduanam(params) {
        const url = `/can-bo/fetch/thi-dua-nam`;
        return axiosConfig.get(url, { params })
    },
    updateThiduanam(data) {
        const url = `/can-bo/update/thi-dua-nam`;
        return axiosConfig.put(url, data)
    },
    fetchCanboStatusDelete(params) {
        const url = `/can-bo/list/delete`;
        return axiosConfig.get(url, { params })
    },
    deletePersonAdvaned(id) {
        const url = `/can-bo/delete/advanced/${id}`;
        return axiosConfig.delete(url)
    },
    changeActive(id) {
        const url = `/can-bo/change-active/${id}`;
        return axiosConfig.get(url)
    },
    detailDoanvien(id) {
        const url = `/can-bo/detail-doan-vien/${id}`;
        return axiosConfig.get(url)
    },
    getDonvikhactinh() {
        const url = `/can-bo/donvikhactinh`;
        return axiosConfig.get(url)
    },
    postChuyenkhactinh(data) {
        const url = `/can-bo/chuyencongtackhactinh/${data.id}`;
        return axiosConfig.put(url, data)
    },
    getDoanvienNgoaitinh(params) {
        const url = `/can-bo/doan-vien-ngoai-tinh`;
        return axiosConfig.get(url, { params })
    },
    backToCongantinh(id) {
        const url = `/can-bo/chuyen-ve-tinh/${id}`;
        return axiosConfig.get(url)
    },
    fetchCanboYeucauTiepnhan() {
        const url = `/can-bo/yeu-cau-tiep-nhan`;
        return axiosConfig.get(url)
    },
    // sửa tiếp 2025
    tuchoiYeucauTiepnhan(data) {
        const url = `/can-bo/tu-choi-tiep-nhan`;
        return axiosConfig.put(url, data)
    },
    dongyYeucauTiepnhan(data) {
        const url = `/can-bo/dong-y-tiep-nhan`;
        return axiosConfig.put(url, data)
    },
    backtoDonvi(data) {
        const url = `/can-bo/quay-ve-don-vi`;
        return axiosConfig.put(url, data)
    },
    fetchListBiTuchoi(params) {
        const url = `/can-bo/list-tu-choi`;
        return axiosConfig.get(url, { params })
    },
    chuyentrongCoquan(data) {
        const url = `/can-bo/chuyen-trong-co-quan`;
        return axiosConfig.put(url, data)
    },
    chuyenCongtacMultiple(data) {
        const url = `/can-bo/chuyen-cong-tac-multiple`;
        return axiosConfig.put(url, data)
    },

    // xếp loại đảng viên
    fetchXeploaidangvien(params) {
        const url = `/can-bo/fetch/xep-loai-dang-vien`;
        return axiosConfig.get(url, { params })
    },
    updateXeploaidangvien(data) {
        const url = `/can-bo/update/xep-loai-dang-vien`;
        return axiosConfig.put(url, data)
    },
    fetchCanboTungCongtac(params) {
        const url = `/can-bo/can-bo-tung-cong-tac/fetch`;
        return axiosConfig.get(url, { params })
    },
    fetchCanboDangDoiChuyenCongtac(params) {
        const url = `/can-bo/can-bo-dang-doi-chuyen-cong-tac/fetch`;
        return axiosConfig.get(url, { params })
    },
};

export default canboApi;