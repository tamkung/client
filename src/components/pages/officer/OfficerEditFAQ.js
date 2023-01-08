import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//Redux
import { useSelector } from "react-redux";

//Query
import { loadQuestionType } from "../../functions/query";
import { officerReadFAQ } from "../../functions/officer";

import { officerUpdateFAQ } from "../../functions/officer";
import { toast } from "react-toastify";

const OfficerEditFAQ = () => {
   const frequently_asked_question_ID = localStorage.faq_id;
   const navigate = useNavigate();
   const { user } = useSelector((state) => ({ ...state }));
   const [questionType, setQuestionType] = useState([]);
   const [editValue, setEditValue] = useState([]);
   const [value, setValue] = useState({
      type_id: 0,
      faq_title: "",
      faq_detail: "",
   });

   const loadDataTypeQ = async () => {
      loadQuestionType(user.token, value)
         .then((res) => {
            // console.log(res.data);
            setQuestionType(res.data);
         })
         .catch((err) => {
            console.log(err.response);
         });
   };

   const loadDataFAQ = async () => {
      officerReadFAQ(user.token, { faq_id: frequently_asked_question_ID })
         .then((res) => {
            setEditValue(res.data);
            // console.log(res.data);
            setValue({
               faq_id: res.data[0].faq_id,
               type_id: res.data[0].type_id,
               faq_title: res.data[0].faq_title,
               faq_detail: res.data[0].faq_detail,
            });
            // console.log("EditValue: ", res.data);
         })
         .catch((err) => {
            console.log(err.response);
         });
   };

   useEffect(() => {
      loadDataTypeQ().then(() => {
         loadDataFAQ();
      });
      // console.log(user);
      // console.log(value);
   }, []);

   //เก็บข้อมูลจาก TextBox ลงตัวแปรต่าง ๆ
   const handleChang = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
      console.log("Value : ", value);
   };

   // console.log(value);

   const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log("submit Add Question", value);
      // if (value.type_id === 0) {
      //    toast.warning("คุณยังไม่ได้แก้ไขข้อมูล");
      // } else {
      officerUpdateFAQ(user.token, value)
         .then((res) => {
            // console.log(res.data);
            toast.success(res.data);
            navigate("/officer-read-faq-type");
         })
         .catch((err) => {
            console.log(err.response.data);
            toast.error(err.response.data);
         });
      // }
   };

   // const handCancel = (e) => {
   //    setValue({ type_id: 0, qst_title: "", qst_detail: "", qst_name: "", qst_mail: "", mem_id: "", qst_img: "" });
   // };
   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-6">
                     <h1>แก้ไข FAQ</h1>
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                           {user.lv_id == 1 ? (
                              /* /index-admin */
                              <Link to="/index-admin">
                                 {/* <i className="nav-icon fas fa-file" /> */}
                                 <p>หน้าแรก</p>
                              </Link>
                           ) : user.lv_id == 2 ? (
                              <Link to="/index-officer">
                                 {/* <i className="nav-icon fas fa-file" /> */}
                                 <p>หน้าแรก</p>
                              </Link>
                           ) : (
                              <></>
                           )}
                        </li>
                        <li className="breadcrumb-item float-sm-right">
                           <Link to="/officer-manage-faq">จัดการ FAQ</Link>
                        </li>
                        <li className="breadcrumb-item float-sm-right">
                           <Link to="/officer-read-faq-type">
                              หมวดคำถาม FAQ
                           </Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">
                           แก้ไข FAQ
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
                                    <label className="col-sm-2 col-form-label">
                                       หมวดคำถาม
                                    </label>
                                    <select
                                       name="type_id"
                                       className="form-control col-sm-6"
                                       onChange={handleChang}
                                       defaultValue={value.type_id}
                                    >
                                       <option value={0}>กรุณาเลือก</option>
                                       {questionType.map((questionType) => (
                                          <option
                                             key={questionType.type_id}
                                             value={questionType.type_id}
                                          >
                                             {questionType.type_name}
                                          </option>
                                       ))}
                                    </select>
                                    <div className="col-sm-2"></div>
                                 </div>
                                 <div className="form-group row">
                                    <div className="col-sm-2"></div>
                                    <label className="col-sm-2">
                                       หัวข้อคำถาม
                                    </label>
                                    <input
                                       type="text"
                                       className="form-control col-sm-6"
                                       name="faq_title"
                                       placeholder="กรอกหัวข้อคำถาม"
                                       defaultValue={value.faq_title}
                                       // pattern="\w{4,30}"
                                       // title="Please input range 4 - 30 alphabet"
                                       onChange={handleChang}
                                    />
                                    <div className="col-sm-2"></div>
                                 </div>
                                 {/* <div className="form-group row">
                                  <div className="col-sm-2"></div>
                                  <label className="col-sm-2">แนบไฟล์ (JPEG,JPG,PNG)</label>
                                  <input type="file" className="form-control-file col-sm-6" name="qst_img" onChange={onChange} />
                                  <div className="col-sm-2"></div>
                               </div> */}
                                 <div className="form-group row">
                                    <div className="col-sm-2"></div>
                                    <label className="col-sm-2">
                                       รายละเอียด
                                    </label>
                                    <textarea
                                       className="form-control col-sm-6"
                                       name="faq_detail"
                                       rows="3"
                                       defaultValue={value.faq_detail}
                                       onChange={handleChang}
                                    ></textarea>
                                    <div className="col-sm-2"></div>
                                 </div>
                                 <div className="form-group" align="center">
                                    <button
                                       // style={{ width: "110px", margin: " 0px 5px 0px 5px" }}
                                       className="btn btn-success col-sm-3 mx-1"
                                    >
                                       ยืนยัน
                                    </button>
                                 </div>

                                 {/*disabled={checkLength()} */}
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

export default OfficerEditFAQ;
