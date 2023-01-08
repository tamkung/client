import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import ImageViewer from "react-simple-image-viewer";
// BootStrap
import { Modal, Button, Form } from "react-bootstrap";

// BootStrap Table
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

//Query
import { listQuestion, deleteQuestion } from "../../functions/user";
import { loadQuestionType } from "../../functions/query";
import { toast } from "react-toastify";

const UserManageQusetion = () => {
   //IMG ZOOM START
   const [currentImage, setCurrentImage] = useState(0);
   const [isViewerOpen, setIsViewerOpen] = useState(false);
   // const images = [process.env.REACT_APP_API_IMG + "/" + modalViewValue.qst_img];
   const openImageViewer = useCallback((index) => {
      setCurrentImage(index);
      setIsViewerOpen(true);
   }, []);

   const closeImageViewer = () => {
      setCurrentImage(0);
      setIsViewerOpen(false);
   };
   //IMG ZOOM END

   const [status, setStatus] = useState(0);
   const [data, setData] = useState([]);
   const [questionType, setQuestionType] = useState([]);
   const [tableIndex, setTableIndex] = useState(0);
   const [dataUpdate, setDataUpdate] = useState([]);
   const [value, setValue] = useState({
      type_id: 0,
      qst_title: "",
      qst_img: "",
      qst_detail: "",
      qst_name: "",
      qst_mail: "",
   });

   const { user } = useSelector((state) => ({ ...state }));
   const dispatch = useDispatch();

   const loadData = () => {
      loadQuestionType(user.token, value)
         .then((res) => {
            // console.log(res.data);
            setQuestionType(res.data);
         })
         .catch((err) => {
            console.log(err.response);
         });

      listQuestion(user.token)
         .then((res) => {
            // console.log(res.data);
            setData(res.data);
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);
            // console.log(err.response.date);
         });
   };

   useEffect(() => {
      // console.log("useEffect Status : ", status);
      loadData();
      setStatus(0);
      // console.log(user);
   }, [status]);

   const handleChang = (e) => {
      setValue({ qst_title: document.getElementById("qst_title") });
   };

   // console.log(value);

   const handleSubmit = (e) => {
      e.preventDefault();
      setValue({ ...value, [e.target.name]: e.target.value });
      // console.log("submit Add Question", value);
      // addQuestion(user.token, value)
      //    .then((res) => {
      //       console.log(res.data);
      //       alert(res.data);
      //       // navigate("/user-question");
      //    })
      //    .catch((err) => {
      //       console.log(err.response.data);
      //       alert(err.response.data);
      //    });
   };

   const handCancel = (e) => {
      setValue({
         type_id: 0,
         qst_title: "",
         qst_detail: "",
         qst_name: "",
         qst_mail: "",
         mem_id: "",
      });
   };

   const indexN = (cell, row, enumObject, index) => {
      return <div>{index + 1}</div>;
   };

   const statusText = (cell, row) => {
      if (row.sta_id) {
         return (
            <div className="position-sticky">
               {row.sta_id == 3 ? (
                  <p className="btn btn-warning btn-sm col-12">
                     {row.sta_name}
                  </p>
               ) : (
                  <p className="btn btn-success btn-sm col-12">
                     {row.sta_name}
                  </p>
               )}
            </div>
         );
      }
   };

   const manageButoon = (cell, row) => {
      if (row.qst_id) {
         if (row.sta_id == 3) {
            return (
               <div className="position-sticky">
                  <button
                     type="button"
                     className="btn btn-success"
                     style={{ width: "110px", margin: " 0px 5px 0px 5px" }}
                     onClick={() => {
                        setModalViewValue(row);
                        // console.log("รายละเอียด", modalViewValue);
                        toggleMVTrueFalse();
                     }}
                  >
                     รายละเอียด
                  </button>
                  <Link
                     className="btn btn-warning "
                     style={{ width: "75px", margin: " 0px 5px 0px 5px" }}
                     to={`/user-edit-question`}
                     onClick={() => {
                        localStorage.setItem("question_id", row.qst_id);
                     }}
                  >
                     แก้ไข
                  </Link>
                  <button
                     type="button"
                     style={{ width: "50px", margin: " 0px 5px 0px 5px" }}
                     className="btn btn-danger"
                     onClick={() => {
                        setModalConfirmDeleteValue(row.qst_id);
                        // console.log("ลบ", modalConfirmDeleteValue);
                        toggleMCDTrueFalse();
                     }}
                  >
                     ลบ
                  </button>
               </div>
            );
         } else {
            return (
               <div className="position-sticky">
                  <button
                     style={{ width: "110px", margin: " 0px 5px 0px 5px" }}
                     className="btn btn-success"
                     onClick={() => {
                        setModalViewValue(row);
                        // console.log("รายละเอียด", modalViewValue);
                        toggleMVTrueFalse();
                     }}
                  >
                     รายละเอียด
                  </button>
                  <button
                     className="btn btn-warning disabled"
                     style={{ width: "75px", margin: " 0px 5px 0px 5px" }}
                  >
                     แก้ไข
                  </button>
                  <button
                     type="button"
                     className="btn btn-danger disabled"
                     style={{ width: "50px", margin: " 0px 5px 0px 5px" }}
                  >
                     ลบ
                  </button>
               </div>
            );
         }
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
      deleteQuestion(user.token, { qst_id: modalConfirmDeleteValue })
         .then((res) => {
            // console.log(status);
            setStatus(1);
            // console.log(res.data);
            toast.success(res.data);
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

   /*****************************************************************************/

   const [modalViewValue, setModalViewValue] = useState([]);
   const [showModalView, setShowModalView] = useState(false);
   const [showMV, setShowMV] = useState(false);
   const handleMVClose = () => setShowMV(false);
   const handleMVShow = () => setShowMV(true);

   const handleOK_ModalView = () => {
      // console.log("OK", modalViewValue);
      handleSubmit();
      setShowMV(false);
   };

   const toggleMVTrueFalse = () => {
      setShowModalView(handleMVShow);
   };

   const ModalView = (val) => {
      return (
         <Modal // component Modal
            size="lg" //ขนาดของ Moal
            show={showMV} //สถานะการเปิดปิด Modal
            onHide={handleMVClose} //ปุ่มกากบาทของ Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
         >
            <Modal.Header>
               {" "}
               {/* หัวข้อ Modal */}
               <Modal.Title>รายละเอียด</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {" "}
               {/* รายละเอียดของ Modal */}
               <div className="table-responsive">
                  {" "}
                  {/* ตารางแสดงผลแบบ responsive */}
                  <table
                     className="table table-borderless table-hover" //ตางไม่มีเส้นขอบ เมื่อนำเม้าส์ชี้มีไฮไลน์
                  >
                     <tbody>
                        <tr className="bg-dark">
                           <th width="150">หมวดคำถาม</th>
                           <td>{modalViewValue.type_name}</td>{" "}
                           {/* แสดงข้อมูลหมวดคำถาม */}
                        </tr>
                        <tr>
                           <th>หัวข้อคำถาม</th>
                           <td>{modalViewValue.qst_title}</td>{" "}
                           {/* แสดงข้อมูลหัวข้อคำถาม */}
                        </tr>

                        <tr>
                           <th>รายละเอียด</th>
                           <td>{modalViewValue.qst_detail}</td>{" "}
                           {/* แสดงข้อมูลรายละเอียดคำถาม */}
                        </tr>
                        <tr>
                           <th>วันที่ตั้งคำถาม</th>
                           <td>{modalViewValue.date_q}</td>{" "}
                           {/* แสดงข้อมูลวันที่ตั้งคำถาม */}
                        </tr>
                        <tr>
                           <th>ผู้ตั้งคำถาม</th>
                           <td>{modalViewValue.qst_name}</td>{" "}
                           {/* แสดงข้อมูลชื่อผู้ตั้งคำถาม */}
                        </tr>
                        <tr>
                           <th>อีเมล</th>
                           <td>{modalViewValue.qst_mail}</td>
                        </tr>
                        <tr>
                           <th>ไฟล์แนบ</th>
                           <td>
                              {modalViewValue.qst_img != 0 ? (
                                 <>
                                    {modalViewValue.qst_img.match(
                                       /\.(pdf|PDF)$/
                                    ) ? (
                                       <>
                                          {/* <h1>/user-read-pdf</h1> */}
                                          {/* <Link to="/user-read-pdf" className="btn btn-success">
                                       อ่านไฟล์ PDF
                                    </Link> */}
                                          <a
                                             className="btn btn-success"
                                             href={
                                                process.env.REACT_APP_API_IMG +
                                                "/" +
                                                modalViewValue.qst_img
                                             }
                                             target="_blank"
                                          >
                                             อ่านไฟล์ PDF
                                          </a>
                                       </>
                                    ) : (
                                       <>
                                          <button
                                             type="button"
                                             className="btn btn-success"
                                             onClick={() => openImageViewer(0)}
                                          >
                                             เปิดไฟล์
                                          </button>
                                          {isViewerOpen && (
                                             <ImageViewer
                                                src={[
                                                   process.env
                                                      .REACT_APP_API_IMG +
                                                      "/" +
                                                      modalViewValue.qst_img,
                                                ]}
                                                currentIndex={currentImage}
                                                zoomScale=""
                                                disableScroll={true}
                                                closeOnClickOutside={true}
                                                onClose={closeImageViewer}
                                             />
                                          )}
                                       </>
                                    )}
                                 </>
                              ) : (
                                 <>-</>
                              )}
                           </td>
                        </tr>
                        <tr className="table-success">
                           <th width="125">วันที่ตอบ</th>
                           <td>{modalViewValue.date_a}</td>
                        </tr>
                        <tr className="table-success">
                           <th>คำตอบกลับ</th>
                           <td>
                              <p
                                 style={{
                                    overflowWrap: "break-word",
                                 }}
                              >
                                 {modalViewValue.reply_detail}
                              </p>
                           </td>
                        </tr>
                        <tr className="table-success">
                           <th>URL</th>
                           <td>
                              <a
                                 href={modalViewValue.reply_url}
                                 style={{
                                    overflowWrap: "break-word",
                                 }}
                                 target="_blank"
                              >
                                 {modalViewValue.reply_url}
                              </a>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </Modal.Body>
            <Modal.Footer>
               {/* onClick={props.onHide} */}
               <Button variant="primary" onClick={handleMVClose}>
                  ปิด
               </Button>
               {/*  onClick={props.onOK} */}
               {/* <Button variant="danger" onClick={handleOK_ModalConfirmDelete}>
                  ใช่
               </Button> */}
            </Modal.Footer>
         </Modal>
      );
   };

   /*****************************************************************************/

   const [modalEditValue, setModalEditValue] = useState([]);
   const [showModalEdit, setShowModalEdit] = useState(false);
   const [showME, setShowME] = useState(false);
   const handleMEClose = () => setShowME(false);
   const handleMEShow = () => setShowME(true);

   const handleOK_ModalEdit = () => {
      // console.log("OK ME : ", modalEditValue);
      setShowME(false);
   };

   const toggleMETrueFalse = () => {
      setShowModalEdit(handleMEShow);
   };

   const ModalEdit = (val) => {
      return (
         <Modal
            show={showME}
            onHide={handleMEClose}
            aria-labelledby="contained-modal-title-vcenter"
         >
            <Modal.Header>
               <Modal.Title>แก้ไขคำถาม</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form
                  onSubmit={handleSubmit}
                  className="col-12 container-fluid "
               >
                  <div className="form-group row">
                     <label className="col-sm-4 col-form-label">
                        หมวดคำถาม
                     </label>
                     <select
                        name="type_id"
                        className="form-control col-sm-8"
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
                  </div>
                  <div className="form-group row">
                     <label className="col-sm-4">หัวข้อคำถาม</label>
                     <input
                        type="text"
                        className="form-control col-sm-8"
                        name="qst_title"
                        value={modalEditValue.qst_title}
                        placeholder="กรอกหัวข้อคำถาม"
                        onChange={handleChang}
                     />
                  </div>
                  <div className="form-group row">
                     <label className="col-sm-4">รายละเอียด</label>
                     <textarea
                        className="form-control col-sm-8"
                        name="qst_detail"
                        rows="3"
                        onChange={handleChang}
                     ></textarea>
                  </div>
                  <div className="form-group row">
                     <label className="col-sm-4">ผู้ตั้งคำถาม</label>
                     <input
                        type="text"
                        className="form-control col-sm-8"
                        name="qst_name"
                        placeholder="Input Username 4 characters or more"
                        onChange={handleChang}
                     />
                  </div>
                  <div className="form-group row">
                     <label className="col-sm-4">อีเมล</label>
                     <input
                        type="email"
                        className="form-control col-sm-8"
                        name="qst_mail"
                        placeholder="example@example.com"
                        pattern="^(?=\b[a-zA-Z0-9._-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z0-9]{2,}\b).*$"
                        title="Please input correct format Email"
                        onChange={handleChang}
                     />
                  </div>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={handleMEClose}>
                  ยกเลิก
               </Button>
               <Button variant="danger" onClick={handleOK_ModalEdit}>
                  ยืนยัน
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
                  <div className="col-sm-3">{/* <h1>คำถามของฉัน</h1> */}</div>
                  <div className="col-sm-3">
                     {/* <Link
                        className="btn btn-success btn-sm "
                        to="/user-add-question"
                     >
                        เพิ่มคำถาม
                     </Link> */}
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                           <Link to="/index-user">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">
                           คำถามของฉัน
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
                              ข้อมูลคำถาม - {user.mem_name}
                           </h3>

                           <div className="card-tools">
                              <Link
                                 className="btn btn-success btn-sm "
                                 to="/user-add-question"
                              >
                                 เพิ่มคำถาม
                              </Link>
                           </div>
                        </div>
                        <div className="card-body">
                           <h1>คำถามของฉัน</h1>
                           <BootstrapTable data={data} hover pagination search>
                              <TableHeaderColumn
                                 isKey
                                 dataSort
                                 width="75"
                                 dataAlign="center"
                                 dataField="num_row"
                              >
                                 ลำดับ
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                 dataSort
                                 width="300"
                                 headerAlign="center"
                                 dataField="qst_title"
                              >
                                 หัวข้อคำถาม
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                 dataSort
                                 width="150"
                                 dataAlign="center"
                                 dataFormat={statusText}
                              >
                                 สถานะ
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                 dataSort
                                 width="300"
                                 dataAlign="center"
                                 dataFormat={manageButoon}
                                 dataField="any"
                              >
                                 จัดการ
                              </TableHeaderColumn>
                           </BootstrapTable>
                        </div>
                        <div className="card-footer"></div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* /.content */}
         {/* /modal */}
         {/* <ConfirmDelete /> */}
         {showMCD ? <ModalConfirmDelete /> : null}
         {showMV ? <ModalView /> : null}
         {/* {showME ? <ModalEdit /> : null} */}
      </div>
   );
};

export default UserManageQusetion;
