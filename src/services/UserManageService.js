import { GROUP } from "../utils/config";
import { baseServices } from "./baseService";

class UserManageService extends baseServices {
  userLogin = (userAccount) => this.post('QuanLyNguoiDung/DangNhap', userAccount);
  accountInformation = () => this.post('QuanLyNguoiDung/ThongTinTaiKhoan');
  userRegister = (userRegister) => this.post(`QuanLyNguoiDung/DangKy`, userRegister);
  getListUser = (keyWord) => {
    return keyWord.trim() !== '' ? this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}&tuKhoa=${keyWord}`) :
    this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}`)
  };
}

export const userManageService = new UserManageService();