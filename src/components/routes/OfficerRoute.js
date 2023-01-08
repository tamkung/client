import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentOfficer } from "../functions/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const OfficerRoute = ({ children }) => {
   // user มาจาก Redux
   const [ok, setOk] = useState(false);
   const { user } = useSelector((state) => ({ ...state }));
   const navigate = useNavigate();
   useEffect(() => {
      if (user && user.token) {
         currentOfficer(user.token)
            .then((res) => {
               //res
               // console.log(res);
               setOk(true);
            })
            .catch((err) => {
               toast.error(err.response.data);
               console.log(err.response);
               // console.log(err.response.data);
               navigate("/login");
               setOk(false);
            });
      }
   }, [user]);

   return ok ? children : <LoadingToRedirect />;
};

export default OfficerRoute;
