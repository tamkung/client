import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//fucntions
import { addQuestion } from "../../functions/user";

//Redux
import { useSelector } from "react-redux";

//Query
import { loadQuestionType } from "../../functions/query";

import { toast } from "react-toastify";

const AddQuestion = () => {
   const navigate = useNavigate();
   const { user } = useSelector((state) => ({ ...state }));
   const [questionType, setQuestionType] = useState([]);
   const [value, setValue] = useState({
      type_id: 0,
      qst_title: "",
      qst_detail: "",
      qst_name: user.mem_name,
      qst_mail: user.mem_mail,
   });

   const [file, setFile] = useState("");

   const loadDataTypeQ = async () => {
      loadQuestionType(user.token, value)
         .then((res) => {
            console.log(res.data);
            setQuestionType(res.data);
         })
         .catch((err) => {
            console.log(err.response);
         });
   };
   useEffect(() => {
      loadDataTypeQ();
      console.log(user);
   }, []);

   //เก็บข้อมูลจาก TextBox ลงตัวแปรต่าง ๆ
   const handleChang = (e) => {
      setValue({
         ...value,
         qst_name: user.mem_name,
         qst_mail: user.mem_mail,
         [e.target.name]: e.target.value,
      });
      console.log("Value : ", value);
   };

   const onChange = (e) => {
      if (e.target.files[0] != null) {
         setFile(e.target.files[0]);
         console.log("File : ", file);
      } else {
         setFile("null");
      }
   };

   // console.log(value);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      console.log("file : ", file);
      console.log("value : ", value);

      formData.append("type_id", value.type_id);
      formData.append("qst_title", value.qst_title);
      formData.append("qst_detail", value.qst_detail);
      formData.append("qst_name", value.qst_name);
      formData.append("qst_mail", value.qst_mail);
      formData.append("file", file);

      console.log("submit Add Question", formData);

      addQuestion(user.token, formData)
         .then((res) => {
            console.log(res.data);
            toast.success(res.data);
            navigate("/user-question");
         })
         .catch((err) => {
            console.log(err.response.data);
            toast.error(err.response.data);
         });
   };

   const handCancel = (e) => {
      setValue({
         type_id: 0,
         qst_title: "",
         qst_detail: "",
         qst_name: "",
         qst_mail: "",
         mem_id: "",
         qst_img: "",
      });
      setFile("null");
      navigate("/user-question");
   };

   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-md-6">
                     <h1>เพิ่มคำถาม</h1>
                  </div>
                  <div className="col-md-6">
                     <ol className="breadcrumb float-md-right">
                        <li className="breadcrumb-item">
                           <Link to="/index-user">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item float-md-right">
                           <Link to="/user-question">คำถามของฉัน</Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">
                           เพิ่มคำถาม
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
                           <form onSubmit={handleSubmit}>
                              <div className="form-group row">
                                 <div className="col-md-2"></div>
                                 <label className="col-md-2 col-form-label">
                                    หมวดคำถาม
                                 </label>
                                 <select
                                    name="type_id"
                                    className="form-control col-md-6"
                                    onChange={handleChang}
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
                                 <div className="col-md-2"></div>
                              </div>
                              <div className="form-group row">
                                 <div className="col-md-2"></div>
                                 <label className="col-md-2">หัวข้อคำถาม</label>
                                 <input
                                    type="text"
                                    className="form-control col-md-6"
                                    name="qst_title"
                                    placeholder="กรอกหัวข้อคำถาม"
                                    // pattern="\w{4,30}"
                                    // title="Please input range 4 - 30 alphabet"
                                    onChange={handleChang}
                                 />
                                 <div className="col-md-2"></div>
                              </div>

                              <div className="form-group row">
                                 <div className="col-md-2"></div>
                                 <label className="col-md-2">รายละเอียด</label>
                                 <textarea
                                    className="form-control col-md-6"
                                    name="qst_detail"
                                    rows="3"
                                    onChange={handleChang}
                                 ></textarea>
                                 <div className="col-md-2"></div>
                              </div>
                              <div className="form-group row">
                                 <div className="col-md-2"></div>
                                 <label className="col-md-2">
                                    ผู้ตั้งคำถาม
                                 </label>
                                 <input
                                    type="text"
                                    className="form-control col-md-6"
                                    name="qst_name"
                                    placeholder="Input Username 4 characters or more"
                                    // pattern="\w{4,30}"
                                    // title="Please input range 4 - 30 alphabet"
                                    onChange={handleChang}
                                    defaultValue={user.mem_name}
                                    disabled={true}
                                 />
                                 <div className="col-md-2"></div>
                              </div>
                              <div className="form-group row">
                                 <div className="col-md-2"></div>
                                 <label className="col-md-2">อีเมล</label>
                                 <input
                                    type="email"
                                    className="form-control col-md-6"
                                    name="qst_mail"
                                    placeholder="example@example.com"
                                    pattern="^(?=\b[a-zA-Z0-9._-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z0-9]{2,}\b).*$"
                                    title="Please input correct format Email"
                                    defaultValue={user.mem_mail}
                                    onChange={handleChang}
                                    disabled={true}
                                 />
                                 <div className="col-md-2"></div>
                              </div>

                              <div className="form-group row">
                                 <div className="col-md-2"></div>
                                 <label className="col-md-2">
                                    แนบไฟล์ (JPEG, JPG, PNG, PDF)
                                 </label>
                                 <div className="form-group">
                                    <div className="btn btn-default btn-file">
                                       <i className="fas fa-paperclip" />{" "}
                                       แนบไฟล์
                                       <input
                                          type="file"
                                          className="form-control-file col-md-6"
                                          name="qst_img"
                                          onChange={onChange}
                                       />
                                    </div>
                                    <pi
                                       style={{
                                          wordBreak: "break-word",
                                       }}
                                    >
                                       {" \u00A0\u00A0"}
                                       {file ? file.name : <></>}
                                    </pi>
                                    {/* <p className="help-block">Max. 32MB</p> */}
                                 </div>

                                 <div className="col-md-2"></div>
                              </div>
                              <div className="form-group" align="center">
                                 <button
                                    // style={{
                                    //     width: "110px",
                                    //     margin: " 0px 5px 0px 5px",
                                    // }}
                                    type="reset"
                                    className="btn btn-danger col-sm-2 m-1"
                                    onClick={handCancel}
                                 >
                                    ยกเลิก
                                 </button>
                                 <button
                                    // style={{
                                    //     width: "110px",
                                    //     margin: " 0px 5px 0px 5px",
                                    // }}
                                    className="btn btn-success col-sm-2 m-1"
                                 >
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

export default AddQuestion;
