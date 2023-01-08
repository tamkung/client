import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//fucntions
import { adminReadLevel, adminUpdateLevel } from "../../functions/admin";

//Redux
import { useSelector } from "react-redux";

//Toastify
import { toast } from "react-toastify";

const AdminEditLevel = () => {
   const level_id = localStorage.level_id;
   const [editValue, setEditValue] = useState([]);
   const [value, setValue] = useState({
      lv_id: 0,
      lv_name: "",
   });

   const navigate = useNavigate();
   const { user } = useSelector((state) => ({ ...state }));

   const loadDataLevel = async () => {
      adminReadLevel(user.token, { lv_id: level_id })
         .then((res) => {
            // console.log(res.data);
            setEditValue(res.data);
         })
         .catch((err) => {
            console.log(err.response);
         });
   };

   useEffect(() => {
      if (level_id == "null" || level_id == null) {
         navigate("/admin-manage-level");
      } else {
         loadDataLevel();
         // console.log("editValue : ", level_id);
      }
   }, []);

   //เก็บข้อมูลจาก TextBox ลงตัวแปรต่าง ๆ
   const handleChang = (e) => {
      setValue({ ...editValue[0], [e.target.name]: e.target.value });
   };

   // console.log(value);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (value.type_id === 0) {
         toast.warning("คุณยังไม่ได้แก้ไขข้อมูล");
      } else {
         // console.log("submit Edit Level", value);
         adminUpdateLevel(user.token, value)
            .then((res) => {
               // console.log(res.data);
               toast.success(res.data);
               navigate("/admin-manage-level");
            })
            .catch((err) => {
               // console.log(err.response.data);
               toast.warning(err.response.data);
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
                     <h1>แก้ไขระดับการเข้าถึง</h1>
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                           <Link to="/index-admin">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item float-sm-right">
                           <Link
                              to="/admin-manage-level"
                              onClick={() => {
                                 localStorage.setItem("level_id", null);
                              }}
                           >
                              จัดการระดับการเข้าถึง
                           </Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">
                           แก้ไขระดับการเข้าถึง
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
                     <div className="card">
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
                           {editValue.map((value, key) => (
                              <form key={key} onSubmit={handleSubmit}>
                                 <div className="form-group row">
                                    <div className="col-sm-2"></div>
                                    <label className="col-sm-2">
                                       ระดับการเข้าถึงข้อมูล
                                    </label>
                                    <input
                                       type="text"
                                       className="form-control col-sm-6"
                                       name="lv_name"
                                       defaultValue={value.lv_name}
                                       placeholder="กรอกหัวข้อคำถาม"
                                       onChange={handleChang}
                                    />
                                    <div className="col-sm-1"></div>
                                 </div>
                                 <div className="form-group" align="center">
                                    <Link
                                       to="/admin-manage-level"
                                       // style={{
                                       //     width: "75px",
                                       //     margin: " 0px 5px 0px 5px",
                                       // }}
                                       type="reset"
                                       className="btn btn-danger col-sm-2 m-1"
                                       onClick={() => {
                                          setValue({
                                             lv_name: null,
                                          });
                                       }}
                                    >
                                       ยกเลิก
                                    </Link>
                                    <button
                                       // style={{
                                       //     width: "75px",
                                       //     margin: " 0px 5px 0px 5px",
                                       // }}
                                       className="btn btn-success col-sm-2 m-1"
                                    >
                                       ยืนยัน
                                    </button>
                                 </div>
                              </form>
                           ))}
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

export default AdminEditLevel;
