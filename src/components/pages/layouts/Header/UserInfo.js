import React from "react";
//Route
import { Link, useNavigate } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";

const UserInfo = () => {
   const { user } = useSelector((state) => ({ ...state }));
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const logout = () => {
      dispatch({
         type: "LOGOUT",
      });
      navigate("/");
   };
   return (
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
         <span class="dropdown-item dropdown-header ">ข้อมูลสมาชิก</span>
         <div class="dropdown-divider" />
         <span className="dropdown-item">
            {/* <i className="nav-icon far fa-envelope " /> */}
            ชื่อผู้ใช้ :{" \u00A0\u00A0" + user.mem_user}
         </span>
         <div className="dropdown-divider" />
         <span className="dropdown-item">
            {/* <i className="nav-icon far fa-envelope " /> */}
            ชื่อ - นามสกุล :{" \u00A0\u00A0" + user.mem_name}
         </span>
         <div className="dropdown-divider" />
         <span className="dropdown-item">
            {/* <i className="nav-icon far fa-envelope " /> */}
            อีเมล :{" \u00A0\u00A0" + user.mem_mail}
         </span>
         <div className="dropdown-divider" />
         <span className="dropdown-item">
            {/* <i class="nav-icon far fa-address-card " /> */}
            สิทธิ์การเข้าถึง {" \u00A0\u00A0"}:{" \u00A0\u00A0" + user.lv_name}
         </span>
         <div className="dropdown-divider" />
         <Link to="/edit-information" className="dropdown-item dropdown-footer">
            <p className="nav-link" role="button">
               แก้ใขข้อมูลส่วนตัว
            </p>
         </Link>
         <div className="dropdown-divider" />
         <div href="#" className="dropdown-item dropdown-footer" onClick={logout}>
            <p className="nav-link" role="button">
               ออกจากระบบ
            </p>
         </div>
      </div>
   );
};

export default UserInfo;
