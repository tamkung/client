import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavOfficer = () => {
   const { user } = useSelector((state) => ({ ...state }));

   if (user) {
      if (user.lv_id === 2) {
         return (
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
         );
      } else {
         return null;
      }
   } else {
      return null;
   }
};

export default NavOfficer;
