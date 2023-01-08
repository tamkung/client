import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

//Query
import { officerCountReply } from "../../../functions/officer";

//React Redux
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBarComponent = () => {
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
            text: "ข้อมูลการตอบคำถาม",
         },
      },
   });

   const [labels, setLabels] = useState([""]);
   const [data, setData] = useState({
      labels,
      datasets: [
         {
            label: "คำถามทั้งหมด",
            data: labels.map(() => 40),
            backgroundColor: "rgba(92, 184, 92, 1)",
         },
         {
            label: "คำถามทั้งหมดที่ตอบแล้ว",
            data: labels.map(() => 30),
            backgroundColor: "rgba(2, 117, 216, 1)",
         },
         {
            label: "คำถามทั้งหมดที่ยังไม่ได้ตอบ",
            data: labels.map(() => 20),
            backgroundColor: "rgba(220, 53, 69, 1)",
         },
         {
            label: "คำถามที่เจ้าหน้าที่ตอบ",
            data: labels.map(() => 10),
            backgroundColor: "rgba(255, 193, 7, 1)",
         },
      ],
   });

   const charBar = () => {
      // console.log("mem_id", user.mem_id);
      officerCountReply(user.token, { mem_id: user.mem_id })
         .then((res) => {
            setCountQst(res.data[0]);
            setData({
               labels,
               datasets: [
                  {
                     label: "คำถามทั้งหมด",
                     data: labels.map(() => res.data[0].allQst),
                     backgroundColor: "rgba(92, 184, 92, 1)",
                  },
                  {
                     label: "คำถามทั้งหมดที่ตอบแล้ว",
                     data: labels.map(() => res.data[0].successQst),
                     backgroundColor: "rgba(0, 123, 255, 1)",
                  },
                  {
                     label: "คำถามทั้งหมดที่ยังไม่ได้ตอบ",
                     data: labels.map(() => res.data[0].waitReply),
                     backgroundColor: "rgba(220, 53, 69, 1)",
                  },
                  {
                     label: "คำถามที่ (" + user.mem_name + ") ตอบ",
                     data: labels.map(() => res.data[0].ownReply),
                     backgroundColor: "rgba(255, 193, 7, 1)",
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

export default ChartBarComponent;
