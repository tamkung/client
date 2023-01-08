import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavAdmin = () => {
   const { user } = useSelector((state) => ({ ...state }));

   const clearLocalStoreNull = () => {
      localStorage.setItem("level_id", null);
      localStorage.setItem("question_type_id", null);
      localStorage.setItem("fp_tal", null);
   };

   if (user) {
      if (user.lv_id === 1) {
         return (
            <>
               <li className="nav-item menu-open">
                  <a href="#" className="nav-link">
                     {/* <i className="nav-icon fas fa-chart-pie" /> */}
                     <p>
                        ระบบตอบคำถาม
                        <i className="right fas fa-angle-left" />
                     </p>
                  </a>
                  <ul className="nav nav-treeview">
                     <li className="nav-item">
                        <Link
                           to="/officer-question-type"
                           className="nav-link"
                           onClick={() => {
                              localStorage.setItem("officer_type_id", null);
                              localStorage.setItem("fp_tal", null);
                           }}
                        >
                           {/* <i className="nav-icon fas fa-file" /> */}
                           {" \u00A0\u00A0\u00A0\u00A0"}
                           <p>หมวดคำถาม</p>
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link
                           to="/officer-manage-faq"
                           className="nav-link"
                           onClick={() => {
                              // localStorage.setItem("officer_type_id", null);
                              localStorage.setItem("fp_tal", null);
                           }}
                        >
                           {/* <i className="nav-icon fas fa-file" /> */}
                           {" \u00A0\u00A0\u00A0\u00A0"}
                           <p>จัดการ FAQ</p>
                        </Link>
                     </li>
                  </ul>
               </li>
               <li className="nav-item menu-open">
                  <a href="#" className="nav-link">
                     {/* <i className="nav-icon fas fa-chart-pie" /> */}
                     <p>
                        ข้อมูลทั่วไป
                        <i className="right fas fa-angle-left" />
                     </p>
                  </a>
                  <ul className="nav nav-treeview">
                     <li className="nav-item">
                        <Link
                           to="/admin-manage-question-type"
                           className="nav-link"
                           onClick={clearLocalStoreNull}
                        >
                           {/* <i className="nav-icon fas fa-file" /> */}
                           {" \u00A0\u00A0\u00A0\u00A0"}
                           <p>จัดการหมวดคำถาม</p>
                        </Link>
                     </li>
                  </ul>
               </li>
               <li className="nav-item menu-open">
                  <a className="nav-link">
                     {/* <i className="nav-icon fas fa-chart-pie" /> */}
                     <p>
                        ข้อมูลระบบ
                        <i className="right fas fa-angle-left" />
                     </p>
                  </a>
                  <ul className="nav nav-treeview">
                     <li className="nav-item">
                        <Link
                           to="/admin-manage-user"
                           className="nav-link"
                           onClick={clearLocalStoreNull}
                        >
                           {/* <i className="nav-icon fas fa-file" /> */}
                           {" \u00A0\u00A0\u00A0\u00A0"}
                           <p>ข้อมูลสมาชิก</p>
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link
                           to="/admin-manage-level"
                           className="nav-link"
                           onClick={clearLocalStoreNull}
                        >
                           {/* <i className="nav-icon fas fa-file" /> */}
                           {" \u00A0\u00A0\u00A0\u00A0"}
                           <p>ระดับการเข้าถึงข้อมูล</p>
                        </Link>
                     </li>
                  </ul>
               </li>
            </>
         );
      } else {
         return null;
      }
   } else {
      return null;
   }
};

export default NavAdmin;
