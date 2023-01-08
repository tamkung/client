import React, { useState, useEffect } from "react";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

//Query
import { officerCountReply } from "../../../functions/officer";
import { countQstOfUser } from "../../../functions/user";

//React Redux
import { useSelector } from "react-redux";

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

const ChartBarQst = () => {
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
            backgroundColor: "rgba(0, 123, 255, 1)",
         },
         {
            label: "คำถามที่ได้รับคำตอบ",
            data: labels.map(() => 30),
            backgroundColor: "rgba(92, 184, 92, 1)",
         },
         {
            label: "คำถามที่รอคำตอบ",
            data: labels.map(() => 20),
            backgroundColor: "rgba(220, 53, 69, 1)",
         },
      ],
   });

   const charBar = () => {
      countQstOfUser(user.token, { mem_id: user.mem_id })
         .then((res) => {
            setCountQst(res.data);
            setData({
               labels,
               datasets: [
                  {
                     label: "คำถามทั้งหมด",
                     data: labels.map(() => res.data.all_qst),
                     backgroundColor: "rgba(0, 123, 255, 1)",
                  },
                  {
                     label: "คำถามที่ได้รับคำตอบ",
                     data: labels.map(() => res.data.qst_success),
                     backgroundColor: "rgba(92, 184, 92, 1)",
                  },
                  {
                     label: "คำถามที่รอคำตอบ",
                     data: labels.map(() => res.data.qst_wait),
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

export default ChartBarQst;
