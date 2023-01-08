import axios from "axios";

export const register = async (value) => await axios.post(process.env.REACT_APP_API + "/register", value);
export const login = async (value) => await axios.post(process.env.REACT_APP_API + "/login", value);
export const forgotPassword = async (value) => await axios.post(process.env.REACT_APP_API + "/forgot-password", value);
export const newPassword = async (value) => await axios.post(process.env.REACT_APP_API + "/new-password", value);
export const currentUser = async (authtoken) => {
   //    console.log("Func", authtoken);
   return await axios.post(
      process.env.REACT_APP_API + "/current-user",
      {},
      {
         headers: {
            authtoken,
         },
      }
   );
};

export const currentOfficer = async (authtoken) => {
   //    console.log("Func", authtoken);
   return await axios.post(
      process.env.REACT_APP_API + "/current-officer",
      {},
      {
         headers: {
            authtoken,
         },
      }
   );
};

export const currentAdmin = async (authtoken) => {
   //    console.log("Func", authtoken);
   return await axios.post(
      process.env.REACT_APP_API + "/current-admin",
      {},
      {
         headers: {
            authtoken,
         },
      }
   );
};
