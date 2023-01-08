import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Function
import { adminAddQuestionType } from "../../functions/admin";

//Toastify
import { toast } from "react-toastify";
const AdminAddQuestionType = () => {
   const [questionLevel, setQuestionLevel] = useState([]);
   const [value, setValue] = useState({
      type_name: "",
   });

   const navigate = useNavigate();
   const { user } = useSelector((state) => ({ ...state }));

   useEffect(() => {}, []);

   //เก็บข้อมูลจาก TextBox ลงตัวแปรต่าง ๆ
   const handleChang = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
   };

   // console.log(value);

   const handleSubmit = (e) => {
      e.preventDefault();
      // console.log("submit", value);

      adminAddQuestionType(user.token, value)
         .then((res) => {
            // console.log(res.data);
            toast.success(res.data);
            navigate("/admin-manage-question-type");
         })
         .catch((err) => {
            // console.log(err.response.data);
            toast.warning(err.response.data);
         });
   };

   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-6">
                     <h1>เพิ่มหมวดคำถาม</h1>
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                           <Link to="/index-admin">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/admin-manage-user">ข้อมูลสมาชิก</Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">
                           เพิ่มหมวดคำถาม
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
                           <form onSubmit={handleSubmit}>
                              <div className="form-group row">
                                 <div className="col-sm-2"></div>
                                 <label className="col-sm-2 col-form-label">
                                    หมวดคำถาม
                                 </label>
                                 <input
                                    type="text"
                                    className="form-control col-sm-5"
                                    name="type_name"
                                    onChange={handleChang}
                                 />
                              </div>

                              <div className="form-group" align="center">
                                 <button
                                    // style={{
                                    //    width: "110px",
                                    //    margin: " 0px 5px 0px 5px",
                                    // }}
                                    type="reset"
                                    className="btn col-sm-2 m-1 btn-danger"
                                    onClick={() => {
                                       setValue({
                                          type_name: null,
                                       });
                                       navigate("/admin-manage-question-type");
                                    }}
                                 >
                                    ยกเลิก
                                 </button>
                                 <button
                                    // style={{
                                    //    width: "110px",
                                    //    margin: " 0px 5px 0px 5px",
                                    // }}
                                    className="btn col-sm-2 m-1 btn-success"
                                 >
                                    บันทึกข้อมูล
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

export default AdminAddQuestionType;
