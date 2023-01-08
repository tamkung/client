import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// BootStrap
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

//Query
import { loadQuestionTypeName } from "../../functions/query";
import { officerReadQuestionType } from "../../functions/officer";

import { toast } from "react-toastify";

const OfficerReadQuestionType = () => {
   const [data, setData] = useState([]);
   const type_id = localStorage.officer_type_id;
   const { user } = useSelector((state) => ({ ...state }));
   const [qst_type_name, setQst_Type_Name] = useState("");

   const loadDataTypeQ = async () => {
      loadQuestionTypeName(user.token, { type_id: type_id })
         .then((res) => {
            // console.log(res.data[0]);
            setQst_Type_Name(res.data[0]);
         })
         .catch((err) => {
            console.log(err.response);
         });
   };
   const loadData = () => {
      officerReadQuestionType(user.token, { type_id: type_id })
         .then((res) => {
            // console.log(res.data);
            setData(res.data);
         })
         .catch((err) => {
            // console.log(err);
            // console.log(err.response);
            console.log(err.response);
            toast.error(err.response.data);
         });
   };

   useEffect(() => {
      loadDataTypeQ();
      loadData();
   }, [localStorage.officer_type_id]);

   const indexN = (cell, row, enumObject, index) => {
      return <div>{index + 1}</div>;
   };

   const manageButoon = (cell, row) => {
      if (row.type_id) {
         return (
            <div className="position-sticky">
               {/* <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => {
                     alert("กำลังดำเนินการสร้าง");
                  }}
               >
                  แก้ไข
               </button>  */}
               <Link
                  to="/officer-answer-question"
                  className="btn btn-primary"
                  onClick={() => {
                     localStorage.setItem("question_id", row.qst_id);
                  }}
               >
                  จัดการข้อมูล
               </Link>
            </div>
         );
      }
   };
   const statusText = (cell, row) => {
      if (row.sta_id) {
         return (
            <div className="position-sticky">
               {row.sta_id == 3 ? (
                  <p className="btn btn-warning col-12">{row.sta_name}</p>
               ) : (
                  <p className="btn btn-success col-12">{row.sta_name}</p>
               )}
            </div>
         );
      }
   };
   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-4">
                     {/* <h1>ตอบคำถามตามหมวดคำถาม</h1> */}
                  </div>
                  {/* <div className="col-sm-3">
                     <Link className="btn btn-success btn-sm " to="/user-add-question">
                        เพิ่มคำถาม
                     </Link>
                  </div> */}
                  <div className="col-sm-8">
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
                        <li className="breadcrumb-item">
                           <Link
                              to="/officer-question-type"
                              onClick={() => {
                                 localStorage.setItem("officer_type_id", null);
                              }}
                           >
                              หมวดคำถาม
                           </Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">
                           ตอบคำถามตามหมวด {qst_type_name.type_name}
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
                        <div className="card-header">
                           <h3 className="card-title">
                              ตอบคำถามตามหมวด {qst_type_name.type_name}
                           </h3>
                        </div>
                        <div className="card-body">
                           {/* <h1>คำถามของฉัน</h1> */}

                           <BootstrapTable data={data} hover pagination search>
                              <TableHeaderColumn
                                 dataSort
                                 width="50"
                                 isKey
                                 dataAlign="center"
                                 dataField="any"
                                 dataFormat={indexN}
                              >
                                 ลำดับ
                              </TableHeaderColumn>
                              {/* <TableHeaderColumn dataSort width="50" dataField="qst_id">
                                 ID
                              </TableHeaderColumn> */}
                              <TableHeaderColumn
                                 dataSort
                                 width="200"
                                 headerAlign="center"
                                 dataField="qst_title"
                              >
                                 หัวข้อคำถาม
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                 dataSort
                                 width="125"
                                 dataAlign="center"
                                 // dataField="sta_name"
                                 dataFormat={statusText}
                              >
                                 สถานะ
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                 dataSort
                                 width="125"
                                 dataAlign="center"
                                 dataField="date_format"
                              >
                                 วันที่ส่งคำถาม
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                 dataSort
                                 width="125"
                                 dataAlign="center"
                                 dataFormat={manageButoon}
                                 dataField="any"
                              >
                                 จัดการ
                              </TableHeaderColumn>

                              {/* <TableHeaderColumn dataField="any" dataFormat={manageButoon}>
                                 การดำเนินการ
                              </TableHeaderColumn> */}
                           </BootstrapTable>
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer"></div>
                        {/* /.card-footer*/}
                     </div>
                     {/* /.card */}
                  </div>
               </div>
            </div>
         </section>
         {/* /.content */}
         {/* /modal */}
         {/* <ConfirmDelete /> */}
         {/* {showMCD ? <ModalConfirmDelete /> : null} */}
      </div>
   );
};

export default OfficerReadQuestionType;
