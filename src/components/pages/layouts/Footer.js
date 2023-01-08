import React from "react";

export default function Footer() {
   return (
      <footer className="main-footer" style={{ wordBreak: "break-word" }}>
         <strong>
            สงวนลิขสิทธิ์ © 2564
            {/* Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>. */}
         </strong>
         {"\u00A0"}รัชชานนท์ เสมสายัณห์. วรวิทย์ อ๋องสกุล.
         {/* All rights reserved. */}
         {/* มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ */}
         <div className="float-right d-none d-sm-inline-block">
            {/* <b>Version</b> 3.2.0-rc */}
            <a href="https://ced.kmutnb.ac.th/" target="_blank">ภาควิชาคอมพิวเตอร์ศึกษา</a>
            {"\u00A0"}
            {/* <a href="http://fte.kmutnb.ac.th/" target="_blank">คณะครุศาสตร์อุตสาหกรรม</a>
            {"\u00A0"} */}
            <a href="https://www.kmutnb.ac.th/" target="_blank">
               มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
               {/* มจพ. */}
            </a>
         </div>
      </footer>
   );
}
