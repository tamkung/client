import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

// Query
import { officerCountReply } from "../../functions/officer";
import { countMember } from "../../functions/query";

// import chart
import ChartDoughnutComponent from "../officer/chart/ChartDoughnutComponent";
import ChartBarComponent from "../officer/chart/ChartBarComponent";
import ChartBarMember from "./chart/ChartBarMember";
import TableComponent from "../tables/TableComponent";
// import ChartBarMember from "./chart/ChartBarMember";

import { Link } from "react-router-dom";

const Home = () => {
   const { user } = useSelector((state) => ({ ...state }));
   const [countQst, setCountQst] = useState({});
   const [countMem, setCountMem] = useState({});

   const [bgSmallBox, setBgSmallBox] = useState({
      0: "bg-success",
      1: "bg-primary",
      2: "bg-danger",
      3: "bg-warning",
      4: "bg-secondary",
      5: "bg-info",
      6: "bg-light",
      7: "bg-purple",
      8: "bg-indigo",
      9: "bg-orange",
   });

   const Small_Boxes = (props) => {
      const { type_id, count, name, p_key } = props;

      return (
         <div className="col-lg-6 col-sm-6 col-md-6 col-12">
            <div className={"small-box " + bgSmallBox[p_key]}>
               {/* style={{ backgroundColor: bgSmallBox[p_key] }} */}
               <div className="inner">
                  <div className="row">
                     <h1 style={{ margin: " auto 5px auto 5px" }}>{count}</h1>
                     {/* <h4 style={{ margin: " auto 5px auto 5px" }}> คำถาม</h4> */}
                  </div>

                  <h6 style={{ height: "45px" }}>{name}</h6>
               </div>
               {/* <div className="icon">
                  <i className="ion ion-pie-graph" />
               </div> */}
               {/* <div
                  className="small-box-footer"
                  onClick={() => {
                     console.log("type_id : ", type_id);
                     localStorage.setItem("officer_type_id", type_id);
                  }}
               >
                  ดูข้อมูล <i className="fas fa-arrow-circle-right" />
               </div> */}
            </div>
         </div>
      );
   };

   const Small_Boxes_new = (props) => {
      const { type_id, count, name, p_key } = props;

      return (
         <div className="">
            <div className={"small-box " + bgSmallBox[p_key]}>
               {/* style={{ backgroundColor: bgSmallBox[p_key] }} */}
               <div className="inner">
                  <div className="row">
                     <h1 style={{ margin: " auto 5px auto 5px" }}>{count}</h1>
                     {/* <h4 style={{ margin: " auto 5px auto 5px" }}> คำถาม</h4> */}
                  </div>

                  <h6 style={{ height: "45px" }}>{name}</h6>
               </div>
               {/* <div className="icon">
                  <i className="ion ion-pie-graph" />
               </div> */}
               {/* <div
                  className="small-box-footer"
                  onClick={() => {
                     console.log("type_id : ", type_id);
                     localStorage.setItem("officer_type_id", type_id);
                  }}
               >
                  ดูข้อมูล <i className="fas fa-arrow-circle-right" />
               </div> */}
            </div>
         </div>
      );
   };

   const loadDataCount = () => {
      officerCountReply(user.token, { mem_id: user.mem_id })
         .then((res) => {
            // console.log(res.data[0]);
            setCountQst(res.data[0]);
         })
         .catch((err) => {
            console.log(err.response.data);
         });
      countMember(user.token)
         .then((res) => {
            // console.log("CountMember : ", res.data[0]);
            setCountMem(res.data[0]);
         })
         .catch((err) => {
            console.log(err.response.data);
         });
   };

   useEffect(() => {
      loadDataCount();
   }, []);

   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-6">
                     <h1>หน้าแรก</h1>
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item font-weight-bold">
                           หน้าแรก
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
                              
                           </div>
                        </div> */}
                        <div className="card-body">
                           <h1>สถิติสมาชิก</h1>
                           <section className="content">
                              <div className="container-fluid">
                                 <div className="row">
                                    <div className="col-xl-6">
                                       <div className="card card-success">
                                          {/* <div className="card-header">
                                             <h3 className="card-title"></h3>
                                             <div className="card-tools">
                                                <button
                                                   type="button"
                                                   className="btn btn-tool"
                                                   data-card-widget="collapse"
                                                >
                                                   <i className="fas fa-minus" />
                                                </button>
                                             </div>
                                          </div> */}
                                          <div className="card-body">
                                             <div className="chart">
                                                <div className="row">
                                                   {/* BOX BOX BOX */}
                                                   <Small_Boxes
                                                      name={"ผู้ใช้"}
                                                      count={countMem.user_num}
                                                      p_key={0}
                                                   />
                                                   <Small_Boxes
                                                      name={"เจ้าหน้าที่"}
                                                      count={
                                                         countMem.officer_num
                                                      }
                                                      p_key={1}
                                                   />
                                                   <Small_Boxes
                                                      name={"ถูกปิดการใช้งาน"}
                                                      count={
                                                         countMem.user_disble
                                                      }
                                                      p_key={2}
                                                   />
                                                   <Small_Boxes
                                                      name={"ผู้ดูแลระบบ"}
                                                      count={countMem.admin_num}
                                                      p_key={3}
                                                   />
                                                   {/* BOX BOX BOX */}
                                                </div>
                                             </div>
                                          </div>
                                          {/* /.card-body */}
                                       </div>
                                    </div>
                                    <div className="col-xl-6">
                                       <div className="card card-success">
                                          {/* <div className="card-header">
                                             <h3 className="card-title">
                                               
                                             </h3>
                                             <div className="card-tools">
                                                <button
                                                   type="button"
                                                   className="btn btn-tool"
                                                   data-card-widget="collapse"
                                                >
                                                   <i className="fas fa-minus" />
                                                </button>
                                             </div>
                                          </div> */}
                                          <div className="card-body">
                                             <div className="chart">
                                                <ChartBarMember />
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 {/* /.row */}
                              </div>
                              {/* /.container-fluid */}
                           </section>
                           <hr />
                           <h1>สถิติการตอบคำถาม</h1>
                           <section className="content">
                              <div className="container-fluid">
                                 <div className="row">
                                    <div className="col-xl-6">
                                       <div className="card card-success">
                                          {/* <div className="card-header">
                                             <h3 className="card-title"></h3>
                                             <div className="card-tools">
                                                <button
                                                   type="button"
                                                   className="btn btn-tool"
                                                   data-card-widget="collapse"
                                                >
                                                   <i className="fas fa-minus" />
                                                </button>
                                             </div>
                                          </div> */}
                                          <div className="card-body">
                                             <div className="chart">
                                                <div className="row">
                                                   {/* BOX BOX BOX */}
                                                   <Small_Boxes
                                                      name={"คำถามทั้งหมด"}
                                                      count={countQst.allQst}
                                                      p_key={0}
                                                   />
                                                   <Small_Boxes
                                                      name={
                                                         "คำถามทั้งหมดที่ตอบแล้ว"
                                                      }
                                                      count={
                                                         countQst.successQst
                                                      }
                                                      p_key={1}
                                                   />
                                                   <Link
                                                      to="/officer-question-type"
                                                      className="col-lg-6 col-6"
                                                   >
                                                      <Small_Boxes_new
                                                         name={
                                                            "คำถามทั้งหมดที่ยังไม่ได้ตอบ"
                                                         }
                                                         count={
                                                            countQst.waitReply
                                                         }
                                                         p_key={2}
                                                      />
                                                   </Link>
                                                   <Small_Boxes
                                                      name={
                                                         "คำถามที่ (" +
                                                         user.mem_name +
                                                         ") ตอบ"
                                                      }
                                                      count={countQst.ownReply}
                                                      p_key={3}
                                                   />
                                                   {/* BOX BOX BOX */}
                                                </div>
                                             </div>
                                          </div>
                                          {/* /.card-body */}
                                       </div>
                                    </div>
                                    <div className="col-xl-6">
                                       <div className="card card-success">
                                          {/* <div className="card-header">
                                             <h3 className="card-title">
                                                
                                             </h3>
                                             <div className="card-tools">
                                                <button
                                                   type="button"
                                                   className="btn btn-tool"
                                                   data-card-widget="collapse"
                                                >
                                                   <i className="fas fa-minus" />
                                                </button>
                                             </div>
                                          </div> */}
                                          <div className="card-body">
                                             <div className="chart">
                                                <ChartBarComponent />
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    {/* <div className="col-xl-6"> */}
                                    {/* /.card */}
                                    {/* DONUT CHART */}

                                    {/* /.card */}
                                    {/* </div> */}
                                    {/* /.col (LEFT) */}
                                    {/* /.col (RIGHT) */}
                                 </div>
                                 {/* /.row */}
                              </div>
                              {/* /.container-fluid */}
                           </section>
                           <hr />
                           <h1>คำถามทั้งหมด แบ่งตามประเภท</h1>
                           <section className="content">
                              <div className="container-fluid">
                                 <div className="row">
                                    <div className="col-xl-6">
                                       <div className="card card-success">
                                          <div className="card-header">
                                             <h3 className="card-title">
                                                สถิติคำถามแยกตามหมวด
                                             </h3>
                                             <div className="card-tools">
                                                <button
                                                   type="button"
                                                   className="btn btn-tool"
                                                   data-card-widget="collapse"
                                                >
                                                   <i className="fas fa-minus" />
                                                </button>
                                             </div>
                                          </div>
                                          <div className="card-body">
                                             <div className="chart">
                                                <TableComponent />
                                             </div>
                                          </div>
                                          {/* /.card-body */}
                                       </div>
                                    </div>
                                    <div className="col-xl-6">
                                       <div className="card card-success">
                                          <div className="card-header">
                                             <h3 className="card-title">
                                                สถิติคำถามทั้งหมด
                                             </h3>
                                             <div className="card-tools">
                                                <button
                                                   type="button"
                                                   className="btn btn-tool"
                                                   data-card-widget="collapse"
                                                >
                                                   <i className="fas fa-minus" />
                                                </button>
                                             </div>
                                          </div>
                                          <div className="card-body">
                                             <div className="chart">
                                                <ChartDoughnutComponent />
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    {/* <div className="col-xl-6"> */}
                                    {/* /.card */}
                                    {/* DONUT CHART */}

                                    {/* /.card */}
                                    {/* </div> */}
                                    {/* /.col (LEFT) */}
                                    {/* /.col (RIGHT) */}
                                 </div>
                                 {/* /.row */}
                              </div>
                              {/* /.container-fluid */}
                           </section>
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

export default Home;
