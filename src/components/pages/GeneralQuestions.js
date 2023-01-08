import React, { useState, useEffect } from "react";
import { loadAllQuestion } from "../functions/query";
const GeneralQuestions = () => {
   const [data, setData] = useState([{ 0: { num_row: 1 } }]);
   const [limit, setLimit] = useState(6);
   const loadData = () => {
      loadAllQuestion({ limit: limit })
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
      loadData();
   }, [limit]);
   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-6">
                     <h1>คำถามทั่วไป</h1>
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item font-weight-bold">
                           คำถามทั่วไป
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
                        {/* <div className="card-body">
                     <h1>Home Page</h1>
                  </div> */}
                        <div className="card-body">
                           <h1 className="col-12">คำถามทั่วไป</h1>
                           <section className="content">
                              <div className="container-fluid">
                                 <div className="row">
                                    {data && //ตรวจสอบการมีอยู่ของข้อมูล
                                       data.map(
                                          (
                                             value,
                                             key //เมื่อมีข้อมูลทำการวนซ้ำเพื่อดึงข้อมูล
                                          ) => (
                                             <div
                                                key={key}
                                                className="post col-10 col-md-10 col-lg-10 col-xl-5 mx-5"
                                             >
                                                <hr />
                                                {value.mem_img != null &&
                                                value.mem_img != "null" ? (
                                                   <div className="user-block">
                                                      <img
                                                         className="img-circle img-bordered-sm"
                                                         src={
                                                            process.env
                                                               .REACT_APP_API_MEM_IMG +
                                                            "/" +
                                                            value.mem_img
                                                         }
                                                      />
                                                      <span className="description">
                                                         {value.date}{" "}
                                                         {/* แสดงข้อมูลวันที่ถามคำถาม */}
                                                      </span>
                                                   </div>
                                                ) : (
                                                   <div className="user-block">
                                                      <img //แสดงรูปกรณีผู้ใช้ยังไม่เพิ่มรูปของตนเอง
                                                         className="img-circle img-bordered-sm"
                                                         src={
                                                            "../../dist/img/avatar6.jpg"
                                                         }
                                                      />
                                                      <span className="description">
                                                         {value.date}{" "}
                                                         {/* แสดงข้อมูลวันที่ถามคำถาม */}
                                                      </span>
                                                   </div>
                                                )}
                                                <h4>{value.qst_title}</h4>
                                                {/* แสดงข้อมูลหัวข้อคำถาม */}
                                                <p>{value.qst_detail}</p>
                                                {/* แสดงข้อมูลรายละเอียด */}
                                                {value.sta_id == 3 ? ( //ตรวสอบสถานะคำถามเพื่อแสดงข้อความสถานะ
                                                   <p className="text-warning">
                                                      กำลังดำเนินการ
                                                   </p>
                                                ) : (
                                                   <p className="text-success">
                                                      ตอบแล้ว
                                                   </p>
                                                )}
                                             </div>
                                          )
                                       )}
                                    <div className="user-block"></div>
                                    {limit < data[0].num_row ? (
                                       <div className="col-12">
                                          <div
                                             className="btn btn-primary m-2 col-12"
                                             onClick={() => {
                                                setLimit(limit + 6);
                                             }}
                                          >
                                             + โหลดคำถามเพิ่ม
                                          </div>
                                       </div>
                                    ) : (
                                       <></>
                                    )}
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

export default GeneralQuestions;
