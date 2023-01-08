import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// BootStrap
import { Modal, Button } from "react-bootstrap";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import { loadLevel } from "../../functions/query";

const AdminManageLevel = () => {
   const [data, setData] = useState([]);
   //    const [tableIndex, setTableIndex] = useState(0);

   const { user } = useSelector((state) => ({ ...state }));

   const loadData = () => {
      loadLevel(user.token)
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
   }, []);

   const indexN = (cell, row, enumObject, index) => {
      return <div>{index + 1}</div>;
   };

   const manageButoon = (cell, row) => {
      if (row.lv_id) {
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
                  to="/admin-edit-level"
                  className="btn btn-warning"
                  onClick={() => {
                     localStorage.setItem("level_id", row.lv_id);
                  }}
               >
                  แก้ไข
               </Link>
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

   /*****************************************************************************/

   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-4">
                     <h1>จัดการระดับการเข้าถึงข้อมูล</h1>
                  </div>
                  {/* <div className="col-sm-3">
                     <Link className="btn btn-success btn-sm " to="/user-add-question">
                        เพิ่มคำถาม
                     </Link>
                  </div> */}
                  <div className="col-sm-8">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                           <Link to="/index-admin">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">
                           จัดการระดับการเข้าถึงข้อมูล
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
                              ข้อมูลระดับการเข้าถึงข้อมูล
                           </h3>
                        </div>
                        <div className="card-body">
                           {/* <h1>คำถามของฉัน</h1> */}

                           <BootstrapTable // Component ตาราง
                              data={data} // ข้อมูลทังหมดของตาราง
                              hover //เมื่อนำเม้าส์ขี้มีสีไฮไลน์
                              pagination //ตัวแยกหน้า
                              search //ช่องค้นหา
                           >
                              <TableHeaderColumn
                                 dataSort //ปุ่มการจัดเรียงข้อมูล
                                 width="75" //ความกว้างที่น้อยที่สุด
                                 isKey
                                 dataAlign="center" //การจัดตัวอักษรกึ่งกลาง
                                 dataField="any" //ข้อมูล Column ที่แสดงผล
                                 dataFormat={indexN} //นำ Component มาแสดงผลในตาราง 
                              >
                                 ลำดับ
                              </TableHeaderColumn>
                              <TableHeaderColumn dataSort width="175" headerAlign="center" dataField="lv_name">
                                 ชื่อระดับการเข้าถึงข้อมูล
                              </TableHeaderColumn>
                              <TableHeaderColumn dataSort width="85" dataAlign="center" 
                                 dataFormat={manageButoon} //นำ Component มาแสดงผลในตาราง 
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
         {/* /.content */}
         {/* /modal */}
         {/* <ConfirmDelete /> */}
         {showMCD ? <ModalConfirmDelete /> : null}
      </div>
   );
};

export default AdminManageLevel;
