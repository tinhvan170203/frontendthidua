import axiosConfig from "./axiosConfig";

const thongkeApi = {
    getKhenkhenthuongs(params) {
        const url = `/thong-ke/khen-thuong/fetch`;
        return axiosConfig.get(url, { params })
    },
    getKhenkhenthuongsTheothoigian(params) {
        const url = `/thong-ke/khen-thuong-theo-thoi-gian/fetch`;
        return axiosConfig.get(url, { params })
    },
    getKiluats(params) {
        const url = `/thong-ke/ki-luat/fetch`;
        return axiosConfig.get(url, { params })
    },
    getThiduathangs(params) {
        const url = `/thong-ke/thi-dua-thang/fetch`;
        return axiosConfig.get(url, { params })
    },
    getBangThiduathangs(params) {
        const url = `/thong-ke/bang-thi-dua-thang/fetch`;
        return axiosConfig.get(url, { params })
    },
    getBangThiduathangsDangCongtac(params) {
        const url = `/thong-ke/thi-dua-thang-dang-cong-tac/fetch`;
        return axiosConfig.get(url, { params })
    },
    getThiduanams(params) {
        const url = `/thong-ke/thi-dua-nam/fetch`;
        return axiosConfig.get(url, { params })
    },
    getBangThiduanams(params) {
        const url = `/thong-ke/bang-thi-dua-nam/fetch`;
        return axiosConfig.get(url, { params })
    },
    getTruongthanhdoans(params) {
        const url = `/thong-ke/truong-thanh-doan/fetch`;
        return axiosConfig.get(url, { params })
    },
    changeStatusTruongthanhdoan(id) {
        const url = `/thong-ke/truong-thanh-doan/change/${id}`;
        return axiosConfig.get(url)
    },
    getDonviDois(params) {
        const url = `/thong-ke/danh-sach-don-vi-doi/fetch`;
        return axiosConfig.get(url, { params })
    },
    getXeploaidangvienNam(params) {
        const url = `/thong-ke/xep-loai-dang-vien/fetch`;
        return axiosConfig.get(url, { params })
    },
    getXeploaidangvienCacNam(params) {
        const url = `/thong-ke/bang-xep-loai-dang-vien/fetch`;
        return axiosConfig.get(url, { params })
    },
    getDanhhieuThiduaNam(params) {
        const url = `/thong-ke/danh-hieu-thi-dua/fetch`;
        return axiosConfig.get(url, { params })
    },
       
    getNumberCanboOrDangvienDangCongtac(params){
            const url = `/thong-ke/number-can-bo-dang-vien-dang-cong-tac/fetch`;
        return axiosConfig.get(url, { params })
    },
    getNumberKhenthuongKiluatDangCongtac(params){
            const url = `/thong-ke/number-khen-thuong-ki-luat-dang-cong-tac/fetch`;
        return axiosConfig.get(url, { params })
    },
     fetchSystemHistory(params){
        const url = `/thong-ke/fetch/system-history`;
        return axiosConfig.get(url, {params})
    },
     fetchReportChuaSaveThiduathang(params){
        const url = `/thong-ke/fetch/don-vi-chua-save-thi-dua-thang`;
        return axiosConfig.get(url, {params})
    },
    searchCanbo(params){
        const url = `/thong-ke/search/can-bo`;
        return axiosConfig.get(url, {params})
    },
};

export default thongkeApi;