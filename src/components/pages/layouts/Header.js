import React, { useState, useEffect } from "react";
//Route
import { Link, useNavigate } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";

import { countQstNoAns } from "../../functions/query";
import { countQuestionType } from "../../functions/query";

export default function Header() {
   const { user } = useSelector((state) => ({ ...state }));
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [qst, setQst] = useState(0);
   const [qstTypeNum, setQstTypeNum] = useState([]);
   // คำสั่ง Logout
   const logout = () => {
      dispatch({
         type: "LOGOUT",
      });
      navigate("/");
   };

   const loadData = async () => {
      if (user) {
         if (user.lv_id != 3) {
            countQstNoAns(user.token)
               .then((res) => {
                  // console.log("Qst Count : ", res.data[0].qst_num);
                  setQst(res.data[0].qst_num);
               })
               .catch((err) => {
                  // console.log("Qst Count : ");
                  console.log(err.response);
               });
            countQuestionType()
               .then((res) => {
                  // console.log("Qst Type : ", res.data);
                  setQstTypeNum(res.data);
               })
               .catch((err) => {
                  // console.log("Qst Type : ");
                  console.log(err.response);
               });
         }
      }
   };

   const clearLocalStorage = () => {
      localStorage.setItem("officer_type_id", null);
      localStorage.setItem("question_id", null);
      localStorage.setItem("level_id", null);
      localStorage.setItem("question_type_id", null);
   };
   useEffect(() => {
      loadData();
   }, [user]);
   return (
      <div>
         <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
               <li className="nav-item">
                  <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                     <i className="fas fa-bars" />
                  </a>
               </li>
               <li className="nav-item d-none d-sm-inline-block">
                  <Link className="nav-link" to="/" onClick={clearLocalStorage}>
                     ระบบบริการตอบคำถามสำหรับนักศึกษา
                  </Link>
               </li>
               {/*<li className="nav-item d-none d-sm-inline-block">
                  <a href="#" className="nav-link">
                     Contact
                  </a>
               </li> */}
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
               {/* Navbar Search */}
               {/* <li className="nav-item">
                  <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                     <i className="fas fa-search" />
                  </a>
                  <div className="navbar-search-block">
                     <form className="form-inline">
                        <div className="input-group input-group-sm">
                           <input
                              className="form-control form-control-navbar"
                              type="search"
                              placeholder="Search"
                              aria-label="Search"
                           />
                           <div className="input-group-append">
                              <button className="btn btn-navbar" type="submit">
                                 <i className="fas fa-search" />
                              </button>
                              <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                 <i className="fas fa-times" />
                              </button>
                           </div>
                        </div>
                     </form>
                  </div>
               </li> */}

               <li className="nav-item">
                  <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                     <i className="fas fa-expand-arrows-alt" />
                  </a>
               </li>
               {user ? (
                  user.lv_id != 3 ? (
                     <>
                        {/* <Link to="/officer-question-type">
                           <li class="nav-item dropdown">
                              <div class="nav-link">
                                 <i class="far fa-comments"></i>
                                 <span class="badge badge-danger navbar-badge">{qst}</span>
                              </div>
                           </li>
                        </Link> */}

                        {/* Messages Dropdown Menu */}

                        <li className="nav-item dropdown">
                           <a className="nav-link" data-toggle="dropdown" href="#">
                              <i class="far fa-comments"></i>
                              <span class="badge badge-danger navbar-badge">{qst}</span>
                           </a>
                           <div
                              className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
                              style={{ overflowY: "scroll", maxHeight: "500px" }}
                           >
                              <Link to="/officer-question-type">
                                 <li className="dropdown-item dropdown-header">
                                    <div class="">ดูคำถามทั้งหมด</div>
                                 </li>
                              </Link>
                              {qstTypeNum.map((item) => (
                                 <>
                                    {item.count_type_id != 0 ? (
                                       <>
                                          <Link
                                             to="/officer-read-question-type"
                                             className="dropdown-item"
                                             onClick={() => {
                                                // console.log("type_id : ", type_id);
                                                localStorage.setItem("officer_type_id", item.type_id);
                                                // if (window.location.pathname == "/officer-read-question-type") {
                                                //    window.location.reload(false);
                                                // }
                                             }}
                                          >
                                             {/* Message Start */}
                                             <div className="media">
                                                <div className="media-body">
                                                   <p className="dropdown-item-title" style={{ wordBreak: "break-word" }}>
                                                      {item.type_name}
                                                      {/* <span className="float-right text-sm text-danger">
                                                   <i className="fas fa-star" />
                                                </span> */}
                                                   </p>
                                                   <p className="text-sm">
                                                      จำนวน <pred style={{ color: "red" }}>{item.count_type_id}</pred> คำถาม
                                                   </p>
                                                   {/* <p className="text-sm text-muted">
                                                <i className="far fa-clock mr-1" /> 4 Hours Ago
                                             </p> */}
                                                </div>
                                             </div>
                                             {/* Message End */}
                                          </Link>
                                          <div className="dropdown-divider" />
                                       </>
                                    ) : (
                                       <></>
                                    )}
                                 </>
                              ))}

                              <Link to="/officer-question-type">
                                 <li className="dropdown-item dropdown-header">
                                    <div class="">ดูคำถามทั้งหมด</div>
                                 </li>
                              </Link>
                           </div>
                        </li>
                     </>
                  ) : (
                     <></>
                  )
               ) : (
                  <></>
               )}

               {!user && (
                  <>
                     <li className="nav-item d-sm-inline-block">
                        <Link to="/login" className="nav-link">
                           เข้าสู่ระบบ
                        </Link>
                     </li>
                  </>
               )}
               {user && (
                  <>
                     {/* <li className="nav-item dropdown d-sm-inline-block">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                           {user.mem_user}
                        </a>

                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                           <span className=" dropdown-header">
                              <i className="nav-icon far fa-envelope "></i>
                              {" \u00A0\u00A0" + user.mem_mail}
                           </span>
                           <div className="dropdown-divider" />
                           <span className=" dropdown-header">
                              <i class="nav-icon far fa-address-card "></i>
                              {" \u00A0\u00A0" + user.lv_name}
                           </span>
                           <div className="dropdown-divider" />
                           <a href="#" className="dropdown-item dropdown-footer" onClick={logout}>
                              <p className="nav-link" role="button">
                                 ออกจากระบบ
                              </p>
                           </a>
                        </div>
                     </li> */}
                     <li className="nav-item dropdown">
                        {user.mem_img != null && user.mem_img != "null" ? (
                           <img
                              src={process.env.REACT_APP_API_MEM_IMG + "/" + user.mem_img}
                              height={35}
                              width={35}
                              className="img-circle elevation-1"
                              data-toggle="dropdown"
                           />
                        ) : (
                           <img
                              src="../../dist/img/avatar6.jpg"
                              height={38}
                              className="img-circle elevation-1"
                              data-toggle="dropdown"
                           />
                        )}
                        {/* <img
                           src="../../dist/img/AdminLTELogo.png"
                           height={38}
                           className="img-circle elevation-1" 
                           data-toggle="dropdown"
                        /> */}

                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                           <span class="dropdown-item dropdown-header ">ข้อมูลสมาชิก</span>
                           <div class="dropdown-divider" />
                           {/* <span className="dropdown-item">
                              <i className="nav-icon far fa-envelope " />
                              ชื่อผู้ใช้ :{" \u00A0\u00A0" + user.mem_user}
                           </span>
                           <div className="dropdown-divider" /> */}
                           <span className="dropdown-item">
                              {/* <i className="nav-icon far fa-envelope " /> */}
                              ชื่อ - นามสกุล :{" \u00A0\u00A0" + user.mem_name}
                           </span>
                           <div className="dropdown-divider" />
                           {/* <span className="dropdown-item">
                              <i className="nav-icon far fa-envelope " />
                              อีเมล :{" \u00A0\u00A0" + user.mem_mail}
                           </span>
                           <div className="dropdown-divider" /> */}
                           <span className="dropdown-item">
                              {/* <i class="nav-icon far fa-address-card " /> */}
                              สิทธิ์การเข้าถึง :{" \u00A0\u00A0" + user.lv_name}
                           </span>
                           <div className="dropdown-divider" />
                           <Link to="/change-password" className="dropdown-item dropdown-footer">
                              <p className="nav-link text-warning" role="button">
                                 เปลี่ยนรหัสผ่าน
                              </p>
                           </Link>
                           <div className="dropdown-divider" />
                           <Link to="/edit-information" className="dropdown-item dropdown-footer">
                              <p className="nav-link text-warning" role="button">
                                 แก้ใขข้อมูลส่วนตัว
                              </p>
                           </Link>
                           <div className="dropdown-divider " />
                           <div href="#" className="dropdown-item dropdown-footer " onClick={logout}>
                              <p className="nav-link text-danger" role="button">
                                 ออกจากระบบ
                              </p>
                           </div>
                        </div>
                     </li>
                  </>
               )}
            </ul>
         </nav>
      </div>
   );
}
