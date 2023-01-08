import React from "react";

const About = () => {
   return (
      <div className="content-wrapper">
         {/* Content Header (Page header) */}
         <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                  <div className="col-sm-6">
                     <h1>เกี่ยวกับระบบ</h1>
                  </div>
                  <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item font-weight-bold">
                           เกี่ยวกับระบบ
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
                        <div className="card-body">
                           <h1>ระบบบริการตอบคำถามนักศึกษา</h1>
                           <p>
                              &emsp; &emsp; &emsp; ระบบบริการตอบคำถามนักศึกษา
                              คือ ระบบที่นักศึกษาหรือบุคคลภายนอก
                              สามารถติดต่อสอบถามรายละเอียดในหมวดต่าง ๆ เช่น
                              หลักสูตรการศึกษา การสมัครเป็นนักศึกษา
                              การลงทะเบียนเรียน การสอบ และการวัดผลการศึกษา
                              เป็นต้น มายังภาควิชาคอมพิวเตอร์ศึกษา
                              คณะครุศาสตร์อุตสาหกรรม
                              มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
                              ระบบนี้ถูกออกแบบมาเพื่อรวมศูนย์การติดต่อสอบถาม
                              โดยระบบนี้พัฒนาด้วย React Library ร่วมกับ Node.js
                              และ MySQL
                           </p>
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

export default About;
