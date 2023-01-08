import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { countQstOfUser } from "../../functions/user";
import ChartBarQst from "./chart/ChartBarQst";
const Home = () => {
   const { user } = useSelector((state) => ({ ...state }));
   const [countQst, setCountQst] = useState({
      all_qst: 0,
      qst_success: 0,
      qst_wait: 0,
   });

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
      const { count, name, p_key } = props;

      return (
         <div className="col-lg-4 col-md-4 col-12">
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
      countQstOfUser(user.token, { mem_id: user.mem_id })
         .then((res) => {
            // console.log(res.data);
            setCountQst(res.data);
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
                           <h1>สถิติคำถาม</h1>
                           <section className="content">
                              <div className="container-fluid">
                                 <div className="row">
                                    <div className="col-xl-12">
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
                                                <div className="row justify-content-center">
                                                   {/* BOX BOX BOX */}
                                                   <Small_Boxes
                                                      name={"คำถามทั้งหมด"}
                                                      count={countQst.all_qst}
                                                      p_key={1}
                                                   />
                                                   <Small_Boxes
                                                      name={
                                                         "คำถามที่ได้รับคำตอบ"
                                                      }
                                                      count={
                                                         countQst.qst_success
                                                      }
                                                      p_key={0}
                                                   />
                                                   <Small_Boxes
                                                      name={"คำถามที่รอคำตอบ"}
                                                      count={countQst.qst_wait}
                                                      p_key={2}
                                                   />
                                                   {/* BOX BOX BOX */}
                                                </div>
                                             </div>
                                          </div>
                                          {/* /.card-body */}
                                       </div>
                                    </div>
                                    <div className="col-xl-12">
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
                                                <ChartBarQst />
                                             </div>
                                          </div>
                                       </div>
                                    </div>
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
