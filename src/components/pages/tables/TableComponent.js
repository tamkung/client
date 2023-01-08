import React, { useState, useEffect } from "react";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import { officerCountQuestionTypeAll } from "../../functions/officer";

const TableComponent = () => {
   const [data, setData] = useState();

   const loadData = () => {
      officerCountQuestionTypeAll()
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
   }, []);
   return (
      <div>
         <BootstrapTable data={data} hover pagination search>
            <TableHeaderColumn isKey dataSort width="80" dataAlign="center" dataField="num_row">
               ลำดับ
            </TableHeaderColumn>

            <TableHeaderColumn dataSort width="400" headerAlign="center" dataField="type_name">
               ประเภทคำถาม
            </TableHeaderColumn>
            <TableHeaderColumn dataSort width="75" dataAlign="center" dataField="count_type_All">
               จำนวน
            </TableHeaderColumn>
         </BootstrapTable>
      </div>
   );
};

export default TableComponent;
