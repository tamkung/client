import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

//function
import { countFAQType } from "../../functions/query";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const OfficerManageFAQ = () => {
   const [dataQuestionType, setDataQuestionType] = useState([]);
   const [bgSmallBox, setBgSmallBox] = useState({
      0: "bg-primary",
      1: "bg-secondary",
      2: "bg-info",
      3: "bg-success",
      4: "bg-warning",
      5: "bg-danger",
      6: "bg-light",
      7: "bg-purple",
      8: "bg-indigo",
      9: "bg-orange",
   });
   const { user } = useSelector((state) => ({ ...state }));

   const loadData = () => {
      countFAQType(user.token)
         .then((res) => {
            // console.log(res.data);
            setDataQuestionType(res.data);
         })
         .catch((err) => {
            console.log(err.response.data);
         });
   };

   useEffect(() => {
      loadData();
   }, []);

   // const Small_Boxes = (props) => {
   //    const { type_id, count_type_id, type_name, p_key } = props;

   //    return (
   //       <div className="col-lg-3 col-6">
   //          <div className={"small-box " + bgSmallBox[p_key % 10]}>
   //             <div className="inner">
   //                <div className="row">
   //                   <h1 style={{ margin: " auto 5px auto 5px" }}>{count_type_id}</h1>
   //                   <h4 style={{ margin: " auto 5px auto 5px" }}> คำถาม</h4>
   //                </div>

   //                <h6 style={{ height: "60px" }}>หมวด {type_name}</h6>
   //             </div>
   //             {/* <div className="icon">
   //                <i className="ion ion-pie-graph" />
   //             </div> */}
   //             <Link
   //                to="/officer-read-faq-type"
   //                className="small-box-footer"
   //                onClick={() => {
   //                   // console.log("type_id : ", type_id);
   //                   localStorage.setItem("officer_type_id", type_id);
   //                }}
   //             >
   //                ดูข้อมูล <i className="fas fa-arrow-circle-right" />
   //             </Link>
   //          </div>
   //       </div>
   //    );
   // };

   const indexN = (cell, row, enumObject, index) => {
      return <div>{index + 1}</div>;
   };

   const manageButoon = (cell, row) => {
      if (row.type_id) {
         return (
            <div className="position-sticky">
               {/* <Link
                  to="/admin-edit-level"
                  className="btn btn-warning"
                  onClick={() => {
                     localStorage.setItem("level_id", row.lv_id);
                  }}
               >
                  แก้ไข
               </Link> */}
               <Link
                  to="/officer-read-faq-type"
                  className=" btn btn-primary"
                  onClick={() => {
                     // console.log("type_id : ", type_id);
                     localStorage.setItem("officer_type_id", row.type_id);
                  }}
               >
                  จัดการข้อมูล
               </Link>
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
                  <div className="col-sm-3">{/* <h1>จัดการ FAQ</h1> */}</div>
                  <div className="col-sm-3">
                     {/* <Link
                        className="btn btn-success btn-sm "
                        to="/officer-add-faq"
                     >
                        เพิ่ม FAQ
                     </Link> */}
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
                        <li className="breadcrumb-item font-weight-bold">
                           จัดการ FAQ
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
                     {/* <div className="row">
                        {dataQuestionType.map((value, key) => {
                           return (
                              <Small_Boxes
                                 type_name={value.type_name}
                                 count_type_id={value.count_type_id}
                                 p_key={key}
                                 type_id={value.type_id}
                                 key={key}
                              />
                           );
                        })}
                     </div> */}

                     <div className="card">
                        <div className="card-header">
                           <h3 className="card-title">จัดการ FAQ</h3>
                           <div className="card-tools">
                              <Link
                                 className="btn btn-success btn-sm "
                                 to="/officer-add-faq"
                              >
                                 เพิ่ม FAQ
                              </Link>
                           </div>
                        </div>
                        <div className="card-body">
                           {/* <h1>คำถามของฉัน</h1> */}

                           <BootstrapTable // Component ตาราง
                              data={dataQuestionType}  // ข้อมูลทังหมดของตาราง
                              hover //เมื่อนำเม้าส์ขี้มีสีไฮไลน์
                              pagination //ตัวแยกหน้า
                              search //ช่องค้นหา
                           >
                              <TableHeaderColumn
                                 isKey 
                                 dataSort //ปุ่มการจัดเรียงข้อมูล
                                 width="65" //ความกว้างที่น้อยที่สุด
                                 dataAlign="center" //การจัดตัวอักษรกึ่งกลาง
                                 dataField="any" //ข้อมูล Column ที่แสดงผล
                                 dataFormat={indexN} //นำ Component มาแสดงผลในตาราง 
                              >
                                 ลำดับ
                              </TableHeaderColumn>
                              <TableHeaderColumn dataSort width="450" headerAlign="center" dataField="type_name">
                                 ชื่อหมวดคำถาม
                              </TableHeaderColumn>
                              <TableHeaderColumn dataSort width="115" headerAlign="center" dataAlign="center" dataField="count_type_id">
                                 จำนวนคำถาม
                              </TableHeaderColumn>
                              <TableHeaderColumn dataSort width="150" dataAlign="center" dataFormat={manageButoon} dataField="any">
                                 จัดการ
                              </TableHeaderColumn>
                           </BootstrapTable>

                        </div>
                        {/* /.card-body */}
                        <div className="card-footer"></div>
                        {/* /.card-footer*/}
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* /.content */}
      </div>
   );
};

export default OfficerManageFAQ;
