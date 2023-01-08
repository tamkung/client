import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// BootStrap
import { Modal, Button } from "react-bootstrap";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

// Function
import { loadQuestionType } from "../../functions/query";
import { adminDeleteQuestionType } from "../../functions/admin";

//Toastify
import { toast } from "react-toastify";

const AdminManageQuestionType = () => {
   const [data, setData] = useState([]);
   //    const [tableIndex, setTableIndex] = useState(0);
   const [showMCD, setShowMCD] = useState(false);
   const { user } = useSelector((state) => ({ ...state }));

   const loadData = () => {
      loadQuestionType(user.token)
         .then((res) => {
            // console.log(res.data);
            setData(res.data);
         })
         .catch((err) => {
            // console.log(err);
            console.log(err.response);
            console.log(err.response.date);
         });
   };

   useEffect(() => {
      loadData();
   }, [showMCD]);

   const indexN = (cell, row, enumObject, index) => {
      return <div>{index + 1}</div>;
   };

   const manageButoon = (cell, row) => { // Component แสดงปุ่ม แก้ไข และลบ ในตาราง
      if (row.type_id) { //ตรวจตอบข้อมูลจากตาราง
         return (
            <div className="position-sticky"> {/* เมื่อมีข้อมูลจากตาราง */}
               <Link // มีหน้าที่เหมือน Tag a <a></a>
                  style={{ width: "75px", margin: " 0px 5px 0px 5px" }} //กำหนดขนาดของปุ่ม
                  to="/admin-edit-question-type" //ส่งไป Page แก้ไขหมวดคำถาม
                  className="btn btn-warning" //ปุ่มสึเหลือง
                  onClick={() => {
                     localStorage.setItem("question_type_id", row.type_id); 
                     //เก็บ รหัสหมวดคำถาม ไว้ใน browser เพื่อให้ Page แก้ไขหมวดคำถาม เพื่อเรียกข้อมูลมาแก้ไข
                  }}
               >
                  แก้ไข
               </Link>
               <button //ปุ่มลบข้อมูล
                  style={{ width: "75px", margin: " 0px 5px 0px 5px" }} //กำหนดขนาดของปุ่ม
                  type="button"
                  className="btn btn-danger" //ปุ่มสึแดง
                  onClick={() => {//เมื่อคลิกปุ่ม
                     setModalConfirmDeleteValue(row.type_id); 
                     //เก็บ รหัสหมวดคำถาม ไว้ใน browser 
                     // console.log("ลบ", modalConfirmDeleteValue);
                     toggleMCDTrueFalse(); //เรียก Modal ถามความแน่ใจที่จะลบข้อมูลฆ
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
   // อยู่ข้างบน เนื่องจากต้องใช้ refresh Table
   // const [showMCD, setShowMCD] = useState(false);
   const handleMCDClose = () => setShowMCD(false);
   const handleMCDShow = () => setShowMCD(true);

   const handleOK_ModalConfirmDelete = () => {
      // console.log("ConfirmDelete OK", modalConfirmDeleteValue);
      setShowMCD(false);
      adminDeleteQuestionType(user.token, { type_id: modalConfirmDeleteValue })
         .then((res) => {
            // console.log(res);
            toast.success(res.data);
            // setData(res.data);
         })
         .catch((err) => {
            toast.error(err.response.data);
            // console.log(err);
            console.log(err.response);
            console.log(err.response.data);
         });
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
            <Modal.Body>คุณต้องการลบหมวดคำถามนี้ใช่หรือไม่ !!!</Modal.Body>
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
                     {/* <h1>จัดการหมวดคำถาม</h1> */}
                  </div>
                  <div className="col-sm-2">
                     {/* <Link
                        className="btn btn-success btn-sm"
                        to="/admin-add-question-type"
                     >
                        เพิ่มหมวดคำถาม
                     </Link> */}
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                           <Link to="/index-admin">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">
                           จัดการหมวดคำถาม
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
                           <h3 className="card-title">จัดการหมวดคำถาม</h3>
                           <div className="card-tools">
                              <Link
                                 className="btn btn-success btn-sm"
                                 to="/admin-add-question-type"
                              >
                                 เพิ่มหมวดคำถาม
                              </Link>
                           </div>
                        </div>

                        <div className="card-body">
                           {/* <h1>คำถามของฉัน</h1> */}

                           <BootstrapTable data={data} hover pagination search>
                              <TableHeaderColumn
                                 dataSort
                                 width="75"
                                 isKey
                                 dataAlign="center"
                                 dataField="num_row"
                              >
                                 ลำดับ
                              </TableHeaderColumn>
                              {/* <TableHeaderColumn dataSort width="50" dataField="lv_id">
                                  ID
                               </TableHeaderColumn> */}
                              <TableHeaderColumn
                                 dataSort
                                 width="300"
                                 headerAlign="center"
                                 dataField="type_name"
                              >
                                 ชื่อหมวดคำถาม
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
         {showMCD ? <ModalConfirmDelete /> : null}
      </div>
   );
};

export default AdminManageQuestionType;
