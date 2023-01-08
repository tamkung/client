import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

//Query
import { officerCountReply } from "../../../functions/officer";
import { countMember } from "../../../functions/query";

//React Redux
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBarMember = () => {
   const { user } = useSelector((state) => ({ ...state }));
   const [countQst, setCountQst] = useState({});
   const [options, setOptions] = useState({
      responsive: true,
      plugins: {
         legend: {
            position: "top",
         },
         title: {
            display: true,
            text: "ข้อมูลการสมาชิก",
         },
      },
   });

   const [labels, setLabels] = useState([""]);
   const [data, setData] = useState({
      labels,
      datasets: [
         {
            label: "ผู้ใช้",
            data: labels.map(() => 40),
            backgroundColor: "rgba(92, 184, 92, 1)",
         },
         {
            label: "เจ้าหน้าที่",
            data: labels.map(() => 30),
            backgroundColor: "rgba(2, 117, 216, 1)",
         },
         {
            label: "ผู้ดูแลระบบ",
            data: labels.map(() => 20),
            backgroundColor: "rgba(255, 193, 7, 1)",
         },
         {
            label: "ถูกปิดการใช้",
            data: labels.map(() => 10),
            backgroundColor: "rgba(220, 53, 69, 1)",
         },
      ],
   });

   const charBar = () => {
      countMember(user.token)
         .then((res) => {
            setCountQst(res.data[0]);
            setData({
               labels,
               datasets: [
                  {
                     label: "ผู้ใช้",
                     data: labels.map(() => res.data[0].user_num),
                     backgroundColor: "rgba(92, 184, 92, 1)",
                  },
                  {
                     label: "เจ้าหน้าที่",
                     data: labels.map(() => res.data[0].officer_num),
                     backgroundColor: "rgba(2, 117, 216, 1)",
                  },
                  {
                     label: "ผู้ดูแลระบบ",
                     data: labels.map(() => res.data[0].admin_num),
                     backgroundColor: "rgba(255, 193, 7, 1)",
                  },
                  {
                     label: "ถูกปิดการใช้",
                     data: labels.map(() => res.data[0].user_disble),
                     backgroundColor: "rgba(220, 53, 69, 1)",
                  },
               ],
            });
         })
         .catch((err) => {
            console.log(err.response.data);
         });
      // console.log("countQst : ", countQst);
      // console.log("cahrtDoughnutData", data);
   };

   useEffect(() => {
      charBar();
   }, []);

   return <Bar options={options} data={data} />;
};

export default ChartBarMember;
