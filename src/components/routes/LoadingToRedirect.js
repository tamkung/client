import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoadingToRedirect = () => {
   //เวลานับถอยหลังเมื่อไม่มีสิทธิเข้าถึงข้อมูล
   const [count, setCount] = useState(20);
   const navigate = useNavigate();

   // คล้าย middleware ทำงานเมื่อ load หน้าเว็บ
   useEffect(() => {
      const interval = setInterval(() => {
         setCount((currentCount) => --currentCount);
      }, 1000);
      // Redirect
      count === 0 && navigate("/");
      return () => clearInterval(interval);
   }, [count]);

   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-6">
                     <h1>404 Error Page</h1>
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                           <Link to="/">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item active">404 Error Page</li>
                     </ol>
                  </div>
               </div>
            </div>
            {/* /.container-fluid */}
         </section>
         {/* Main content */}
         <section className="content">
            <div className="error-page">
               <h2 className="headline text-warning"> 404 </h2>
               <div className="error-content">
                  <h3>
                     <i className="fas fa-exclamation-triangle text-warning" /> ตรวจสอบสิทธิ์การเข้าถึง
                  </h3>
                  <h5>หากคุณไม่มีสิทธิ์เข้าถึงจะถูกส่งไป หน้าแรกในอีก {count}</h5>

                  <h6>
                     <Link to="/">กลับไปที่หน้าแรก</Link>
                  </h6>
                  {/* <form className="search-form"> */}
                  {/* <div className="input-group">
                        <input type="text" name="search" className="form-control" placeholder="Search" />
                        <div className="input-group-append">
                           <button type="submit" name="submit" className="btn btn-warning">
                              <i className="fas fa-search" />
                           </button>
                        </div>
                     </div> */}
                  {/* /.input-group */}
                  {/* </form> */}
               </div>
               {/* /.error-content */}
            </div>
            {/* /.error-page */}
         </section>
         {/* /.content */}
      </div>
   );
};

export default LoadingToRedirect;
