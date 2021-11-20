var service = new InfoAcccount();
var validation = new Validation();
function getELE(id) {
    return document.getElementById(id);
}
// function getListAcc() {
//     service
//         .getListAccount()
//         .then(function (result) {
//             renderListData(result.data);
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
// }
// getListAcc();

// lọc danh sách chỉ GV
let users = [];
function getListAcc() {
    service.getListAccount()
        .then(function (result) {
            users.push(result.data);
            renderListData(result.data.filter(result => result.loaiND == "GV"));
        })
        .catch(function (error) {
            console.log(error);
        });
}
getListAcc();
function renderListData(arr) {
    var html = "";
    arr.forEach(function (product, index) {
        html += `<tr>
        <td>${index + 1}</td>
        <td>${product.taiKhoan}</td>
        <td>${product.hoTen}</td>
        <td>${product.matKhau}</td>
        <td>${product.email}</td>
        <td>${product.loaiND}</td>
        <td>${product.ngonNgu}</td>
        <td>${product.moTa}</td>
        <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editInfo(${product.id})">Sửa</button>
            <button class="btn btn-danger" onclick="deleteAccount(${product.id})">Xóa</button>
        </td>
    </tr>`;
    });
    getELE("tblDanhSachNguoiDung").innerHTML = html;
}
function deleteAccount(id) {
    service
        .deleteAccount(id)
        .then((result) => {
            // console.log(id);
            getListAcc(result.data);
            alert("Delete Success! ")
        })
        .catch(() => {
            console.log(error);
        });
}

getELE("btnThemNguoiDung").addEventListener("click", function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Người Dùng";
    var footer = `<button class="btn btn-success" onclick="addAccount()">Thêm</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
})

function addAccount() {
    var taiKhoan = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var matKhau = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var hinhAnh = getELE("HinhAnh").value;
    var loaiND = getELE("loaiNguoiDung").value;
    var ngonNgu = getELE("loaiNgonNgu").value;
    var moTa = getELE("MoTa").value;

    var isValid = true;
    isValid &= validation.checkEmpty(taiKhoan, "Tài khoản không được để trống !", "spanTaiKhoan")
    // &&validation.checkUserName(taiKhoan,"Tài khoản đã tồn tại.","spanTaiKhoan",service.InfoAcccount);
    isValid &= validation.checkEmpty(hoTen, "Họ tên không được để trống !", "spanHoTen") && validation.checkName(hoTen, "Họ tên không chứa số, kí tự đặc biệt!", "spanHoTen");
    isValid &= validation.checkEmpty(matKhau, "Mật khẩu không được để trống !", "spanMatKhau") && validation.checkMatKhau(matKhau, "Mật khẩu từ 6-8 kí tự có ít nhất 1 kí tự đặc biệt, 1 kí tự in hoa, 1 kí tự số.", "spanMatKhau");
    isValid &= validation.checkEmpty(email, "Email không được để trống !", "spanEmail") && validation.checkEmail(email, "Email không đúng định dạng.", "spanEmail");
    isValid &= validation.checkEmpty(hinhAnh, "Hình ảnh không được để trống !", "spanHinhAnh");
    isValid &= validation.checkSelect("loaiNguoiDung", "Vui lòng chọn loại người dùng", "spanLoaiND");
    isValid &= validation.checkSelect("loaiNgonNgu", "Vui lòng chọn loại ngôn ngữ", "spanLoaiNN");
    isValid &= validation.checkEmpty(moTa, "Mô tả không được để trống !", "spanMoTa");


    if (isValid) {
        var user = new User("", taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh)
        service
            .addAccount(user)
            .then(function (result) {
                getListAcc(result.data);
                document.getElementsByClassName("close")[0].click();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}

function editInfo(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Cập Nhật Người Dùng";
    var modalfooter = `<button class="btn btn-success" onclick="updateAccount(${id})">Cập Nhật</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = modalfooter;

    service.editAccount(id)
        .then(function (result) {
            getELE("TaiKhoan").value = result.data.taiKhoan;
            getELE("HoTen").value = result.data.hoTen;
            getELE("MatKhau").value = result.data.matKhau;
            getELE("Email").value = result.data.email;
            getELE("HinhAnh").value = result.data.hinhAnh;
            getELE("loaiNguoiDung").value = result.data.loaiND;
            getELE("loaiNgonNgu").value = result.data.ngonNgu;
            getELE("MoTa").value = result.data.moTa;
        })
        .catch(function (error) {
            console.log(error)
        });
}

function updateAccount(id) {
    var taiKhoan = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var matKhau = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var hinhAnh = getELE("HinhAnh").value;
    var loaiND = getELE("loaiNguoiDung").value;
    var ngonNgu = getELE("loaiNgonNgu").value;
    var moTa = getELE("MoTa").value;

    var newUser = new User(id, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
    service
        .updateAccount(newUser)
        .then(function () {
            getListAcc();
        })
        .catch(function (error) {
            console.log(error)
        })
    document.getElementsByClassName("close")[0].click();
}

