import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// BootStrap
import { Modal, Button, Form } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

//Query
import { loadQuestionTypeName } from "../../functions/query";
import { officerReadFAQType, deleteFAQ } from "../../functions/officer";

import { toast } from "react-toastify";

const OfficerReadFAQType = () => {
   const [status, setStatus] = useState(0);
   const [data, setData] = useState([]);
   const type_id = localStorage.officer_type_id;
   const { user } = useSelector((state) => ({ ...state }));
   const [qst_type_name, setQst_Type_Name] = useState("");
   const [value, setValue] = useState({
      type_id: 0,
      qst_title: "",
      qst_detail: "",
   });

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
      officerReadFAQType(user.token, { type_id: type_id })
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
      setStatus(0);
   }, [status]);

   const indexN = (cell, row, enumObject, index) => {
      return <div>{index + 1}</div>;
   };

   const manageButoon = (cell, row) => {
      if (row.type_id) {
         return (
            <div className="position-sticky">
               <Link
                  className="btn btn-warning "
                  style={{ width: "75px", margin: " 0px 5px 0px 5px" }}
                  to={`/officer-edit-faq`}
                  onClick={() => {
                     localStorage.setItem("faq_id", row.faq_id);
                  }}
               >
                  แก้ไข
               </Link>
               <button
                  type="button"
                  style={{ width: "75px", margin: " 0px 5px 0px 5px" }}
                  className="btn btn-danger"
                  onClick={() => {
                     setModalConfirmDeleteValue(row.faq_id);
                     // console.log("ลบ", modalConfirmDeleteValue);
                     toggleMCDTrueFalse();
                  }}
               >
                  ลบ
               </button>
            </div>
         );
      }
   };

   //Modal Bootstrap
   const [modalConfirmDeleteValue, setModalConfirmDeleteValue] = useState([]);
   const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
   const [showMCD, setShowMCD] = useState(false);
   const handleMCDClose = () => setShowMCD(false);
   const handleMCDShow = () => setShowMCD(true);

   const handleOK_ModalConfirmDelete = () => {
      // console.log("OK", modalConfirmDeleteValue);
      deleteFAQ(user.token, { faq_id: modalConfirmDeleteValue })
         .then((res) => {
            // console.log(res.data);
            toast.success(res.data);
            setStatus(1);
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);
            toast.err(err.response.date);
            console.log(err.response.date);
         });
      setShowMCD(false);
   };

   const toggleMCDTrueFalse = () => {
      setShowModalConfirmDelete(handleMCDShow);
   };

   const ModalConfirmDelete = () => {
      return (
         <Modal
            show={showMCD}
            onHide={handleMCDClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
         >
            <Modal.Header>
               <Modal.Title>แจ้งเตือน</Modal.Title>
            </Modal.Header>
            <Modal.Body>คุณต้องการลบคำถามของคุณใช่หรือไม่ !!!</Modal.Body>
            <Modal.Footer>
               {/* onClick={props.onHide} */}
               <Button variant="primary" onClick={handleMCDClose}>
                  ปิด
               </Button>
               {/*  onClick={props.onOK} */}
               <Button variant="danger" onClick={handleOK_ModalConfirmDelete}>
                  ใช่
               </Button>
            </Modal.Footer>
         </Modal>
      );
   };

   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-4">
                     <h1>หมวดคำถาม FAQ</h1>
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
                              to="/officer-manage-faq"
                              onClick={() => {
                                 localStorage.setItem("officer_type_id", null);
                              }}
                           >
                              จัดการ FAQ
                           </Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">
                           หมวดคำถาม FAQ
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
                              {qst_type_name.type_name}
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
                                 dataField="faq_title"
                              >
                                 หัวข้อคำถาม
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                 dataSort
                                 width="200"
                                 dataAlign="center"
                                 dataFormat={manageButoon}
                                 dataField="any"
                              >
                                 จัดการ
                              </TableHeaderColumn>
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
         {showMCD ? <ModalConfirmDelete /> : null}
         {/* /.content */}
         {/* /modal */}
         {/* <ConfirmDelete /> */}
         {/* {showMCD ? <ModalConfirmDelete /> : null} */}
      </div>
   );
};

export default OfficerReadFAQType;
