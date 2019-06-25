/*=======Training=======*/
dataset = [
    ['Green', 3, 'Apple'],
    ['Yellow', 4, 'Apple'],
    ['Red', 2, 'Grape'],
    ['Red', 1, 'Grape'],
    ['Yellow', 3, 'Lemon'],
]

let header_dataset = ["color", "diameter", "label"]

let bien_gia_tri_dieu_kien


function loai_bo_trung_lap(arr) {
    return arr.filter((value, index, arr) => arr.indexOf(value) === index);
}

function lay_thuoc_tinh(data) {
    let thuoctinhs = []
    for (var i in data) {
        thuoctinhs.push(data[i][0])
    }
    if (thuoctinhs != []) {
        thuoctinhs = loai_bo_trung_lap(thuoctinhs)
        return thuoctinhs
    }
}


function dem_nhan(data) {
    let nhans = []
    let dem_thanh_phan = {}
    for (var i in data) {
        nhans.push(data[i][data[i].length - 1])
    }
    if (nhans != []) {
        var array_elements = nhans

        array_elements.sort();

        var current = null;
        var cnt = 0;
        for (var i = 0; i < array_elements.length; i++) {
            if (array_elements[i] != current) {
                if (cnt > 0) {
                    dem_thanh_phan[current] = cnt
                }
                current = array_elements[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            dem_thanh_phan[current] = cnt
        }
    }
    if (dem_thanh_phan != {}) {
        return dem_thanh_phan
    }
}

function kiem_tra_gia_tri_so(val) {
    if (typeof val == 'number') {
        return true
    } else {
        return false
    }
}

function dat_cau_hoi(giatriduavao, giatrikiemtra) {
    if (kiem_tra_gia_tri_so(giatriduavao)) {
        return giatriduavao >= giatrikiemtra
    } else {
        return giatriduavao == giatrikiemtra
    }
}

function ve_cau_hoi(cot, giatriduavao) {
    let dieukien_ = '=='
    if (kiem_tra_gia_tri_so(giatriduavao)) {
        dieukien_ = '>='
    }
    return "Is " + header_dataset[cot] + " " + dieukien_ + " " + String(giatriduavao)
}

function phan_chia_nhanh(data, dieukien) {
    let nhanh_dung = []
    let nhanh_sai = []
    for (var i in data) {
        if (dat_cau_hoi(data[i][0], dieukien)) {
            nhanh_dung.push(data[i])
        }
        else {
            nhanh_sai.push(data[i])
        }
    }
    if (nhanh_dung != [] && nhanh_sai != []) {
        return { nhanh_dung, nhanh_sai }
    }
}

function sai_so(data) {
    let dem = dem_nhan(data)
    let sai_sot_khac_loai = 1
    let kiem_tra_da_duyet_xong = []
    for (var i in dem) {
        quet = dem[i] / Number(Math.round(data.length))
        sai_sot_khac_loai -= quet ** 2
        kiem_tra_da_duyet_xong.push(sai_sot_khac_loai)
    }
    if (kiem_tra_da_duyet_xong != []) {
        return sai_sot_khac_loai
    }
}

function tinh_loc_thu_duoc(sai_so_nhanh_dung, sai_so_nhanh_sai, sai_sot_ban_dau, nhanh_dung, nhanh_sai) {
    let ti_le = nhanh_dung.length / (nhanh_dung.length + nhanh_sai.length)
    return sai_sot_ban_dau - ti_le * sai_so_nhanh_dung - (1 - ti_le) * sai_so_nhanh_sai
}

function tim_cau_hoi_hay_nhat_de_chia(data) {
    let best_thu_duoc = 0
    let best_cau_hoi = null
    let sai_sot_ban_dau = sai_so(data)
    let so_thuoc_tinh = data[0].length - 1
    let i
    for (i = 0; i < so_thuoc_tinh; i++) {
        let giatri = []
        for (var dong in data) {
            if (data[dong][i] != undefined) {
                giatri.push(data[dong][i])
            }
        }
        if (giatri != []) {
            for (var val in giatri) {
                let cau_hoi = ve_cau_hoi(i, giatri[val])
                let { nhanh_dung, nhanh_sai } = phan_chia_nhanh(data, giatri[val])
                // if (nhanh_dung.length == 0 || nhanh_sai.length == 0) {
                //     continue
                // }else{
                // }
                let sai_so_nhanh_dung = sai_so(nhanh_dung)
                let sai_so_nhanh_sai = sai_so(nhanh_sai)
                let thu_duoc = tinh_loc_thu_duoc(sai_so_nhanh_dung, sai_so_nhanh_sai, sai_sot_ban_dau, nhanh_dung, nhanh_sai)
                if (thu_duoc >= best_thu_duoc) {
                    best_cau_hoi = cau_hoi
                    best_thu_duoc = thu_duoc
                }
            }
        }
    }
    if (best_cau_hoi != null, best_thu_duoc != 0, best_cau_hoi != undefined) {
        bien_gia_tri_dieu_kien = best_cau_hoi.slice(best_cau_hoi.lastIndexOf("=") + 2, best_cau_hoi.length)
        return { best_cau_hoi, best_thu_duoc }
    }
}

function chiec_la(data) {
    this.phan_chia = dem_nhan(data)
}

function chiec_la_quyet_dinh(cau_hoi, phanchia_dung, phanchia_sai) {
    this.phanchia_dung = phanchia_dung
    this.phanchia_sai = phanchia_sai
    this.cau_hoi = cau_hoi
}

function xay_dung_cay(data) {
    if (data != []) {
        let { best_cau_hoi, best_thu_duoc } = tim_cau_hoi_hay_nhat_de_chia(data)
        if (best_thu_duoc == 0) {
            return new chiec_la(data)
        }
        else {
            let { nhanh_dung, nhanh_sai } = phan_chia_nhanh(data, bien_gia_tri_dieu_kien)
            let phanchia_dung = xay_dung_cay(nhanh_dung)
            let phanchia_sai = xay_dung_cay(nhanh_sai)
            return new chiec_la_quyet_dinh(best_cau_hoi, phanchia_dung, phanchia_sai)
        }
    }
}

function ve_cay(chiec_las, khoang_cach_trong = "") {
    if (chiec_las instanceof chiec_la) {
        let dudoan = chiec_las["phan_chia"]
        console.log(khoang_cach_trong + "Dự đoán: ", dudoan)
    }
    if (chiec_las["cau_hoi"] != undefined) {
        console.log(khoang_cach_trong + chiec_las["cau_hoi"])
        console.log(khoang_cach_trong + '--> True')
        ve_cay(chiec_las["phanchia_dung"], khoang_cach_trong + " ")
        console.log(khoang_cach_trong + '--> False')
        ve_cay(chiec_las["phanchia_sai"], khoang_cach_trong + " ")
    }
}


let mytree = xay_dung_cay(dataset)
ve_cay(mytree)
