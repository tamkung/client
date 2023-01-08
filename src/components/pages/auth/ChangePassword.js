import React, { useState } from "react";
import { changePassword } from "../../functions/user";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//Toastfy
import { toast } from "react-toastify";
const ChangePassword = () => {
   const { user } = useSelector((state) => ({ ...state }));
   const [value, setValue] = useState({
      mem_user: "",
      mem_pwd: "",
   });
   const navigate = useNavigate();

   //เก็บข้อมูลจาก TextBox ลงตัวแปรต่าง ๆ
   const handleChang = (e) => {
      setValue({ ...value, mem_user: user.mem_user, [e.target.name]: e.target.value });
   };
   // console.log(value);

   const handCancel = (e) => {
      setValue({
         mem_user: "",
         mem_pwd: "",
      });
   };

   const handleSubmit = (e) => {
      //   setValue({ ...value, mem_user: user.mem_user });
      e.preventDefault();
      console.log("submit", value);

      changePassword(user.token, value)
         .then((res) => {
            console.log(res.data);
            toast.success("รหัสผ่านถูกต้อง");
            navigate("/NewPassword");
            localStorage.setItem("fp_tal", res.data);
         })
         .catch((err) => {
            console.log(err.response.data);
            toast.error(err.response.data);
            localStorage.clear();
         });
   };

   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-6">
                     <h1>ตรวจสอบรหัสผ่าน</h1>
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                           <Link to="/">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">ตรวจสอบรหัสผ่าน</li>
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
                           <form className="form-horizontal" onSubmit={handleSubmit}>
                              <div className="form-group row">
                                 <div className="col-sm-1"></div>
                                 <label className="col-sm-2 col-form-label">รหัสผ่านเดิม</label>
                                 <div className="col-sm-8">
                                    <input
                                       type="password"
                                       className="form-control"
                                       name="mem_pwd"
                                       placeholder="รหัสผ่าน"
                                       pattern="^(?=.*[\w|\d|@|$|!|%|*|#|?|&]).{6,30}$"
                                       title="กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร"
                                       onChange={handleChang}
                                    />
                                 </div>
                                 <div className="col-sm-2"></div>
                              </div>
                              <div className="form-group" align="center">
                                 <button
                                    style={{ width: "110px", margin: " 0px 5px 0px 5px" }}
                                    type="reset"
                                    className="btn btn-danger"
                                    onClick={handCancel}
                                 >
                                    ยกเลิก
                                 </button>
                                 <button style={{ width: "110px", margin: " 0px 5px 0px 5px" }} className="btn btn-success">
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

export default ChangePassword;
