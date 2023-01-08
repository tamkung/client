import React, { useState } from "react";
import { newPassword } from "../../functions/auth";

import { Link, useNavigate } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";

//Toastfy
import { toast } from "react-toastify";

const NewPassword = () => {
   const [value, setValue] = useState({
      mem_tal: "",
      mem_pwd: "",
      con_mem_pwd: "",
   });
   const navigate = useNavigate();

   //เก็บข้อมูลจาก TextBox ลงตัวแปรต่าง ๆ
   const handleChang = (e) => {
      setValue({
         ...value,
         mem_tal: localStorage.fp_tal,
         [e.target.name]: e.target.value,
      });
   };
   // console.log(value);

   const handCancel = (e) => {
      setValue({
         mem_tal: "",
         mem_pwd: "",
         con_mem_pwd: "",
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submit", value);
      if (value.mem_pwd == "" && value.con_mem_pwd == "") {
         toast.error("กรุณากรอกข้อมูล");
      } else {
         if (value.mem_pwd !== value.con_mem_pwd) {
            toast.error("รหัสผ่านไม่ตรงกัน");
         } else {
            newPassword(value)
               .then((res) => {
                  console.log(res.data);
                  toast.success(res.data);
                  navigate("/login");
                  localStorage.clear();
               })
               .catch((err) => {
                  console.log(err.response.data);
                  toast.error(err.response.data);
               });
         }
      }
   };

   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-6">
                     <h1>ตั้งรหัสผ่านใหม่</h1>
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                           <Link to="/">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">
                           ตั้งรหัสผ่านใหม่
                        </li>
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
                     <div className="card card-warning card-outline">
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
                           <form
                              className="form-horizontal"
                              onSubmit={handleSubmit}
                           >
                              <div className="form-group row">
                                 <div className="col-sm-1"></div>
                                 <label className="col-sm-2 col-form-label">
                                    รหัสผ่าน
                                 </label>
                                 <div className="col-sm-8">
                                    <input
                                       type="password"
                                       className="form-control"
                                       name="mem_pwd"
                                       placeholder="รหัสผ่าน"
                                       pattern="^(?=.*[\w|\d|@|$|!|%|*|#|?|&]).{8,30}$"
                                       title="กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร"
                                       onChange={handleChang}
                                    />
                                 </div>
                                 <div className="col-sm-2"></div>
                              </div>
                              <div className="form-group row">
                                 <div className="col-sm-1"></div>
                                 <label className="col-sm-2 col-form-label">
                                    ยืนยันรหัสผ่าน
                                 </label>
                                 <div className="col-sm-8">
                                    <input
                                       type="password"
                                       className="form-control"
                                       name="con_mem_pwd"
                                       placeholder="ยืนยันรหัสผ่าน"
                                       pattern="^(?=.*[\w|\d|@|$|!|%|*|#|?|&]).{8,30}$"
                                       title="กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร"
                                       onChange={handleChang}
                                    />
                                 </div>
                                 <div className="col-sm-2"></div>
                              </div>
                              <div className="form-group" align="center">
                                 <button
                                    style={{
                                       width: "75px",
                                       margin: " 0px 5px 0px 5px",
                                    }}
                                    type="reset"
                                    className="btn btn-danger"
                                    onClick={handCancel}
                                 >
                                    ยกเลิก
                                 </button>
                                 <button
                                    style={{
                                       width: "75px",
                                       margin: " 0px 5px 0px 5px",
                                    }}
                                    className="btn btn-success"
                                 >
                                    ตกลง
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

export default NewPassword;
