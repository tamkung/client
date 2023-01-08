import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//function
import {
   adminListUser,
   adminEnableAndDisenableMember,
} from "../../functions/admin";

//BootStrap Table
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

//Toastify
import { toast } from "react-toastify";

const AdminManageUser = () => {
   const [data, setData] = useState([]);
   const { user } = useSelector((state) => ({ ...state }));
   const [dataEnableAndDisable, setDataEnableAndDisable] = useState({
      sta_id: null,
   });

   const handleEnable = (token, id) => {
      setDataEnableAndDisable({ sta_id: 1 });
      adminEnableAndDisenableMember(token, { mem_id: id, sta_id: 1 })
         .then((res) => {
            toast.success(res.data);
         })
         .catch((err) => {
            console.log(err.response.data);
         });
   };

   const handleDisable = (token, id) => {
      setDataEnableAndDisable({ sta_id: 2 });
      adminEnableAndDisenableMember(token, { mem_id: id, sta_id: 2 })
         .then((res) => {
            toast.success(res.data);
         })
         .catch((err) => {
            console.log(err.response.data);
         });
   };

   const loadData = () => {
      adminListUser(user.token)
         .then((res) => {
            console.log(res.data);
            setData(res.data);
         })
         .catch((err) => {
            console.log(err.response.data);
         });
   };

   //BootStrap Table

   const manageButoon = (cell, row) => {
      if (row.mem_id) {
         if (row.lv_id == 1) {
            return <></>;
         } else {
            return (
               <>
                  <div className="dropdown position-static">
                     <button
                        className="btn btn-primary  dropdown-toggle "
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                     >
                        จัดการข้อมูล
                     </button>
                     <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                     >
                        <p
                           className="dropdown-item"
                           onClick={() => {
                              handleEnable(user.token, row.mem_id);
                           }}
                        >
                           อนุญาต
                        </p>
                        <p
                           className="dropdown-item"
                           onClick={() => {
                              handleDisable(user.token, row.mem_id);
                           }}
                        >
                           ไม่อนุญาต
                        </p>
                     </div>
                  </div>
               </>
            );
         }
      }
   };

   const statusText = (cell, row) => {
      if (row.sta_id) {
         return (
            <div className="position-sticky">
               {row.sta_id == 2 ? (
                  <p className="btn btn-danger btn-sm col-12">{row.sta_name}</p>
               ) : (
                  <p className="btn btn-success btn-sm col-12">
                     {row.sta_name}
                  </p>
               )}
            </div>
         );
      }
   };

   useEffect(() => {
      loadData();
   }, [dataEnableAndDisable]);
   // dataEnableAndDisable

   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-3">{/* <h1>ข้อมูลสมาชิก</h1> */}</div>
                  <div className="col-sm-3">
                     {/* <Link
                        className="btn btn-success btn-sm"
                        to="/admin-add-member"
                     >
                        เพิ่มข้อมูลสมาชิก
                     </Link> */}
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                           <Link to="/index-admin">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item font-weight-bold">
                           ข้อมูลสมาชิก
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
                           <h3 className="card-title">ข้อมูลสมาชิก</h3>
                           <div className="card-tools">
                              <Link
                                 className="btn btn-success btn-sm"
                                 to="/admin-add-member"
                              >
                                 เพิ่มข้อมูลสมาชิก
                              </Link>
                           </div>
                        </div>
                        <div className="card-body">

                           <BootstrapTable // Component ตาราง
                              data={data} // ข้อมูลทังหมดของตาราง
                              bordered={false} //ไม่แสดงเส้นขอบ
                              hover //เมื่อนำเม้าส์ขี้มีสีไฮไลน์
                              pagination //ตัวแยกหน้า
                              search //ช่องค้นหา
                              > 
                              <TableHeaderColumn  // Column ลำดับ
                                 dataSort //ปุ่มการจัดเรียงข้อมูล
                                 isKey  
                                 width="80" //ความกว้างที่น้อยที่สุด
                                 dataAlign="center" //การจัดตัวอักษรกึ่งกลาง
                                 dataField="num_row" //ข้อมูล Column ที่แสดงผล
                              > 
                                 ลำดับ
                              </TableHeaderColumn>
                              <TableHeaderColumn dataSort width="300" headerAlign="center" dataField="mem_name">
                                 ชื่อ - สกุล
                              </TableHeaderColumn>
                              <TableHeaderColumn dataSort width="150" dataAlign="center" 
                                 dataFormat={statusText} //นำ Component มาแสดงผลในตาราง
                              >
                                 สถานะ
                              </TableHeaderColumn>
                              <TableHeaderColumn dataSort width="150" dataAlign="center" dataField="lv_name">
                                 ระดับการเข้าถึง
                              </TableHeaderColumn>
                              <TableHeaderColumn width="150" dataAlign="center" dataField="any" dataFormat={manageButoon}>
                                 การดำเนินการ
                              </TableHeaderColumn>
                           </BootstrapTable>
                           
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default AdminManageUser;
