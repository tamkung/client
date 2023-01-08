/* eslint-disable no-useless-escape */
// rafce
// Import
import React, { useState } from "react";
//fucntions
import { register } from "../../functions/auth";

import { Link, useNavigate } from "react-router-dom";

//Toastfy
import { toast } from "react-toastify";

const Register = () => {
   const [value, setValue] = useState({
      mem_user: "",
      mem_pwd: "",
      con_mem_pwd: "",
      mem_name: "",
      mem_mail: null,
      mem_tal: null,
      lv_id: 3,
   });
   const navigate = useNavigate();

   //เก็บข้อมูลจาก TextBox ลงตัวแปรต่าง ๆ
   const handleChang = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
   };

   // console.log(value);

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submit", value);
      if (value.mem_pwd !== value.con_mem_pwd) {
         toast.error("รหัสผ่านไม่ตรงกัน");
      } else {
         register(value)
            .then((res) => {
               console.log(res.data);
               toast.success("สมัครเป็นสมาชิกสำเร็จ");
               navigate("/login");
            })
            .catch((err) => {
               console.log(err.response.data);
               toast.error(err.response.data);
            });
      }
   };

   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-6">
                     <h1>สมัครสมาชิก</h1>
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                           <Link to="/">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">สมัครสมาชิก</li>
                     </ol>
                  </div>
               </div>
            </div>
            {/* /.container-fluid */}
         </section>
         {/* Main content */}
         <section className="content">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-12">
                     {/* Default box */}
                     <div className="card card-primary card-outline">
                        {/* <div className="card-header">
                           <h3 className="card-title">Title</h3>
                           <div className="card-tools">
                              <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                 <i className="fas fa-minus" />
                              </button>
                              <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                 <i className="fas fa-times" />
                              </button>
                           </div>
                        </div> */}
                        <div className="card-body">
                           {/* Form Register */}
                           <form onSubmit={handleSubmit}>
                              <div className="form-group row">
                                 <div className="col-sm-2"></div>
                                 <label className="col-sm-2 col-form-label">ชื่อ - นามสกุล</label>
                                 <input
                                    type="text"
                                    className="form-control col-sm-5"
                                    name="mem_name"
                                    placeholder="กรอกชื่อ-นามสกุล"
                                    pattern="^\w(\w|\s|\[ก-๙]){0,30}"
                                    title="กรอกชื่อ - นามสกุล 1 ตัวอักษรขึ้นไป"
                                    onChange={handleChang}
                                 />
                              </div>
                              <div className="form-group row">
                                 <div className="col-sm-2"></div>
                                 <label className="col-sm-2">อีเมล</label>
                                 <input
                                    type="email"
                                    className="form-control col-sm-5"
                                    name="mem_mail"
                                    placeholder="กรอกอีเมล"
                                    pattern="^(?=\b[a-zA-Z0-9._-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z0-9]{2,}\b).*$"
                                    title="กรุณาข้อมูลตามรูปแบบของอีเมล"
                                    onChange={handleChang}
                                 />
                              </div>
                              <div className="form-group row">
                                 <div className="col-sm-2"></div>
                                 <label className="col-sm-2">เบอร์โทรศัพท์</label>
                                 <input
                                    type="tel"
                                    className="form-control col-sm-5"
                                    name="mem_tal"
                                    placeholder="กรอกเบอร์โทรศัพท์"
                                    title="กรอกตามรูปแบบ 0xxxxxxxxx"
                                    pattern="^0\d{9}$"
                                    onChange={handleChang}
                                 />
                              </div>
                              <div className="form-group row">
                                 <div className="col-sm-2"></div>
                                 <label className="col-sm-2">ชื่อผู้ใช้</label>
                                 <input
                                    type="text"
                                    className="form-control col-sm-5"
                                    name="mem_user"
                                    placeholder="กรอกชื่อผู้ใช้"
                                    pattern="^(?=.*\w|\d|@|$|!|%|*|#|?|&).{6,30}$"
                                    title="กรอกชื่อผู้ใช้ 6 ตัวอักษรขึ้นไป"
                                    onChange={handleChang}
                                 />
                              </div>
                              <div className="form-group row">
                                 <div className="col-sm-2"></div>
                                 <label className="col-sm-2">รหัสผ่าน</label>
                                 <input
                                    type="password"
                                    className="form-control col-sm-5"
                                    name="mem_pwd"
                                    placeholder="รหัสผ่าน"
                                    pattern="^(?=.*[\w|\d|@|$|!|%|*|#|?|&]).{8,30}$"
                                    title="กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร"
                                    onChange={handleChang}
                                 />
                              </div>
                              <div className="form-group row">
                                 <div className="col-sm-2"></div>
                                 <label className="col-sm-2">ยืนยันรหัสผ่าน</label>
                                 <input
                                    type="password"
                                    className="form-control col-sm-5"
                                    name="con_mem_pwd"
                                    pattern="^(?=.*[\w|\d|@|$|!|%|*|#|?|&]).{8,30}$"
                                    placeholder="ยืนยันรหัสผ่าน"
                                    title="กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร"
                                    onChange={handleChang}
                                 />
                              </div>
                              <div className="form-group" align="center">
                                 <button
                                    style={{ width: "110px", margin: " 0px 5px 0px 5px" }}
                                    type="reset"
                                    className="btn btn-danger"
                                 >
                                    ยกเลิก
                                 </button>
                                 <button style={{ width: "110px", margin: " 0px 5px 0px 5px" }} className="btn btn-success">
                                    ยืนยัน
                                 </button>
                              </div>

                              {/*disabled={checkLength()} */}
                           </form>
                        </div>
                        {/* /.card-body */}
                        {/* <div className="card-footer"></div> */}
                        {/* /.card-footer*/}
                     </div>
                     {/* /.card */}
                  </div>
               </div>
            </div>
         </section>
         {/* /.content */}
      </div>
   );
};

export default Register;
